package blocklist

import (
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/api"
	"github.com/kamackay/webpage/db"
	"github.com/kamackay/webpage/domain"
	"github.com/kamackay/webpage/model"
	"github.com/robfig/cron/v3"
)

var ipRegex = regexp.MustCompile("^([0-9]{1,3}\\.){3}[0-9]{1,3}$")

const DoParsePW = "giant-yurt-motorolla-cartilage"

type Service struct {
	api.Api

	db     *db.BlocklistDatabase
	logger *log.Logger
	lists  []model.Blocklist
}

func NewBlocklistService(db *db.BlocklistDatabase) *Service {
	service := &Service{
		db:     db,
		logger: log.New(os.Stdout, "", log.LstdFlags|log.Lmicroseconds|log.Lshortfile|log.LUTC),
		lists: []model.Blocklist{
			{Url: "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts;showintro=0", Name: "Yoyo"},
			{Url: "https://someonewhocares.org/hosts/zero/hosts", Name: "SomeoneWhoCares"},
			{Url: "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts", Name: "StevenBlack"},
			{Url: "https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt", Name: "DevDanHate"},
			{Url: "https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt", Name: "DevDanAds"},
			{Url: "https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt", Name: "DevDanAmp"},
			{Url: "https://hole.cert.pl/domains/domains_hosts.txt", Name: "cert.pl"},
			{Url: "https://badmojr.github.io/1Hosts/Lite/hosts.txt", Name: "1Hosts Pro"},
		},
	}
	service.Init()
	return service
}

func (s *Service) RegisterRoutes(group *gin.RouterGroup) {
	apiGroup := group.Group("/block")
	{
		apiGroup.GET("/stats", s.getStats)
		apiGroup.GET("/list.json", s.getAll)
		apiGroup.GET("/list", s.list)
		apiGroup.PUT("/do", s.invokeViaRest)
	}
}

func (s *Service) invokeViaRest(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	if err == nil && strings.EqualFold(string(body), DoParsePW) {
		go func() {
			_ = s.doScan()
		}()
		c.AbortWithStatus(http.StatusCreated)
		return
	} else if err != nil {
		s.logger.Printf("Error parsing body: %v", err)
	}
	c.AbortWithStatus(http.StatusNotFound)
}

func (s *Service) Init() {
	_, _ = cron.New().AddFunc("@daily", func() {
		defer func() {
			if err := recover(); err != nil {
				s.logger.Printf("Recovered error in daily scan task: %+v", err)
			}
		}()
		if err := s.doScan(); err != nil {
			s.logger.Printf("Error in daily scan task: %+v", err)
		}
	})
}

func (s *Service) doScan() error {
	start := time.Now()
	client := &http.Client{}
	total := 0
	for _, list := range s.lists {
		resp, err := client.Get(list.Url)
		if err != nil {
			s.logger.Printf("Error pulling list %s: %+v", list.Name, err)
			continue
		}
		defer resp.Body.Close()
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			s.logger.Printf("Error pulling list %s: %+v", list.Name, err)
			continue
		}
		body := string(bodyBytes)
		count := 0
		for _, line := range strings.Split(body, "\n") {
			trimmedLine := strings.TrimSpace(line)
			split := strings.Fields(trimmedLine)
			if len(split) != 2 {
				continue
			}
			// Check to make sure String #1 is an IP address for filtering reasons
			if !ipRegex.MatchString(split[0]) {
				continue
			}
			if err := s.db.AddDomain(split[1], list.Name); err != nil {
				s.logger.Printf("Error adding domain %s from %s: %+v", split[1], list.Name, err)
				continue
			} else {
				count++
			}
		}
		s.logger.Printf("Added %d domains from Blocklist %s", count, list.Name)
		total += count
	}
	s.logger.Printf("Processed %d domains from %d lists in %s", total, len(s.lists), time.Since(start))
	return nil
}

func (s *Service) list(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		list, err := s.db.GetAll()
		if err != nil {
			s.logger.Printf("Error fetching lists: %+v", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		builder := strings.Builder{}

		builder.WriteString("#Title: Keith MacKay's Blocklist\n")

		for _, d := range list {
			builder.WriteString("0.0.0.0 ")
			builder.WriteString(d.Domain + "\n")
		}

		c.String(http.StatusOK, builder.String())
	})
}

func (s *Service) getAll(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		list, err := s.db.GetAll()
		if err != nil {
			s.logger.Printf("Error getting all blocklists: %+v", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, list)
	})
}

func (s *Service) getStats(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		stats, err := s.db.GetStats()
		if err != nil {
			s.logger.Printf("Error getting stats: %+v", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, stats)
	})
}
