docker buildx build --tag registry.digitalocean.com/keith/webpage:latest --platform linux/arm64/v8,linux/amd64 --builder container --push .
