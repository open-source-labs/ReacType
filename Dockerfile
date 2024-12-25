# Stage 1: Install
FROM node:21.2.0-alpine AS installation

# this at a least keeps the packageloc out of the build stage.
COPY package*.json ./
# we do need this.

RUN npm install --omit=dev --no-install-recommends --fetch-retry-maxtimeout 500000




# Stage 1: Build
FROM node:21.2.0-alpine AS build

# python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
# as of the v22 team, this does nothing to help the package size, and is not needed, prior to v22, the package size grew to > 3 GB,but the v22 team got it down to 1.48Gb by streamliging the dockerfile logic.
# RUN apk add --no-cache --virtual .gyp \
#     python3 \
#     make \
#     g++

ENV NODE_ENV='production'


# we can just copy this for savings in build stage ram cap?
COPY --from=installation ./node_modules ./node_modules


#yep, we have to copy these.... );
COPY ./index.html ./index.html
#COPY ./app/src/public/styles/style.css ./app/src/public/styles/style.css
COPY ./app/src ./app/src
COPY ./vite.config.ts ./vite.config.ts
COPY ./resources ./resources
COPY ./src ./src 
# we need the package.json, but hopefully, not the pacakge lock.
COPY ./package.json ./

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
