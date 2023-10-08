# CM API
#### API project _Building a Node.js/TypeScript Graphql/Apollo API_ :
* * *
## Prerequisites
* Install Docker.
* Install Docker Compose.
* Install Nodejs (This project is built at node version: **19.7.0**).
## Running Project
1. Create file .env with following content then copy to root folder **_`chat-api-server`_**
```shell
NODE_ENV=development

# Admin server configuration
SERVER_HOST=localhost
SERVER_PORT=4003
SECRET=super-secret-training2023

# Database configuration
MYSQL_USER=admin
MYSQL_PASSWORD=training2023PDC
MYSQL_ROOT_PASSWORD=training2023PDC
MYSQL_NAME=chat-mysql
MYSQL_PORT=3306
MYSQL_HOST=chat-mysql-db

# Minio configuration
MINIO_DOMAIN=http://116.103.228.13:9001/
MINIO_BUCKET=dev-app
MINIO_ENDPOINT=116.103.228.13
MINIO_REGION=ap-northeast-1
MINIO_PORT=9000
MINIO_SSL=false
MINIO_ACCESS=0nDdejmzsR5j94dbhqGm
MINIO_SECRET=ex4l16UzfIAsCkkSH5ybMK7MWAYCD5J67SmD8wiL
```
2. Form folder `chat-api-server/server` run command install packages by:
```shell
npm install --legacy-peer-deps
```
3. From project folder(chat-api-server) run command (For sync database):
```shell
SYNC_DATA=true docker-compose up -d --build
```
4. From project folder run command :
```shell
docker-compose up -d --build
```