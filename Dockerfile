
# Two stage built
# Image 1: Compiled image
FROM node:19.7.0 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

# Image 2: Production/deploy image
FROM base as production

ENV NODE_PATH=./dist

RUN npm run dist