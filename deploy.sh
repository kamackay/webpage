docker build . -t kamackay/webpage:$1 && \
    docker push kamackay/webpage:$1 && \
    kubectl --context do-nyc3-keithmackay-cluster -n webpage set image ds/webpage webpage=kamackay/webpage:$1
