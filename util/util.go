package util

import "strings"

func Slugify(s string) string {
	var b strings.Builder
	prevHyphen := true // avoid a leading hyphen
	for _, r := range strings.ToLower(s) {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') {
			b.WriteRune(r)
			prevHyphen = false
		} else if !prevHyphen {
			b.WriteByte('-')
			prevHyphen = true
		}
	}
	return strings.TrimSuffix(b.String(), "-")
}
