FROM kamackay/alpine

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app
COPY ./ ./

RUN yarn global add serve react-scripts-ts npm-run-all
RUN yarn build

EXPOSE 5000
CMD serve -s build/
