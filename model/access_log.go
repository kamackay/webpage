package model

import "time"

type RequestLog struct {
	Url       string
	Ip        string
	Method    string
	Status    int
	UserAgent string
	Latency   string
	Time      time.Time
}
