FROM node:18 as development

ENV NODE_ENV=development

WORKDIR /usr/src/

COPY *.json ./
COPY /apps/server ./apps/server/

RUN yarn

EXPOSE 7001

CMD [ "yarn", "workspace", "server", "start:dev" ]