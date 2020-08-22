FROM node:alpine AS builder

WORKDIR /root

# RUN yarn global add ufnr

ADD ./package.json .

RUN yarn install

ENV PATH /root/node_modules/.bin:$PATH

COPY ./src ./src
COPY ./public ./public
COPY *.json ./

RUN yarn build

FROM kamackay/nginx:latest

WORKDIR /log
WORKDIR /www

COPY --from=builder /root/build /www/

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
