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
)

//go:embed all:web/static
var staticFS embed.FS

var (
	startedAt = time.Now()
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

	r.NoRoute(func(c *gin.Context) {
		serveStatic(c, staticRoot, staticServer)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	log.Printf("listening on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"uptime":  time.Since(startedAt).Round(time.Second).String(),
		"started": startedAt.UTC().Format(time.RFC3339),
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

	reqPath := strings.TrimPrefix(c.Request.URL.Path, "/")
	if reqPath == "" {
		reqPath = "index.html"
	}
	clean := path.Clean(reqPath)
	if strings.HasPrefix(clean, "..") || strings.Contains(clean, "/../") {
		c.Status(http.StatusBadRequest)
		return
	}

	if _, err := fs.Stat(root, clean); err != nil {
		// Fallback to index.html for unknown routes.
		c.Request.URL.Path = "/"
		server.ServeHTTP(c.Writer, c.Request)
		return
	}

	// Long-cache hashed-looking asset paths; the index.html stays uncached.
	if clean != "index.html" && (strings.HasPrefix(clean, "css/") ||
		strings.HasPrefix(clean, "js/") || strings.HasPrefix(clean, "images/")) {
		c.Header("Cache-Control", "public, max-age=180")
	} else {
		c.Header("Cache-Control", "no-cache")
	}

	server.ServeHTTP(c.Writer, c.Request)
}

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		log.Printf("%s: %s %s -> %d (%s)",
			c.ClientIP(),
			c.Request.Method,
			c.Request.URL.Path,
			c.Writer.Status(),
			time.Since(start).Round(time.Microsecond),
		)
	}
}
