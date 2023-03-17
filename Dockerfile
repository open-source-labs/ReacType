FROM node:18

WORKDIR /app

COPY package*.json ./

COPY app/dist /app

COPY .env .env

COPY server ./server

COPY config.js ./config.js

RUN npm install

EXPOSE 5656

ENV IS_DOCKER true

CMD [ "npm", "start" ]