package db

import (
	"net/url"
	"os"
	"strings"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

var rootDatabase *pg.DB

func GetDb() *pg.DB {
	if rootDatabase == nil {
		connectionString := os.Getenv("DATABASE_URL")
		u, err := url.Parse(connectionString)
		if err != nil {
			panic(err)
		}
		password, _ := u.User.Password()
		rootDatabase = pg.Connect(&pg.Options{
			Addr:     u.Host,
			User:     u.User.Username(),
			Password: password,
			Database: strings.Replace(u.Path, "/", "", -1),
		})
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
