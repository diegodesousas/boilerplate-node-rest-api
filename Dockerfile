FROM ubuntu:16.04

MAINTAINER Diego de Sousa <diegodesousas@yahoo.com.br>

#install required software before using nvm/node/npm/bower
RUN apt-get update && apt-get install -y curl

#download nvm installer
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.6/install.sh | bash

#install node 6.3.1
RUN . ~/.nvm/nvm.sh && nvm install 6.3.1 && nvm alias default 6.3.1

#set node and npm in PATH
ENV PATH /bin/versions/node/v6.3.1/bin/:/bin/versions/node/v6.3.1/lib/node_modules/npm/bin/:${PATH}

#install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org

RUN mkdir -p /data/db
ENTRYPOINT ["/usr/bin/mongod", "--quiet"]

EXPOSE 3000
