package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExcludeForDomains(domains []string, c *gin.Context, route func(*gin.Context)) {
	for _, domain := range domains {
		if domain == c.Request.Host {
			c.Status(http.StatusNotFound)
			return
		}
	}
	route(c)
}
