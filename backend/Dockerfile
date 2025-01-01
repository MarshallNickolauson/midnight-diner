FROM node:18

WORKDIR /app

RUN mkdir -p /data

COPY package*.json ./

RUN npm install

COPY . .

# Install dependencies, including bash and Netcat
RUN apt-get update && apt-get install -y bash netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy the wait-for-mongo script and make it executable
COPY wait-for-mongo.sh /app/wait-for-mongo.sh
RUN chmod +x /app/wait-for-mongo.sh

EXPOSE 5000

CMD ["sh", "/app/wait-for-mongo.sh", "npm", "start"]