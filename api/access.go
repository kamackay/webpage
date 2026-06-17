package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/db"
	"github.com/kamackay/webpage/domain"
	"github.com/kamackay/webpage/model"
)

type AccessApi struct {
	Api

	accessDb *db.AccessLogDatabase
	logger   *log.Logger
}

func NewAccessApi(accessDb *db.AccessLogDatabase) *AccessApi {
	return &AccessApi{
		accessDb: accessDb,
		logger:   log.New(os.Stdout, "", log.LstdFlags|log.Lmicroseconds|log.Lshortfile|log.LUTC),
	}
}

func (a *AccessApi) RegisterRoutes(group *gin.RouterGroup) {
	subGroup := group.Group("/access")
	{
		subGroup.GET("/hits", a.getTrafficHits)
		subGroup.GET("/bitches", a.getBitches)
		subGroup.GET("/recent", a.getRecent)
	}
}

func (a *AccessApi) getRecent(c *gin.Context) {
	logs, err := a.accessDb.GetRequestLogs()
	if err != nil {
		a.logger.Println(err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	var sb strings.Builder
	sort.Slice(logs, func(i, j int) bool {
		return logs[i].Time.Before(logs[j].Time)
	})
	for _, l := range logs {
		sb.WriteString(l.Time.Format("2006-01-02 15:04:05"))
		sb.WriteString("\t")
		sb.WriteString(l.Method)
		sb.WriteString("\t")
		sb.WriteString(l.Ip)
		sb.WriteString("\t")
		sb.WriteString(fmt.Sprintf("%d", l.Status))
		sb.WriteString("\t")
		sb.WriteString(l.Url)
		sb.WriteString("\t")
		sb.WriteString(l.UserAgent)
		sb.WriteString("\n")
	}
	c.String(http.StatusOK, sb.String())
}

func (a *AccessApi) getBitches(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		results, err := a.accessDb.GetBitches()
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, results)
	})
}

func (a *AccessApi) getTrafficHits(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		results, err := a.accessDb.GetAll()
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, results)
	})
}

func (a *AccessApi) handleRequest(c *gin.Context) {
	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()
	go func() {
		if err := a.accessDb.Insert(model.AccessLogDatum{Ip: ip, UserAgent: userAgent, Hits: 1, Bitch: false}); err != nil {
			a.logger.Printf("failed to insert access log: %v", err)
		}
	}()
}

func (a *AccessApi) cacheRequest(c *gin.Context) {
	l := &model.RequestLog{
		Url:       c.Request.Host + c.Request.URL.String(),
		Ip:        c.ClientIP(),
		Method:    c.Request.Method,
		Status:    c.Writer.Status(),
		UserAgent: c.Request.UserAgent(),
		Time:      time.Now(),
	}
	go func() {
		if err := a.accessDb.StoreRequestLog(l); err != nil {
			a.logger.Printf("failed to store access log: %v", err)
		}
	}()
}

func (a *AccessApi) RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		if strings.HasSuffix(c.Request.URL.Path, "api/health") {
			// This is just too noisy
			return
		}
		a.handleRequest(c)
		c.Next()
		a.logger.Printf("%s: %s %s%s -> %d (%s)",
			c.ClientIP(),
			c.Request.Method,
			c.Request.Host,
			c.Request.URL.Path,
			c.Writer.Status(),
			time.Since(start),
		)
		a.cacheRequest(c)
	}
}

func (a *AccessApi) BitchFilter() gin.HandlerFunc {
	return func(c *gin.Context) {
		if bitch, err := a.accessDb.IsBitch(c.ClientIP()); err == nil && bitch {
			ip := c.ClientIP()
			go func() {
				// Increment hit count for this bitch
				if err := a.accessDb.Insert(model.AccessLogDatum{Ip: ip}); err != nil {
					a.logger.Printf("failed to bitch access log: %v", err)
				}
			}()
			// This user's IP has tried to hack the site in the past, filter their requests
			a.logger.Printf("Rejecting request from bitch: %s %s%s %s",
				c.Request.Method,
				c.Request.Host,
				c.Request.URL.Path,
				ip)
			domain.BitchRejection(c)
			return
		}
		if isHackAttempt(c) {
			domain.BitchRejection(c)
			err := a.accessDb.SetBitchStatus(c.ClientIP(), true)
			if err != nil {
				a.logger.Printf("Error Setting user to bitch: %+v", err)
			}
			return
		}
		c.Next()
	}
}

func isHackAttempt(c *gin.Context) bool {
	reqPath := c.Request.URL.Path
	match, _ := regexp.MatchString("^/?.*((wp-content)|(wp-includes)|(\\.aws)|(\\.vscode)|(\\.git)|(\\.config)|(\\.anthropic)|(\\.openai)|(\\.kube)|(\\.docker))?.*(\\.php)|(\\.env)$", reqPath)
	if match {
		return true
	}
	return strings.Contains(reqPath, "secret") || strings.Contains(reqPath, "credential")
}
