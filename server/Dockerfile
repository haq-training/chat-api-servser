FROM node:19.7.0 AS development

WORKDIR /app/

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY tsconfig.json ./

EXPOSE 4000
CMD npm start
