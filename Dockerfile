FROM node:14.16.0-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

COPY tsconfig.json ./

USER node

COPY --chown=node:node src ./src

RUN yarn install

RUN yarn build

FROM node:14.16.0-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --only=production

COPY --chown=node:node --from=0 /usr/src/app/dist .

EXPOSE 3000

CMD ["yarn","start"]
