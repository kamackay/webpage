# syntax=docker/dockerfile:1.7

# ---- Build stage ---------------------------------------------------------
FROM golang:1.26-alpine AS build

WORKDIR /src

# Cache module downloads first so source edits don't bust them.
COPY go.mod go.sum ./
RUN go mod download

# Source + embedded assets.
COPY ./ ./
COPY web ./web

# Static, stripped binary. CGO off so we can run on a scratch base.
ARG APP_VERSION=dev
ENV CGO_ENABLED=0 GOOS=linux
RUN go build \
    -trimpath \
    -ldflags="-s -w -X main.versionFromBuild=${APP_VERSION}" \
    -o /out/server \
    ./

# ---- Runtime stage -------------------------------------------------------
FROM gcr.io/distroless/static-debian12:nonroot AS runtime

WORKDIR /app
COPY --from=build /out/server /app/server

EXPOSE 8080
ENV PORT=8080 GIN_MODE=release

USER nonroot:nonroot
ENTRYPOINT ["/app/server"]
