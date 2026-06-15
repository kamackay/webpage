package api

import "github.com/gin-gonic/gin"

type Api interface {
	RegisterRoutes(*gin.RouterGroup)
}

type Experience struct {
	Company     string `json:"company"`
	Title       string `json:"title"`
	Years       string `json:"years"`
	Img         string `json:"img"`
	Description string `json:"description"`
}

type Skill struct {
	Name string `json:"name"`
	Img  string `json:"img"`
}

type SkillsResponse struct {
	Skills []Skill  `json:"skills"`
	Tags   []string `json:"tags"`
}

type Project struct {
	Title     string `json:"title"`
	Subheader string `json:"subheader"`
	URL       string `json:"url"`
	Img       string `json:"img"`
}

type Social struct {
	Name string `json:"name"`
	URL  string `json:"url"`
	Icon string `json:"icon"`
}
