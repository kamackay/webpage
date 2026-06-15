package db

import (
	"sync"

	"github.com/go-pg/pg/v10"
)

type AccessLogDatabase struct {
	db    *pg.DB
	locks sync.Map
}

type AccessLogDatum struct {
	Ip        string `pg:"ip,pk" json:"ip"`
	UserAgent string `json:"userAgent"`
	Hits      int64  `json:"hits"`
	Bitch     bool   `json:"bitch"`
}

func NewAccessLogDb() (*AccessLogDatabase, error) {
	db := &AccessLogDatabase{db: GetDb()}
	return db, CreateSchema((*AccessLogDatum)(nil))
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

func (db *AccessLogDatabase) Insert(access AccessLogDatum) error {
	release := db.getIpLock(access.Ip)
	defer release()
	_, err := db.db.Model(&access).
		OnConflict("(ip) DO UPDATE SET hits = ?TableAlias.hits + 1").
		Insert()
	return err
}

func (db *AccessLogDatabase) IncrementHits(ip string) error {
	release := db.getIpLock(ip)
	defer release()
	_, err := db.db.Query(&AccessLogDatum{Ip: ip}, "UPDATE ?TableAlias SET hits = ?TableAlias.hits + 1 where ip = ?", ip)
	return err
}

func (db *AccessLogDatabase) GetBitches() ([]AccessLogDatum, error) {
	var results []AccessLogDatum
	err := db.db.Model(&results).Where("bitch is true").Select()
	return results, err
}

func (db *AccessLogDatabase) GetAll() ([]AccessLogDatum, error) {
	var results []AccessLogDatum
	err := db.db.Model(&results).Select()
	return results, err
}

func (db *AccessLogDatabase) IsBitch(ip string) (bool, error) {
	record := &AccessLogDatum{Ip: ip}
	err := db.db.Model(record).WherePK().Select()
	return record.Bitch, err
}

func (db *AccessLogDatabase) SetBitchStatus(ip string, bitch bool) error {
	release := db.getIpLock(ip)
	defer release()
	_, err := db.db.Model(&AccessLogDatum{Ip: ip, Bitch: bitch}).
		OnConflict("(ip) DO UPDATE SET bitch = EXCLUDED.bitch").
		Insert()
	return err
}
