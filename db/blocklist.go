package db

import (
	"context"
	"time"

	"github.com/kamackay/webpage/model"
	"github.com/uptrace/bun"
)

type BlocklistDatabase struct {
	db *bun.DB
}

type BlockedDomain struct {
	bun.BaseModel `bun:"table:blocked_domains"`

	Domain         string `bun:"domain,pk" json:"domain"`
	Source         string `bun:"source,nullzero" json:"source"`
	Added          int64  `bun:",nullzero" json:"added"`
	UploadedToNext bool   `bun:",nullzero" json:"uploadedToNext"`
}

func NewBlocklistDatabase() (*BlocklistDatabase, error) {
	return &BlocklistDatabase{db: GetDb()}, CreateSchema((*BlockedDomain)(nil))
}

func (bd *BlocklistDatabase) AddDomain(domain string, source string) error {
	_, err := bd.db.NewInsert().Model(&BlockedDomain{
		Domain:         domain,
		Source:         source,
		UploadedToNext: false,
		Added:          time.Now().UnixMilli(),
	}).On("CONFLICT DO NOTHING").Exec(context.Background())
	return err
}

func (bd *BlocklistDatabase) GetAll() ([]BlockedDomain, error) {
	var list []BlockedDomain
	err := bd.db.NewSelect().Model(&list).Scan(context.Background())
	return list, err
}

func (bd *BlocklistDatabase) GetStats() (*model.StatsQueryResult, error) {
	var stats model.StatsQueryResult
	err := bd.db.NewRaw(
		`SELECT count(*) AS "count", `+
			`count(*) FILTER (WHERE uploaded_to_next IS TRUE) AS "uploaded" `+
			`FROM blocked_domains`,
	).Scan(context.Background(), &stats)
	return &stats, err
}
