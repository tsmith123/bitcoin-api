FROM node:14.17.0-alpine
RUN mkdir -p /home/node/nodana/node_modules && chown -R node:node /home/node/nodana
WORKDIR /home/node/nodana
COPY package*.json ./
COPY nodemon.json ./
USER node
RUN yarn
COPY --chown=node:node . .