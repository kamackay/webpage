package model

type StatsQueryResult struct {
	Count int `json:"count" pg:"count"`
}

type Blocklist struct {
	Url  string `json:"url"`
	Name string `json:"name"`
}
