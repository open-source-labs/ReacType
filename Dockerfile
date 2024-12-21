# Stage 1: Build
FROM node:21.2.0-alpine AS build

# python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++

RUN npm install -g npm@10.9.1


WORKDIR /app

COPY package*.json ./
# also make the below copies for the runtime stage to use.
COPY ./config.js ./config.js
COPY ./server ./server


RUN npm install --production --no-install-recommends --fetch-retry-maxtimeout 500000

# install vite virst


COPY ./index.html ./index.html
#COPY ./app/src/public/styles/style.css ./app/src/public/styles/style.css
COPY ./app/src ./app/src
COPY ./vite.config.ts ./vite.config.ts
COPY ./resources ./resources
COPY ./src ./src 


#also copy this one file lol.

 ENV NODE_ENV='production'
 # i am hoping the above will make it so that the frontend files will know that it is production.
RUN npm run prod-build 


#COPY ./build ./build
# they will need the above.

# Stage 2: Runtime
FROM node:21.2.0-alpine AS runtime

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --production --no-install-recommends --fetch-retry-maxtimeout 500000

# RUN npm run dev-frontend # no, dont just run the app while building

# make a build file?


# --only=prod
# COPY --from=build /app/.env .env
COPY --from=build /app/config.js ./config.js
COPY --from=build /app/server ./server
COPY --from=build /app/build /app/build

COPY .env .env
#just make the env file go into the docker image?


EXPOSE 5656

ENV IS_DOCKER=true


ENV VIDEOSDK='vidsdk'

 ENV PORT=5656

# no longer put the envs here

CMD [ "npm", "start" ]
