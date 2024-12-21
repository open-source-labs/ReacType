# Stage 1: Build
FROM node:21.2.0-alpine AS build

# python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++

ENV NODE_ENV='production'



 COPY package*.json ./
# we do need this.

RUN npm install --omit=dev --no-install-recommends --fetch-retry-maxtimeout 500000

#yep, we have to copy these.... );
COPY ./index.html ./index.html
#COPY ./app/src/public/styles/style.css ./app/src/public/styles/style.css
COPY ./app/src ./app/src
COPY ./vite.config.ts ./vite.config.ts
COPY ./resources ./resources
COPY ./src ./src 

RUN npm run prod-build 



# # Stage 2: Runtime
FROM node:21.2.0-alpine AS runtime

 WORKDIR /app


COPY --from=build /build /app/build


# just copy this straight if we can?
COPY ../server ./server

# these things build dosent have so dont copy them through
COPY package*.json ./
COPY  .env .env
COPY ./config.js ./config.js


# and now we need to copy a bunch of stuff.
COPY --from=build ./node_modules ./node_modules

ENV PORT=5656
EXPOSE 5656

ENV IS_DOCKER=true

ENV VIDEOSDK='vidsdk'


CMD [ "npm", "start" ]
