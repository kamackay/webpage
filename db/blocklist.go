package db

import (
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/kamackay/webpage/model"
)

type BlocklistDatabase struct {
	db *pg.DB
}

type BlockedDomain struct {
	Domain         string `pg:"domain,pk" json:"domain"`
	Source         string `pg:"source" json:"source"`
	Added          int64  `json:"added"`
	UploadedToNext bool   `json:"uploadedToNext"`
}

func NewBlocklistDatabase() (*BlocklistDatabase, error) {
	return &BlocklistDatabase{db: GetDb()}, CreateSchema((*BlockedDomain)(nil))
}

func (bd *BlocklistDatabase) AddDomain(domain string, source string) error {
	_, err := bd.db.Model(&BlockedDomain{
		Domain:         domain,
		Source:         source,
		UploadedToNext: false,
		Added:          time.Now().UnixMilli(),
	}).OnConflict("DO NOTHING").Insert()
	return err
}

func (bd *BlocklistDatabase) GetAll() ([]BlockedDomain, error) {
	var list []BlockedDomain
	err := bd.db.Model(&list).Select()
	return list, err
}

func (bd *BlocklistDatabase) GetStats() (*model.StatsQueryResult, error) {
	return nil, nil
}
