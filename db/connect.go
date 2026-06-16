package db

import (
	"context"
	"database/sql"
	"os"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

var rootDatabase *bun.DB

func GetDb() *bun.DB {
	if rootDatabase == nil {
		// pgdriver parses sslmode from the DSN and, for verify-ca/verify-full,
		// sets tls.Config.ServerName from the host itself, so the ServerName
		// workaround go-pg required is no longer needed here.
		sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(os.Getenv("DATABASE_URL"))))
		rootDatabase = bun.NewDB(sqldb, pgdialect.New())
	}
	return rootDatabase
}

func CreateSchema[T any](model T) error {
	if rootDatabase == nil {
		rootDatabase = GetDb()
	}
	_, err := rootDatabase.NewCreateTable().
		Model(model).
		IfNotExists().
		Exec(context.Background())
	return err
}
