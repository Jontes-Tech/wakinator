FROM node:lts-alpine3.17
WORKDIR /usr/wakinator
COPY package.json ./
RUN npm install
USER node
COPY --chown=node:node index.js server.js logger.js ./
CMD ["node", "./index.js"]