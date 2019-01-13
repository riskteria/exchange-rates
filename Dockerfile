# base image
FROM node:10.13.0

# set working directory
WORKDIR /app
ADD . /app

# add `node_modules/.bin` to $PATH
ENV NODE_PATH=/node_modules
ENV PATH $PATH:/node_modules/.bin

# install and cache app dependencies
ADD package.json /package.json
ADD yarn.lock /yarn.lock

RUN npm install serve -g --silent
RUN npm install react-scripts@1.1.1 -g --silent
RUN npm install yarn@1.13.0 -g --silent
RUN yarn

RUN yarn run build
CMD serve -s build

# export port
EXPOSE 5000

# start app
ENTRYPOINT ["/bin/bash", "/app/run.sh"]
