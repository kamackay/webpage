docker build . -t registry.gitlab.com/kamackay/webpage:$1 && \
    docker push registry.gitlab.com/kamackay/webpage:$1 && \
    kubectl --context do-nyc3-keithmackay-cluster -n webpage \
    set image ds/webpage webpage=registry.gitlab.com/kamackay/webpage:$1
