FROM node:alpine as node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html
RUN echo $'\
server { \n\
  listen 80;\n\
  location / {\n\
    root /usr/share/nginx/html;\n\
    index index.html index.htm;\n\
    try_files $uri $uri/ /index.html =404;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf
