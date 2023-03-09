FROM node:alpine
WORKDIR /usr/wakinator
COPY index.js server.js logger.js package.json LICENSE.md ./
RUN npm install
CMD ["node", "./index.js"]