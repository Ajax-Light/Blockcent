ARG NODE_VER=16
FROM node:${NODE_VER}-alpine

USER node
WORKDIR /home/node/app

EXPOSE 8090

COPY . .
RUN npm install
ENV PATH=$PATH:./node_modules/.bin
ENV NODE_ENV=production

CMD ["npm", "start"]
