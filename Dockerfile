# syntax=docker/dockerfile:1.7

# ---- Build stage ---------------------------------------------------------
FROM golang:1.26-alpine AS build

# CGO (needed by github.com/mattn/go-sqlite3) requires a C toolchain.
RUN apk add --no-cache gcc musl-dev

WORKDIR /src

# Cache module downloads first so source edits don't bust them.
COPY go.mod go.sum ./
RUN go mod download

# Source + embedded assets.
COPY ./ ./
COPY web ./web

# CGO on, so the binary links dynamically against musl (hence the Alpine runtime).
ARG APP_VERSION=dev
ENV CGO_ENABLED=1 GOOS=linux
RUN go build \
    -trimpath \
    -ldflags="-s -w -X main.versionFromBuild=${APP_VERSION}" \
    -o /out/server \
    ./

# ---- Runtime stage -------------------------------------------------------
# Alpine provides musl libc for the dynamically-linked CGO binary (~7 MB base).
FROM alpine:3.21 AS runtime

RUN apk add --no-cache ca-certificates \
    && addgroup -S app \
    && adduser -S -G app -u 65532 app

WORKDIR /app
COPY --from=build /out/server /app/server

EXPOSE 8080
ENV PORT=8080 GIN_MODE=release

USER app
ENTRYPOINT ["/app/server"]
