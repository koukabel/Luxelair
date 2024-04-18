FROM node:18-alpine as base

WORKDIR /app

RUN mkdir -p public

COPY package*.json .
RUN npm install

COPY . .

FROM base as dev
CMD npm run dev

FROM base as prod
CMD npm run start
RUN npm run build