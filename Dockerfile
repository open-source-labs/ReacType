FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5656

CMD ["npm", "run", "dev"]