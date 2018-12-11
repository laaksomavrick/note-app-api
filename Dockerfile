#Build step

FROM node:10-alpine AS builder

WORKDIR /home/node/app
COPY . .
RUN yarn install && \
    yarn prestart:prod

# Run step

FROM node:10-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

COPY ./package* ./
RUN yarn install && \
    yarn cache clean --force
COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000

CMD node dist/main.js