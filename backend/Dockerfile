# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Install deps first (cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

CMD ["npm", "start"]
