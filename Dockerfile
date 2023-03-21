FROM node:18.14.1

COPY . /app/

WORKDIR /app
RUN echo "VITE_DEV_DOCKER=true" > .env.local
EXPOSE 5173

#RUN rm package-lock.json && npm i
RUN npm install 
CMD npm run preview