#Build step

FROM node:10-alpine AS builder

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#node-gyp-alpine
RUN apk add --no-cache --virtual .gyp python make g++

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn cache clean --force && \
    yarn install

COPY ./tsconfig.json .
COPY ./src ./src

RUN yarn prestart:prod

# Run step

FROM node:10-alpine
ENV NODE_ENV=production

# COPY ./package* ./
# RUN yarn install && \
#     yarn cache clean --force
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist

EXPOSE 3000

CMD node dist/main.js