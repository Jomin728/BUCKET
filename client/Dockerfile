FROM node:20-alpine as build

WORKDIR /dist/src/app


COPY . .

RUN npm install npm@8.11.0 -g

RUN npm cache clean --force

RUN npm install

RUN npm run build 

FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*  

COPY --from=build /dist/src/app/dist/client/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf



EXPOSE 80