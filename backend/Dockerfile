FROM node:18

WORKDIR /app

RUN mkdir -p /data

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]