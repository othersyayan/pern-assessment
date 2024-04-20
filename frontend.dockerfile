FROM node:18 as development

WORKDIR /usr/src/

COPY *.json ./
COPY ./apps/client ./apps/client/

RUN yarn

EXPOSE 3000

CMD [ "yarn", "workspace", "client", "dev" ]