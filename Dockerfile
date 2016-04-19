FROM node:0.12-wheezy
MAINTAINER George Rappel <george.concei@hotmail.com
EXPOSE 8080
ADD . /app
WORKDIR /app
RUN npm install
ENTRYPOINT npm start
