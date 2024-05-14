# Stage 1: Build
FROM node:21.2.0-alpine as build

# python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++

WORKDIR /app

COPY package*.json ./

RUN npm install --no-install-recommends --fetch-retry-maxtimeout 500000

COPY . .

# Stage 2: Runtime
FROM node:21.2.0-alpine as runtime

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --no-install-recommends --only=production --fetch-retry-maxtimeout 500000

# COPY --from=build /app/.env .env
COPY --from=build /app/config.js ./config.js
COPY --from=build /app/server ./server
COPY --from=build /app/build /app

EXPOSE 5656

ENV IS_DOCKER true

CMD [ "npm", "start" ]