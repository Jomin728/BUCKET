FROM node:20 as build

WORKDIR /dist/src/app


COPY . .

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

RUN npm config rm proxy
RUN npm config rm https-proxy

RUN npm install npm@8.11.0 -g

RUN npm cache clean --force

RUN npm cache verify

RUN NODE_ENV=development npm i

RUN npm run build 

FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*  

COPY --from=build /dist/src/app/dist/client/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf



EXPOSE 80