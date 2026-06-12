# Webpage

Personal site for Keith MacKay. Static frontend served by a Go + gin-gonic
backend, with everything bundled into a single Docker image.

## Layout

```
.
├── main.go            # gin server, embeds web/static via go:embed
├── go.mod / go.sum
├── Dockerfile         # multi-stage: golang:alpine → distroless/static
└── web/static/        # frontend (HTML/CSS/JS) + images, favicon, etc.
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    └── images/...
```

## Run locally

```sh
go run .                  # listens on :8080 (override with PORT=...)
```

Then open <http://localhost:8080>.

## API

| Method | Path          | Notes                                   |
| ------ | ------------- | --------------------------------------- |
| GET    | `/api/health` | JSON: status, uptime, started, version  |

All other `/api/*` paths return JSON `404`. Anything else falls back to
`index.html` so the frontend can do client-side routing.

## Docker

```sh
docker build -t keith-webpage .
docker run --rm -p 8080:8080 keith-webpage
```

The runtime image is `distroless/static` and runs as `nonroot`. Static
assets are baked into the binary via `embed.FS`, so the container is a
single ~40 MB layer with no shell.
