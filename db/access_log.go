package db

import "github.com/go-pg/pg/v10"

type AccessLogDatabase struct {
	db *pg.DB
}

type AccessLogDatum struct {
	Datum

	Ip        string `pg:"ip,pk"`
	UserAgent string
	Hits      int64
}

func NewAccessLogDb() (*AccessLogDatabase, error) {
	db := &AccessLogDatabase{db: GetDb()}
	return db, CreateSchema((*AccessLogDatum)(nil))
}

func (db AccessLogDatabase) Insert(access AccessLogDatum) error {
	_, err := db.db.Model(&access).
		OnConflict("(ip) DO UPDATE SET hits = ?TableAlias.hits + 1").
		Insert()
	return err
}
