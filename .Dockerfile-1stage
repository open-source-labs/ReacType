FROM node:19-alpine

#python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ 

WORKDIR /app

COPY package*.json ./

COPY app/dist /app

# COPY .env .env

COPY server ./server

COPY config.js ./config.js

RUN npm install --no-install-recommends

EXPOSE 5656

ENV IS_DOCKER true

CMD [ "npm", "start" ]

# create docker image: "docker build -t reactype-container ." Note: if you want reactype-container with a different name (must be all lowercase)
# run docker container: "docker run -d -p 5656:5656 reactype-container" docker run -d -p 5656:5656 reactype-v15
# comment out window.api.formatCode(), but will break it for electron app.