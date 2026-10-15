package db

import (
	"context"
	"time"

	"github.com/uptrace/bun"
)

type PicsDatabase struct {
	db *bun.DB
}

type Pic struct {
	bun.BaseModel `bun:"table:pics"`

	Id       int64  `bun:",pk,autoincrement" json:"id"`
	Title    string `bun:",notnull" json:"title"`
	Image    []byte `bun:",notnull" json:"-"` // raw image bytes
	Hidden   bool   `bun:",nullzero,notnull,default:false" json:"hidden"`
	Taken    int64  `bun:",nullzero" json:"taken"`    // unix millis, when photo was shot
	Uploaded int64  `bun:",nullzero" json:"uploaded"` // unix millis, when row was inserted

	// Metadata / EXIF
	Camera       string  `bun:",nullzero" json:"camera"`       // e.g. "Fujifilm X-T4"
	Lens         string  `bun:",nullzero" json:"lens"`         // e.g. "XF 35mm f/1.4 R"
	Aperture     float64 `bun:",nullzero" json:"aperture"`     // f-stop, e.g. 1.4
	FocalLength  float64 `bun:",nullzero" json:"focalLength"`  // mm, e.g. 35
	ShutterSpeed string  `bun:",nullzero" json:"shutterSpeed"` // e.g. "1/250"
	Iso          int     `bun:",nullzero" json:"iso"`          // e.g. 400
	Width        int     `bun:",nullzero" json:"width"`        // pixels
	Height       int     `bun:",nullzero" json:"height"`       // pixels
}

func NewPicsDatabase() (*PicsDatabase, error) {
	return &PicsDatabase{db: GetPicsDb()}, CreateSchema((*Pic)(nil))
}

func (pd *PicsDatabase) Create(pic *Pic) error {
	if pic.Uploaded == 0 {
		pic.Uploaded = time.Now().UnixMilli()
	}
	_, err := pd.db.NewInsert().Model(pic).Exec(context.Background())
	return err
}

func (pd *PicsDatabase) GetById(id int64) (*Pic, error) {
	pic := &Pic{Id: id}
	err := pd.db.NewSelect().Model(pic).WherePK().Scan(context.Background())
	return pic, err
}

func (pd *PicsDatabase) GetIds() ([]int64, error) {
	var ids []int64
	err := pd.db.NewSelect().Model((*Pic)(nil)).Column("id").Order("id").Scan(context.Background(), &ids)
	return ids, err
}

func (pd *PicsDatabase) GetAll() ([]Pic, error) {
	list := make([]Pic, 0)
	err := pd.db.NewSelect().Model(&list).ExcludeColumn("image").Order("id").Scan(context.Background())
	return list, err
}

func (pd *PicsDatabase) GetVisible() ([]Pic, error) {
	list := make([]Pic, 0)
	err := pd.db.NewSelect().Model(&list).
		ExcludeColumn("image").
		Where("NOT COALESCE(hidden, false)").
		Order("taken DESC").
		Scan(context.Background())
	return list, err
}
