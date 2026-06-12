package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/db"
	"github.com/kamackay/webpage/domain"
)

type AccessApi struct {
	Api

	accessDb *db.AccessLogDatabase
}

func NewAccessApi(accessDb *db.AccessLogDatabase) *AccessApi {
	return &AccessApi{
		accessDb: accessDb,
	}
}

func (a *AccessApi) RegisterRoutes(group *gin.RouterGroup) {
	subGroup := group.Group("/access")
	{
		subGroup.GET("/hits", a.getTrafficHits)
		subGroup.GET("/bitches", a.getBitches)
	}
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
