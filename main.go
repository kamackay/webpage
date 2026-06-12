package main

import (
	"embed"

	"github.com/kamackay/webpage/server"
)

//go:embed all:web/static
var staticFS embed.FS

func main() {
	s := server.NewServer(staticFS)

	s.Start()
}
