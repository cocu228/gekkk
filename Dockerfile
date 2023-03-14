FROM node:18.14.1

COPY . /app/

WORKDIR /app
EXPOSE 4173

#RUN rm package-lock.json && npm i
RUN npm install 
CMD npm run start