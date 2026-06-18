package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"sync"
	"time"

	"github.com/kamackay/webpage/model"
	_ "github.com/mattn/go-sqlite3"
	"github.com/uptrace/bun"
)

const defaultSqliteDSN = "file::memory:?cache=shared"

type AccessLogDatabase struct {
	db     *bun.DB
	sqlite *sql.DB
	locks  sync.Map
}

func NewAccessLogDb() (*AccessLogDatabase, error) {
	dsn := os.Getenv("SQLITE_PATH")
	if dsn == "" {
		dsn = defaultSqliteDSN
	}
	sqlite, err := sql.Open("sqlite3", dsn)
	if err != nil {
		panic(err)
	}
	// Pin to one connection so the in-memory DB and its schema persist.
	sqlite.SetMaxOpenConns(1)
	db := &AccessLogDatabase{db: GetDb(), sqlite: sqlite}
	if err := db.InitSqlite(); err != nil {
		panic(err)
	}
	return db, CreateSchema((*model.AccessLogDatum)(nil))
}

func (db *AccessLogDatabase) InitSqlite() error {
	_, err := db.sqlite.Exec(`create table if not exists request_log (url text, ip text, method text, status int, userAgent text, time integer);`)
	return err
}

func (db *AccessLogDatabase) getIpLock(ip string) func() {
	var lock *sync.Mutex
	v, ok := db.locks.Load(ip)
	if !ok {
		lock = &sync.Mutex{}
		db.locks.Store(ip, lock)
	} else {
		lock = v.(*sync.Mutex)
	}
	lock.Lock()
	return func() { lock.Unlock() }
}

func (db *AccessLogDatabase) StoreRequestLog(l *model.RequestLog) error {
	tx, err := db.sqlite.Begin()
	if err != nil {
		return err
	}
	stmt, err := tx.Prepare("insert into request_log(url, ip, method, status, userAgent, time) values(?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(l.Url, l.Ip, l.Method, l.Status, l.UserAgent, l.Time.UnixMilli())
	if err != nil {
		return err
	}
	return tx.Commit()
}

func (db *AccessLogDatabase) GetRequestLogs() ([]model.RequestLog, error) {
	logs := make([]model.RequestLog, 0)
	rows, err := db.sqlite.Query("select url, ip, method, status, userAgent, time from request_log")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var l model.RequestLog
		var t int64
		err = rows.Scan(&l.Url, &l.Ip, &l.Method, &l.Status, &l.UserAgent, &t)
		if err != nil {
			fmt.Printf("error reading row: %+v", err)
			continue
		}
		l.Time = time.UnixMilli(t)
		logs = append(logs, l)
	}
	return logs, rows.Err()
}

func (db *AccessLogDatabase) Insert(access model.AccessLogDatum) error {
	release := db.getIpLock(access.Ip)
	defer release()
	_, err := db.db.NewInsert().
		Model(&access).
		On("CONFLICT (ip) DO UPDATE").
		Set("hits = ?TableAlias.hits + 1").
		Exec(context.Background())
	return err
}

func (db *AccessLogDatabase) IncrementHits(ip string) error {
	release := db.getIpLock(ip)
	defer release()
	_, err := db.db.NewUpdate().
		Model((*model.AccessLogDatum)(nil)).
		Set("hits = ?TableAlias.hits + 1").
		Where("ip = ?", ip).
		Exec(context.Background())
	return err
}

func (db *AccessLogDatabase) GetBitches() ([]model.AccessLogDatum, error) {
	var results []model.AccessLogDatum
	err := db.db.NewSelect().Model(&results).Where("bitch is true").Scan(context.Background())
	return results, err
}

func (db *AccessLogDatabase) GetAll() ([]model.AccessLogDatum, error) {
	var results []model.AccessLogDatum
	err := db.db.NewSelect().Model(&results).Scan(context.Background())
	return results, err
}

func (db *AccessLogDatabase) IsBitch(ip string) (bool, error) {
	record := &model.AccessLogDatum{Ip: ip}
	err := db.db.NewSelect().Model(record).WherePK().Scan(context.Background())
	return record.Bitch, err
}

func (db *AccessLogDatabase) SetBitchStatus(ip string, bitch bool) error {
	release := db.getIpLock(ip)
	defer release()
	_, err := db.db.NewInsert().
		Model(&model.AccessLogDatum{Ip: ip, Bitch: bitch}).
		On("CONFLICT (ip) DO UPDATE").
		Set("bitch = EXCLUDED.bitch").
		Exec(context.Background())
	return err
}
