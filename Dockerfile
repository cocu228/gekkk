FROM node:18.14.1

COPY . /app/

WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN npm install 
CMD npm run dev