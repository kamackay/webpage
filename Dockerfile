FROM alpine:latest
WORKDIR /root

RUN apk upgrade --update --no-cache && \
    apk add --no-cache yarn nodejs && \
    yarn global add forever serve

ADD ./package.json .

RUN yarn install

ENV PATH /root/node_modules/.bin:$PATH

COPY ./ ./

RUN yarn build && \
    rm -rf src && \
    rm -rf node_modules && \
    rm -rf public

CMD serve -s build/
