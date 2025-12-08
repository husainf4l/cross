# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application for production
RUN npm run build -- --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build /app/dist/cross/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.docker.conf /etc/nginx/nginx.conf

# Expose port 3001
EXPOSE 3001

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
