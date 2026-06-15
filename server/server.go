package server

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/api"
	"github.com/kamackay/webpage/api/blocklist"
	"github.com/kamackay/webpage/db"
	"github.com/kamackay/webpage/domain"
	"github.com/kamackay/webpage/util"
)

type Server struct {
	startedAt time.Time
	accessDb  *db.AccessLogDatabase
	logger    *log.Logger
	verbose   bool
	fs        embed.FS
}

func NewServer(fs embed.FS) *Server {
	accessLogDb, err := db.NewAccessLogDb()
	if err != nil {
		panic(err)
	}
	return &Server{
		accessDb: accessLogDb,
		logger:   log.New(os.Stdout, "", log.LstdFlags|log.Lmicroseconds|log.Lshortfile|log.LUTC),
		verbose:  os.Getenv("VERBOSE") == "true",
		fs:       fs,
	}
}

func (s *Server) Start() {
	s.startedAt = time.Now()
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(s.bitchFilter())
	r.Use(s.requestLogger())

	blocklistDb, err := db.NewBlocklistDatabase()
	if err != nil {
		panic(err)
	}

	apis := []api.Api{
		api.NewAccessApi(s.accessDb),
		api.NewResumeApi(),
		blocklist.NewBlocklistService(blocklistDb),
	}

	apiGroup := r.Group("/api")
	{
		for _, a := range apis {
			a.RegisterRoutes(apiGroup)
		}
		apiGroup.GET("/health", s.healthHandler)
	}

	staticRoot, err := fs.Sub(s.fs, "web/static")
	if err != nil {
		log.Fatalf("failed to mount static FS: %v", err)
	}
	staticServer := http.FileServer(http.FS(staticRoot))

	quandRoot, err := fs.Sub(s.fs, "web/static/quand")
	if err != nil {
		log.Fatalf("failed to mount static FS: %v", err)
	}
	quandServer := http.FileServer(http.FS(quandRoot))

	r.NoRoute(func(c *gin.Context) {
		if s.verbose {
			s.logger.Printf("%s %s %s", c.Request.Method, c.Request.URL.Path, c.Request.RemoteAddr)
		}
		switch c.Request.Host {
		default:
			fallthrough
		case domain.KeithSh, domain.KeithMacKay:
			s.serveStatic(c, staticRoot, staticServer)
			return
		case domain.Quand, domain.DigitalOcean:
			s.serveStatic(c, quandRoot, quandServer)
			return
		}
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "9999"
	}
	addr := ":" + port
	log.Printf("listening on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func (s *Server) bitchFilter() gin.HandlerFunc {
	return func(c *gin.Context) {
		if bitch, err := s.accessDb.IsBitch(c.ClientIP()); err == nil && bitch {
			ip := c.ClientIP()
			go func() {
				// Increment hit count for this bitch
				if err := s.accessDb.Insert(db.AccessLogDatum{Ip: ip}); err != nil {
					s.logger.Printf("failed to bitch access log: %v", err)
				}
			}()
			// This user's IP has tried to hack the site in the past, filter their requests
			s.logger.Printf("Rejecting request from bitch: %s %s%s %s",
				c.Request.Method,
				c.Request.Host,
				c.Request.URL.Path,
				ip)
			domain.BitchRejection(c)
			return
		}
		if isHackAttempt(c) {
			domain.BitchRejection(c)
			err := s.accessDb.SetBitchStatus(c.ClientIP(), true)
			if err != nil {
				s.logger.Printf("Error Setting user to bitch: %+v", err)
			}
			return
		}
		c.Next()
	}
}

func (s *Server) requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// store for goroutine
		ip := c.ClientIP()
		userAgent := c.Request.UserAgent()
		if strings.HasSuffix(c.Request.URL.Path, "api/health") {
			// This is just too noisy
			return
		}
		go func() {
			if err := s.accessDb.Insert(db.AccessLogDatum{Ip: ip, UserAgent: userAgent, Hits: 1, Bitch: false}); err != nil {
				s.logger.Printf("failed to insert access log: %v", err)
			}
		}()
		start := time.Now()
		c.Next()
		s.logger.Printf("%s: %s %s%s -> %d (%s)",
			ip,
			c.Request.Method,
			c.Request.Host,
			c.Request.URL.Path,
			c.Writer.Status(),
			time.Since(start),
		)
	}
}

func (s *Server) healthHandler(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"uptime":  time.Since(s.startedAt).Round(time.Second).String(),
			"started": s.startedAt.UTC().Format(time.RFC3339),
		})
	})
}

// serveStatic resolves the requested path against the embedded FS, falling
// back to index.html so client-side routing works for unknown paths.
// Unknown /api/* paths return JSON 404 instead of the SPA shell.
func (s *Server) serveStatic(c *gin.Context, root fs.FS, server http.Handler) {
	clean := getCleanPath(c.Request.URL.Path)
	//logger.Printf("serving %s %s", clean, c.Request.URL.Path)
	if util.HasAnyPrefix([]string{"/api", "/hidden"}, c) {
		if s.verbose {
			s.logger.Printf("%s contains rejected prefix, denying access", clean)
		}
		domain.DefaultRejection(c)
		return
	}

	if strings.HasPrefix(clean, "..") || strings.Contains(clean, "/../") {
		if s.verbose {
			s.logger.Printf("%s has '..', rejecting hack attempt", clean)
		}
		c.Status(http.StatusBadRequest)
		return
	}

	if a, err := fs.Stat(root, clean); err != nil {
		if s.verbose {
			s.logger.Printf("%s is not a file, rejecting request", clean)
		}
		domain.DefaultRejection(c)
		return
	} else if a.IsDir() {
		// Serve a directory only if it has an index.html; never expose listings
		if _, err := fs.Stat(root, path.Join(clean, "index.html")); err != nil {
			if s.verbose {
				s.logger.Printf("%s is a directory with no index.html, rejecting request", clean)
			}
			domain.DefaultRejection(c)
			return
		}
	}

	// Long-cache hashed-looking asset paths; the index.html stays uncached.
	if clean != "index.html" && (strings.HasPrefix(clean, "css/") ||
		strings.HasPrefix(clean, "js/")) {
		// Cache static content for a bit just to debounce requests, but long caches get annoying while I'm debugging the site
		c.Header("Cache-Control", "public, max-age=180")
	} else if strings.HasPrefix(clean, "images/") {
		// Cache images for a really long time, they're not likely to change
		c.Header("Cache-Control", "public, max-age=360000")
	} else {
		c.Header("Cache-Control", "no-cache")
	}

	server.ServeHTTP(c.Writer, c.Request)
}

func isHackAttempt(c *gin.Context) bool {
	reqPath := c.Request.URL.Path
	match, _ := regexp.MatchString("^/?((wp-content)|(wp-includes))?.*(\\.php)|(\\.env)$", reqPath)
	if match {
		return true
	}
	return strings.Contains(reqPath, "secret") || strings.Contains(reqPath, "credential")
}

func getCleanPath(originalPath string) string {
	reqPath := strings.TrimPrefix(originalPath, "/")
	if reqPath == "" {
		reqPath = "index.html"
	}
	return path.Clean(reqPath)
}
