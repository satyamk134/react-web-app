FROM node:16 as react-base
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY public ./public
COPY .env.production ./
COPY 4981692DAFF66E3F551BC96F51ACE80A.txt ./
COPY nginx.conf ./
RUN npm run build
# starting second, nginx build-stage
FROM nginx:1.15

# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf

# copying our nginx config
COPY --from=react-base /react-app/nginx.conf /etc/nginx/conf.d/

# copying production build from last stage to serve through nginx
COPY --from=react-base /react-app/build/ /var/www/html/
RUN mkdir -p .well-known/pki-validation
COPY --from=react-base /react-app/4981692DAFF66E3F551BC96F51ACE80A.txt  /var/www/html/.well-known/pki-validation/

# exposing port 8080 on container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




