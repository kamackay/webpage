FROM alpine:latest AS builder

WORKDIR /root

RUN apk upgrade --update --no-cache && \
    apk add --no-cache yarn nodejs

ADD ./package.json .

RUN yarn install --verbose

ENV PATH /root/node_modules/.bin:$PATH

COPY ./src ./src
COPY ./public ./public
COPY *.json ./


RUN yarn build

FROM kamackay/nginx:latest

COPY --from=builder /root/build /www/

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
