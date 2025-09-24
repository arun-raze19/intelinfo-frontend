# Multi-stage build for optimized frontend with fallback images
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies with optimizations and retry logic
RUN apk add --no-cache curl && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5

# Copy package files
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --only=production --silent --no-audit --no-fund && \
    npm i -D terser @types/node --silent --no-audit --no-fund

# Copy source code
COPY . .

# Set environment variables for build process
ARG VITE_API_BASE=https://api.intelinfo.me
ARG VITE_API_PORT=8006
ARG NODE_ENV=production
ARG VITE_SOURCEMAP=false

# Export environment variables for Vite build
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_API_PORT=$VITE_API_PORT
ENV NODE_ENV=$NODE_ENV
ENV VITE_SOURCEMAP=$VITE_SOURCEMAP

# Build the application with optimizations
RUN npm run build

# Production stage with nginx
FROM nginx:1.25-alpine

# Install wget for health checks
RUN apk add --no-cache wget curl

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built application
COPY --from=builder /app/dist .

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]