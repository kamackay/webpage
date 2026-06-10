package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/util"
)

//go:embed all:web/static
var staticFS embed.FS

var (
	startedAt = time.Now()
	logger    = log.New(os.Stdout, "", log.LstdFlags|log.Lmicroseconds|log.Lshortfile|log.LUTC)
)

const (
	QuandDomain        = "quand.org"
	DigitalOceanDomain = "webpage-o87x7.ondigitalocean.app"
)

func main() {
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(requestLogger())

	api := r.Group("/api")
	{
		api.GET("/health", healthHandler)
	}

	staticRoot, err := fs.Sub(staticFS, "web/static")
	if err != nil {
		log.Fatalf("failed to mount static FS: %v", err)
	}
	staticServer := http.FileServer(http.FS(staticRoot))

	quandRoot, err := fs.Sub(staticFS, "web/static/quand")
	if err != nil {
		log.Fatalf("failed to mount static FS: %v", err)
	}
	quandServer := http.FileServer(http.FS(quandRoot))

	r.NoRoute(func(c *gin.Context) {
		switch c.Request.Host {
		case "localhost:9999", "127.0.0.1:9999", "keith.sh", "keithmackay.com":
			serveStatic(c, staticRoot, staticServer)
			return
		default:
		case QuandDomain:
			serveStatic(c, quandRoot, quandServer)
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

func healthHandler(c *gin.Context) {
	util.ExcludeForDomains([]string{QuandDomain, DigitalOceanDomain}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"uptime":  time.Since(startedAt).Round(time.Second).String(),
			"started": startedAt.UTC().Format(time.RFC3339),
		})
	})
}

// serveStatic resolves the requested path against the embedded FS, falling
// back to index.html so client-side routing works for unknown paths.
// Unknown /api/* paths return JSON 404 instead of the SPA shell.
func serveStatic(c *gin.Context, root fs.FS, server http.Handler) {
	if strings.HasPrefix(c.Request.URL.Path, "/api/") || c.Request.URL.Path == "/api" {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	clean := getCleanPath(c.Request.URL.Path)

	if strings.HasPrefix(clean, "..") || strings.Contains(clean, "/../") {
		c.Status(http.StatusBadRequest)
		return
	}

	/*if _, err := fs.Stat(root, clean); err != nil {
		// Fallback to index.html for unknown routes.
		logger.Printf("rewriting %s to be 404", clean)
		c.Request.URL.Path = "/404"
		server.ServeHTTP(c.Writer, c.Request)
		return
	}/**/

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

func getCleanPath(originalPath string) string {
	reqPath := strings.TrimPrefix(originalPath, "/")
	if reqPath == "" {
		reqPath = "index.html"
	}
	return path.Clean(reqPath)
}

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		log.Printf("%s: %s %s%s -> %d (%s)",
			c.ClientIP(),
			c.Request.Method,
			c.Request.Host,
			c.Request.URL.Path,
			c.Writer.Status(),
			time.Since(start),
		)
	}
}
