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


RUN npm install --no-install-recommends --fetch-retry-maxtimeout 500000
#RUN npm run prod-build 
# install vite virst


COPY . .

# Stage 2: Runtime
FROM node:21.2.0-alpine AS runtime

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --no-install-recommends --fetch-retry-maxtimeout 500000

# RUN npm run dev-frontend # no, dont just run the app while building

# make a build file?


# --only=prod
# COPY --from=build /app/.env .env
COPY --from=build /app/config.js ./config.js
COPY --from=build /app/server ./server
COPY --from=build /app/build /app/build




EXPOSE 5656

ENV IS_DOCKER=true


ENV VIDEOSDK='vidsdk'
 ENV NODE_ENV='development'
 ENV DEV_PORT=5656
 ENV PORT=5656

 ENV MONGO_DB='mongodb+srv://NOAH:aAnY8q13q1tCha8e@trialcluster.v4see.mongodb.net/?retryWrites=true&w=majority&appName=TrialCluster'
 ENV GITHUB_CLIENT='github client'
 ENV GITHUB_SECRET='github secret'
 ENV GOOGLE_CLIENT='gogleclient'
 ENV GOOGLE_SECRET='googlebutitssecret'
 ENV SESSION_SECRET='session,but its secret'

CMD [ "npm", "start" ]