package db

import (
	"net"
	"os"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

var rootDatabase *pg.DB

func GetDb() *pg.DB {
	if rootDatabase == nil {
		opts, err := pg.ParseURL(os.Getenv("DATABASE_URL"))
		if err != nil {
			panic(err)
		}
		if opts.TLSConfig != nil && !opts.TLSConfig.InsecureSkipVerify {
			// go-pg passes this config straight to tls.Client without
			// setting ServerName, so cert verification needs it set here.
			if host, _, err := net.SplitHostPort(opts.Addr); err == nil {
				opts.TLSConfig.ServerName = host
			}
		}
		rootDatabase = pg.Connect(opts)
	}
	return rootDatabase
}

func CreateSchema[T any](model T) error {
	if rootDatabase == nil {
		rootDatabase = GetDb()
	}
	err := rootDatabase.Model(model).CreateTable(&orm.CreateTableOptions{
		IfNotExists: true,
	})
	return err
}
