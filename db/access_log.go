package db

import (
	"context"
	"sync"

	"github.com/kamackay/webpage/model"
	"github.com/uptrace/bun"
)

type AccessLogDatabase struct {
	db    *bun.DB
	locks sync.Map
}

func NewAccessLogDb() (*AccessLogDatabase, error) {
	db := &AccessLogDatabase{db: GetDb()}
	return db, CreateSchema((*model.AccessLogDatum)(nil))
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
