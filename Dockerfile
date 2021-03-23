FROM node:10.1
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run prod-build
EXPOSE 5000
CMD npm run server