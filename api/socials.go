package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/domain"
)

type Social struct {
	Name string `json:"name"`
	URL  string `json:"url"`
	Icon string `json:"icon"`
}

func GetSocials(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, []Social{
			{Name: "LinkedIn", URL: "https://www.linkedin.com/in/keith-mackay-047b9387/", Icon: "linkedin"},
			{Name: "GitLab", URL: "https://gitlab.com/kamackay", Icon: "gitlab"},
			{Name: "GitHub", URL: "https://github.com/kamackay", Icon: "github"},
		})
	})
}
