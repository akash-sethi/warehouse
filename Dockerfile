FROM node:14.17-alpine3.14

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

COPY tsconfig.json ./

USER node

COPY --chown=node:node src ./src

RUN yarn install

RUN yarn tsc

FROM node:14.17-alpine3.14

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

COPY ecosystem.config.json ./

RUN yarn install --only=production

COPY --chown=node:node --from=0 /usr/src/app/dist .

EXPOSE 3000

CMD ["npm","start"]
