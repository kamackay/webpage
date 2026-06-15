package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/domain"
)

type ResumeApi struct {
	Api
}

func NewResumeApi() *ResumeApi {
	return &ResumeApi{}
}

func (r *ResumeApi) RegisterRoutes(group *gin.RouterGroup) {
	group.GET("/skills", r.GetSkills)
	group.GET("/experience", r.GetExperience)
	group.GET("/projects", r.GetProjects)
	group.GET("/socials", r.GetSocials)
}

func (r *ResumeApi) GetSkills(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, SkillsResponse{
			Skills: []Skill{
				{Name: "Java", Img: "/images/java.svg"},
				{Name: "Go", Img: "/images/golang.svg"},
				{Name: "Docker", Img: "/images/docker.png"},
				{Name: "Kotlin", Img: "/images/kotlin.png"},
				{Name: "Kubernetes", Img: "/images/k8s.svg"},
				{Name: "TypeScript", Img: "/images/ts.png"},
				{Name: "JavaScript", Img: "/images/js.svg"},
				{Name: "Git", Img: "/images/git.png"},
				{Name: "React", Img: "/images/react.png"},
				{Name: "MongoDB", Img: "/images/mongodb.png"},
				{Name: "AWS", Img: "/images/aws.svg"},
				{Name: "Python", Img: "/images/python.png"},
				{Name: "SQL", Img: "/images/sql.png"},
				{Name: "Android", Img: "/images/android.png"},
				{Name: "C# / .NET", Img: "/images/csharp.png"},
			},
			Tags: []string{
				"Datadog",
				"Artifactory",
				"Ambassador",
				"Spring",
				"Prometheus",
				"Helm",
				"CI/CD",
				"Argo",
				"GitOps",
				"Gin-gonic",
			},
		})
	})
}

func (r *ResumeApi) GetExperience(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, []Experience{
			{
				Company:     "ImagineX",
				Title:       "Solution Architect",
				Years:       "June 2024 - Present",
				Img:         "/images/ix.jpeg",
				Description: "Cloud Engineering / Software Leadership Consultant. Consulted with FanDuel on their Responsible Gaming tools, and led an engineering team to build new features for customer protection. Now consulting with Chick-fil-A.",
			},
			{
				Company:     "Big Nerd Ranch",
				Title:       "Senior Software Engineer",
				Years:       "July 2020 — June 2024",
				Img:         "/images/bnr.png",
				Description: "Cloud engineering consultant. Designing platforms and shipping production systems for clients across industries.",
			},
			{
				Company:     "Cisco",
				Title:       "Software Engineer",
				Years:       "April 2019 — July 2020",
				Img:         "/images/cisco.svg",
				Description: "Built dockerized webapps in Kubernetes for internal developer tools. Delivered platform services — DNS, Artifactory, source control — to other engineering teams.",
			},
			{
				Company:     "Q-Free",
				Title:       "Junior Software Engineer",
				Years:       "December 2017 — April 2019",
				Img:         "/images/q-free.jpg",
				Description: "Worked on a GWT app showing live traffic data to DOTs. Used TypeScript and D3 for live visualizations and to automatically adjust Variable Speed Limit (VSL) signs.",
			},
			{
				Company:     "Honeywell",
				Title:       "Junior Software Engineer",
				Years:       "January 2017 — December 2017",
				Img:         "/images/honeywell.png",
				Description: "Wrote a Python library for blackbox firmware tests to assist EE staff, plus small Angular tools for managing ownership of test machines.",
			},
			{
				Company:     "iPipeline",
				Title:       "Software Configuration Specialist",
				Years:       "May 2016 — August 2016",
				Img:         "/images/ipipeline.png",
				Description: "Converted a cloud app to a locally hosted instance for customers needing offline access. Automated installation flows for end-users.",
			},
			{
				Company:     "iPipeline",
				Title:       "Lead Development Intern",
				Years:       "December 2013 — November 2015",
				Img:         "/images/ipipeline.png",
				Description: "Worked on a C#.NET web app meeting customer requests for insurance application behaviors. Built a tool to detect and fix duplicate configurations to optimize build times.",
			},
		})
	})
}

func (r *ResumeApi) GetProjects(c *gin.Context) {
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

func (r *ResumeApi) GetSocials(c *gin.Context) {
	domain.ExcludeDomains([]string{domain.Quand}, c, func(c *gin.Context) {
		c.JSON(http.StatusOK, []Social{
			{Name: "LinkedIn", URL: "https://www.linkedin.com/in/keith-mackay-047b9387/", Icon: "linkedin"},
			{Name: "GitLab", URL: "https://gitlab.com/kamackay", Icon: "gitlab"},
			{Name: "GitHub", URL: "https://github.com/kamackay", Icon: "github"},
		})
	})
}
