IMAGE=registry.gitlab.com/kamackay/webpage:$1

docker build . -t $IMAGE && \
    # docker-squash "$IMAGE" --tag "$IMAGE" && \
    docker push $IMAGE && \
    kubectl --context do-nyc3-keithmackay-cluster -n webpage \
    set image ds/webpage webpage=$IMAGE
