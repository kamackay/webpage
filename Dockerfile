FROM alpine:latest
WORKDIR /root

RUN apk upgrade --update --no-cache && \
    apk add --no-cache yarn nodejs && \
    yarn global add forever serve

ENV PATH /root/node_modules/.bin:$PATH

COPY ./ ./

# RUN yarn global add serve react-scripts-ts npm-run-all
RUN yarn build && \
    rm -rf src && \
    rm -rf node_modules && \
    rm -rf public

CMD serve -s build/
