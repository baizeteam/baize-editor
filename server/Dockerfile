FROM node:22-alpine

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 6652

CMD ["node", "./main.js"]
