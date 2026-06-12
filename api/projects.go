package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/domain"
)

type Project struct {
	Title     string `json:"title"`
	Subheader string `json:"subheader"`
	URL       string `json:"url"`
	Img       string `json:"img"`
}

func GetProjects(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, []Project{
			{
				Title:     "QR Code Generator",
				Subheader: "Convert URLs and text into a scannable QR code",
				URL:       "./qr",
				Img:       "/images/qr.png",
			},
		})
	})
}
