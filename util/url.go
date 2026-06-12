package util

import (
	"strings"

	"github.com/gin-gonic/gin"
)

func HasPrefix(prefix string, c *gin.Context) bool {
	return strings.HasPrefix(c.Request.URL.Path, prefix) || c.Request.URL.Path == prefix
}

func HasAnyPrefix(prefixes []string, c *gin.Context) bool {
	for _, prefix := range prefixes {
		if HasPrefix(prefix, c) {
			return true
		}
	}
	return false
}
