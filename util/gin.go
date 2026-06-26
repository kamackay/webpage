package util

import "github.com/gin-gonic/gin"

func GetIp(c *gin.Context) string {
	ip := c.ClientIP()
	if len(ip) == 0 || ip == "127.0.0.1" {
		return c.Request.Header.Get("X-Forwarded-For")
	}
	return ip
}
