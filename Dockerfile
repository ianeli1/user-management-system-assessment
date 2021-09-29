FROM node:latest
COPY . .
RUN yarn 
RUN yarn build



FROM thecodingmachine/php:8.0-v4-apache-node16
COPY --from=0 build /var/www/html/
COPY server/src/ /var/www/html/
COPY .env /var/www/html/
EXPOSE 80
