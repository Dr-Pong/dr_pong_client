FROM node:latest

ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_GAME_SOCKET
ARG NEXT_PUBLIC_CHAT_SOCKET

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]