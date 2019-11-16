FROM alpine:latest AS builder

WORKDIR /root

RUN apk upgrade --update --no-cache && \
    apk add --no-cache yarn nodejs

ADD ./package.json .

RUN yarn install

ENV PATH /root/node_modules/.bin:$PATH

COPY ./src ./src
COPY ./public ./public
COPY *.json ./


RUN yarn build && \
    rm -rf src && \
    rm -rf node_modules && \
    rm -rf public

FROM kamackay/nginx

COPY --from=builder /root/build /www/

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
