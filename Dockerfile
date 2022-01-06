FROM node
WORKDIR C:/Users/abeer/Development/ReacType-LA47
COPY ./package*.json .
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install -D concurrently electron-splashscreen --force
RUN npm install
COPY . .
EXPOSE 3002




