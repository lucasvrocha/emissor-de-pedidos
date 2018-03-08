### Docker Command  
# docker build -f Dockerfile -t blog-front .
# docker run -p 80:80 -itd --rm --name emissao-de-pedido emissao-de-pedido
#
### STAGE 1: Build ###
# We label our stage as ‘builder’
FROM node:9.3.0-alpine as builder
MAINTAINER Lucas Rocha
COPY ./site/package.json ./site/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY ./site .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer --host 0.0.0.0

### STAGE 2: Setup ###
FROM nginx:1.13.3-alpine
MAINTAINER Lucas Rocha

## Copy our default nginx config
COPY --from=builder /ng-app/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]