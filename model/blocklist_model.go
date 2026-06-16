package model

import "github.com/uptrace/bun"

type StatsQueryResult struct {
	Count         int `json:"count" bun:"count"`
	CountUploaded int `json:"uploaded" bun:"uploaded"`
}

type Blocklist struct {
	Url  string `json:"url"`
	Name string `json:"name"`
}

type AccessLogDatum struct {
	bun.BaseModel `bun:"table:access_log_data"`

	Ip        string `bun:"ip,pk" json:"ip"`
	UserAgent string `bun:",nullzero" json:"userAgent"`
	Hits      int64  `bun:",nullzero" json:"hits"`
	Bitch     bool   `bun:",nullzero" json:"bitch"`
}
