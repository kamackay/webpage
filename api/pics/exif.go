package pics

import (
	"bytes"
	"fmt"
	"image/jpeg"
	"strings"
	"time"

	"github.com/rwcarlsen/goexif/exif"
)

type imageMetadata struct {
	Camera       string
	Lens         string
	Aperture     float64
	FocalLength  float64
	ShutterSpeed string
	Iso          int
	Taken        time.Time
	Width        int
	Height       int
}

// extractMetadata pulls dimensions from the JPEG header and, where present,
// camera/lens/exposure metadata from the image's EXIF data. Any value it
// can't find is left at its zero value.
func extractMetadata(imageBytes []byte) imageMetadata {
	var meta imageMetadata

	if cfg, err := jpeg.DecodeConfig(bytes.NewReader(imageBytes)); err == nil {
		meta.Width = cfg.Width
		meta.Height = cfg.Height
	}

	x, err := exif.Decode(bytes.NewReader(imageBytes))
	if err != nil {
		return meta
	}

	meta.Camera = exifCamera(x)
	meta.Lens = exifString(x, exif.LensModel)
	meta.Aperture = exifFloat(x, exif.FNumber)
	meta.FocalLength = exifFloat(x, exif.FocalLength)
	meta.ShutterSpeed = exifShutterSpeed(x)
	meta.Iso = exifInt(x, exif.ISOSpeedRatings)
	if taken, err := x.DateTime(); err == nil {
		meta.Taken = taken
	}

	return meta
}

func exifString(x *exif.Exif, field exif.FieldName) string {
	tag, err := x.Get(field)
	if err != nil {
		return ""
	}
	s, err := tag.StringVal()
	if err != nil {
		return ""
	}
	return strings.TrimSpace(strings.TrimRight(s, "\x00"))
}

func exifFloat(x *exif.Exif, field exif.FieldName) float64 {
	tag, err := x.Get(field)
	if err != nil {
		return 0
	}
	r, err := tag.Rat(0)
	if err != nil {
		return 0
	}
	f, _ := r.Float64()
	return f
}

func exifInt(x *exif.Exif, field exif.FieldName) int {
	tag, err := x.Get(field)
	if err != nil {
		return 0
	}
	i, err := tag.Int(0)
	if err != nil {
		return 0
	}
	return i
}

func exifShutterSpeed(x *exif.Exif) string {
	tag, err := x.Get(exif.ExposureTime)
	if err != nil {
		return ""
	}
	num, den, err := tag.Rat2(0)
	if err != nil || num == 0 {
		return ""
	}
	if den == 1 {
		return fmt.Sprintf("%d", num)
	}
	return fmt.Sprintf("%d/%d", num, den)
}

// exifCamera joins Make and Model, dropping the duplication some cameras
// have where Model already repeats the Make (e.g. "Canon" / "Canon EOS R5").
func exifCamera(x *exif.Exif) string {
	make := exifString(x, exif.Make)
	model := exifString(x, exif.Model)
	switch {
	case make == "":
		return model
	case model == "":
		return make
	case strings.HasPrefix(model, make):
		return model
	default:
		return make + " " + model
	}
}
