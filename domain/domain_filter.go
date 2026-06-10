package domain

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	Quand        = "quand.org"
	DigitalOcean = "webpage-o87x7.ondigitalocean.app"
	KeithMacKay  = "keithmackay.com"
	KeithSh      = "keith.sh"
)

func DefaultRejection(c *gin.Context) { c.Status(http.StatusNotFound) }

func ExcludeAnd(domains []string, c *gin.Context, route func(*gin.Context), rejection func(*gin.Context)) {
	for _, domain := range domains {
		if domain == c.Request.Host {
			rejection(c)
			return
		}
	}
	route(c)
}

func ExcludeDomains(domains []string, c *gin.Context, route func(*gin.Context)) {
	ExcludeAnd(domains, c, route, DefaultRejection)
}

func Only(domains []string, c *gin.Context, route func(*gin.Context), rejection func(*gin.Context)) {
	for _, domain := range domains {
		if domain == c.Request.Host {
			route(c)
			return
		}
	}
	rejection(c)
}
