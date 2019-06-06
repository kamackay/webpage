FROM kamackay/alpine

EXPOSE 5000
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./ ./

RUN yarn global add serve react-scripts-ts npm-run-all
RUN yarn build

CMD serve -s build/
