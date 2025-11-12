# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build React app
COPY . .
RUN npm run build

# Expose port 80 (instead of nginx's 80)
EXPOSE 80

# Run Node.js server
CMD ["node", "server.js"]