package pics

import (
	"crypto/subtle"
	"database/sql"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/api"
	"github.com/kamackay/webpage/db"
	"github.com/peterbourgon/diskv/v3"
)

const uploadPasswordEnv = "PICS_UPLOAD_PASSWORD"

type Service struct {
	api.Api

	db             *db.PicsDatabase
	logger         *log.Logger
	uploadPassword string
	cache          *diskv.Diskv
}

func NewPicsService(db *db.PicsDatabase) *Service {
	service := &Service{
		db:             db,
		logger:         log.New(os.Stdout, "", log.LstdFlags|log.Lmicroseconds|log.Lshortfile|log.LUTC),
		uploadPassword: os.Getenv(uploadPasswordEnv),
		cache: diskv.New(diskv.Options{
			BasePath:     "image-cache",
			CacheSizeMax: 5 * 1024 * 1024 * 1024,
		}),
	}

	service.Init()
	return service
}

func (s *Service) Init() {
	// Nothing for now
}

func (s *Service) RegisterRoutes(group *gin.RouterGroup) {
	apiGroup := group.Group("/pics")
	{
		apiGroup.GET("/list", s.listPictures)
		apiGroup.GET("/jpg/:id", s.getPicture)
		apiGroup.POST("/upload", s.uploadPicture)
	}
}

func (s *Service) listPictures(c *gin.Context) {
	list, err := s.db.GetVisible()
	if err != nil {
		s.logger.Printf("Error listing pictures: %+v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, list)
}

func (s *Service) getPicture(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	cacheKey := fmt.Sprintf("image-%d", id)
	if s.cache.Has(cacheKey) {
		data, err := s.cache.Read(cacheKey)
		if err != nil {
			s.logger.Printf("Error reading picture: %+v", err)
		} else {
			c.Data(http.StatusOK, "image/jpeg", data)
			s.logger.Printf("Successfully fetched cached picture: %s", cacheKey)
		}
	}
	pic, err := s.db.GetById(id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		s.logger.Printf("Error fetching picture %d: %+v", id, err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	if pic.Hidden {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	go func() {
		_ = s.cache.Write(cacheKey, pic.Image)
	}()
	c.Data(http.StatusOK, "image/jpeg", pic.Image)
}

func (s *Service) checkPassword(password string) bool {
	if s.uploadPassword == "" || password == "" {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(password), []byte(s.uploadPassword)) == 1
}

func (s *Service) uploadPicture(c *gin.Context) {
	if !s.checkPassword(c.PostForm("password")) {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	file, err := fileHeader.Open()
	if err != nil {
		s.logger.Printf("Error opening uploaded image: %+v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	defer file.Close()

	imageBytes, err := io.ReadAll(file)
	if err != nil {
		s.logger.Printf("Error reading uploaded image: %+v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	meta := extractMetadata(imageBytes)
	taken := meta.Taken
	if taken.IsZero() {
		taken = time.Now()
	}
	hidden := c.PostForm("hidden") == "true" || c.PostForm("hidden") == "on"

	pic := &db.Pic{
		Title:        c.PostForm("title"),
		Image:        imageBytes,
		Hidden:       hidden,
		Collection:   c.PostForm("collection"),
		Taken:        taken.UnixMilli(),
		Uploaded:     time.Now().UnixMilli(),
		Camera:       meta.Camera,
		Lens:         meta.Lens,
		Aperture:     meta.Aperture,
		FocalLength:  meta.FocalLength,
		ShutterSpeed: meta.ShutterSpeed,
		Iso:          meta.Iso,
		Width:        meta.Width,
		Height:       meta.Height,
	}

	if err := s.db.Create(pic); err != nil {
		s.logger.Printf("Error creating picture: %+v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, pic)
}
