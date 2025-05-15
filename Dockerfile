
# # Build Stage
# FROM node:18-alpine as builder

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Nginx Stage
# FROM nginx:alpine

# # Remove default Nginx static content
# RUN rm -rf /usr/share/nginx/html/*

# # Copy the built React app
# COPY --from=builder /app/build /usr/share/nginx/html

# # Copy the Nginx configuration file
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 (HTTP)
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# --- Stage 1: Building the React Application ---
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (for faster dependency installation)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project source code
COPY . .

# Build the React application for production
RUN npm run build

# --- Stage 2: Serving with Nginx ---
FROM nginx:stable-alpine

# Remove the default Nginx static content directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
