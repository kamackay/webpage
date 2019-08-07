FROM kamackay/alpine

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app
COPY ./ ./

# RUN yarn global add serve react-scripts-ts npm-run-all
RUN yarn global add forever serve && \
    yarn build && \
    rm -rf src && \
    rm -rf node_modules && \
    rm -rf public

EXPOSE 5000
CMD serve -s build/
