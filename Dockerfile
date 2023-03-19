FROM node:19

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

# create docker image: docker build -t reactype-container .     Note: replace my-docker-image with a name (must be all lowercase)
# run docker container: docker run -d -p 5656:5656 reactype-container