package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/domain"
)

type Skill struct {
	Name string `json:"name"`
	Img  string `json:"img"`
}

type SkillsResponse struct {
	Skills []Skill  `json:"skills"`
	Tags   []string `json:"tags"`
}

func GetSkills(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, SkillsResponse{
			Skills: []Skill{
				{Name: "JavaScript", Img: "/images/js.svg"},
				{Name: "TypeScript", Img: "/images/ts.png"},
				{Name: "Java", Img: "/images/java.svg"},
				{Name: "Kotlin", Img: "/images/kotlin.png"},
				{Name: "Docker", Img: "/images/docker.png"},
				{Name: "Kubernetes", Img: "/images/k8s.svg"},
				{Name: "Git", Img: "/images/git.png"},
				{Name: "Go", Img: "/images/golang.svg"},
				{Name: "React", Img: "/images/react.png"},
				{Name: "MongoDB", Img: "/images/mongodb.png"},
				{Name: "AWS", Img: "/images/aws.svg"},
				{Name: "Python", Img: "/images/python.png"},
				{Name: "SQL", Img: "/images/sql.png"},
				{Name: "Android", Img: "/images/android.png"},
				{Name: "C# / .NET", Img: "/images/csharp.png"},
			},
			Tags: []string{
				"Artifactory",
				"Ambassador",
				"Spring",
				"Prometheus",
				"Helm",
				"CI/CD",
			},
		})
	})
}
