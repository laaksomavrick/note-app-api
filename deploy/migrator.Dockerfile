#Build step

FROM node:10-alpine AS builder

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#node-gyp-alpine
RUN apk add --no-cache --virtual .gyp python make g++

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY ./tsconfig.json .
COPY ./src/db ./src/db
COPY ./src/config ./src/config
COPY ./src/logger ./src/logger
COPY ./lib ./lib

RUN yarn prestart:prod

COPY ./lib/db/migrations ./dist/lib/db/migrations
COPY ./lib/db/seeds ./dist/lib/db/seeds

# Run step

FROM node:10-alpine
ENV NODE_ENV=production

COPY --from=builder ./package.json ./package.json
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist

CMD node dist/lib/db/main.js