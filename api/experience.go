package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamackay/webpage/domain"
)

type Experience struct {
	Company     string `json:"company"`
	Title       string `json:"title"`
	Years       string `json:"years"`
	Img         string `json:"img"`
	Description string `json:"description"`
}

func GetExperience(c *gin.Context) {
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
