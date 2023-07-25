
# Two stage built
# Stage 1: Compiled image
FROM node:19.7.0 as build

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

# Clean install
RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Production/deploy image
FROM node:19.7.0-alpine as production

WORKDIR /home/node/app

ENV NODE_ENV=production
ENV NODE_PATH=./dist

COPY --from=build /home/node/app/package*.json ./
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/public ./public
COPY --from=build /home/node/app/views ./views
COPY --from=build /home/node/app/db/migrations ./db/migrations
COPY --from=build /home/node/app/knexfile.js ./
COPY ./config.json ./config.json

RUN npm ci --production

CMD ["node", "dist/app.js"]