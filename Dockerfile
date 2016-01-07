FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y curl

# Note the new setup script name for Node.js v0.12
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

# Then install with:
RUN sudo apt-get install -y nodejs  

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

#EXPOSE  8080
CMD ["node", "/src/app.js"]