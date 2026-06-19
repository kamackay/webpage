# syntax=docker/dockerfile:1.7

# ---- Build stage ---------------------------------------------------------
FROM golang:1.26-alpine AS build

RUN apk add --no-cache gcc musl-dev

WORKDIR /src

# Cache module downloads first so source edits don't bust them.
COPY go.mod go.sum ./
RUN go mod download

# Source + embedded assets.
COPY ./ ./
COPY web ./web

# Static CGO build (musl folded in, pure-Go net/user) so it runs on distroless/static.
ARG APP_VERSION=dev
ENV CGO_ENABLED=1 GOOS=linux
RUN go build \
    -trimpath \
    -tags "osusergo netgo" \
    -ldflags="-s -w -linkmode external -extldflags '-static' -X main.versionFromBuild=${APP_VERSION}" \
    -o /out/server \
    ./

# ---- Runtime stage -------------------------------------------------------
FROM gcr.io/distroless/static-debian12:nonroot AS runtime

COPY --from=build /out/server /app/server

EXPOSE 8080
ENV PORT=8080 GIN_MODE=release

USER nonroot:nonroot
ENTRYPOINT ["/app/server"]
