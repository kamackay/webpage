FROM kamackay/alpine

EXPOSE 5000

COPY ./ ./

RUN yarn global add serve react-scripts-ts
RUN yarn build

CMD serve dist/