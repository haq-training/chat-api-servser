FROM node:19.7.0 AS development

WORKDIR /app/

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY .env ./

EXPOSE 4000
CMD npm start
