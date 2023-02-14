FROM node:18

WORKDIR /app

COPY ./api /app

RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]