# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build React app
COPY . .
RUN npm run build

# Stage 2: Production with Node.js server
FROM node:18-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built React app
COPY --from=build /app/build ./build

# Copy Express server
COPY server.js ./

# Expose port 80 (instead of nginx's 80)
EXPOSE 80

# Run Node.js server
CMD ["node", "server.js"]