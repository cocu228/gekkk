FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN rm -rf /usr/share/nginx/html/*
COPY /dist /usr/share/nginx/html
#COPY /src/app/authentication/dist/assets/ /usr/share/nginx/html/assets/

COPY /nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]