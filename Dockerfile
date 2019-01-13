# base image
FROM selenium/standalone-chrome
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

RUN npm install react-scripts@1.1.1 -g --silent
RUN npm install yarn@1.13.0 -g --silent
RUN yarn

# export port
EXPOSE 3000
EXPOSE 4444

# start app
ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["yarn", "start"]
