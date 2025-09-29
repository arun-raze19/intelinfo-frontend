# INTELINFO Frontend - Coolify Deployment Guide

## Overview
This guide explains how to deploy the INTELINFO Frontend to Coolify using the simplified Docker configuration.

## Files Required for Deployment

### Essential Files:
- ✅ `Dockerfile` - Main Docker configuration
- ✅ `docker-compose.yml` - Coolify deployment configuration
- ✅ `nginx.conf` - Nginx configuration for SPA routing
- ✅ `package.json` - Node.js dependencies
- ✅ `vite.config.js` - Vite build configuration

### Source Code:
- ✅ `src/` - React application source code
- ✅ `public/` - Static assets
- ✅ `index.html` - Main HTML template

## Coolify Deployment Steps

### 1. Connect Repository
1. Go to your Coolify dashboard
2. Click "New Application"
3. Select "Git Repository"
4. Connect your GitHub repository: `arun-raze19/intelinfo-frontend`

### 2. Configure Application
1. **Application Name**: `intelinfo-frontend`
2. **Build Pack**: `Docker`
3. **Dockerfile**: `Dockerfile` (default)
4. **Docker Compose**: `docker-compose.yml` (default)
5. **Port**: `80` (automatically configured)

### 3. Environment Variables
Set these in Coolify dashboard:
```
VITE_API_BASE=https://api.intelinfo.me
VITE_API_PORT=8006
NODE_ENV=production
VITE_SOURCEMAP=false
```

### 4. Deploy
1. Click "Deploy" button
2. Monitor the build logs
3. Wait for deployment to complete

## Docker Configuration Details

### Dockerfile Features:
- **Multi-stage build** for optimized image size
- **Node.js 18 Alpine** for building
- **Nginx 1.25 Alpine** for serving
- **Automatic dependency installation**
- **Production build optimization**
- **Health check configuration**

### Docker Compose Features:
- **Port mapping**: `80:80`
- **Health checks** with wget
- **Automatic restart** on failure
- **Environment variable** configuration
- **Production optimizations**

### Nginx Configuration:
- **SPA routing** with fallback to index.html
- **Gzip compression** for better performance
- **Static asset caching** (1 year)
- **Security headers** for production
- **Error page handling**

## Features Included

### ✅ Frontend Features:
- **Home Page** with interactive elements
- **Food Court Page** with 3D animations
- **Events Pages** for all symposium events
- **Registration Page** with form handling
- **Announcements Page** with real-time updates
- **Connect Page** for contact information

### ✅ Technical Features:
- **Responsive Design** for all devices
- **Client-side Routing** with React Router
- **Real-time Updates** via WebSocket
- **Optimized Build** with Vite
- **Production Ready** with nginx

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check if all dependencies are in package.json
   - Verify Dockerfile syntax
   - Check build logs in Coolify

2. **Food Court Page Not Loading**:
   - Verify nginx.conf has SPA fallback
   - Check if React Router is configured correctly
   - Test direct URL access

3. **API Connection Issues**:
   - Verify VITE_API_BASE environment variable
   - Check backend API is running
   - Verify CORS configuration

### Debug Commands:
```bash
# Test local build
docker build -t intelinfo-frontend .

# Test local run
docker run -p 8080:80 intelinfo-frontend

# Test food court route
curl http://localhost:8080/food-court
```

## Performance Optimizations

- **Multi-stage Docker build** reduces image size
- **Nginx gzip compression** reduces bandwidth
- **Static asset caching** improves load times
- **Production build** with minification
- **Health checks** ensure reliability

## Security Features

- **Security headers** in nginx configuration
- **Content type validation**
- **XSS protection** headers
- **Frame options** for clickjacking protection
- **Referrer policy** for privacy

## Support

For deployment issues:
1. Check Coolify build logs
2. Verify environment variables
3. Test locally with Docker
4. Contact support if needed

## Success Indicators

✅ **Successful Deployment**:
- Build completes without errors
- Container starts and passes health checks
- Frontend accessible via Coolify URL
- Food Court page loads correctly
- All routes work with client-side navigation

