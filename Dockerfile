FROM kamackay/alpine

EXPOSE 5000

COPY ./ ./

RUN yarn global add serve
RUN yarn build

CMD serve dist/