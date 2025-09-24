# Coolify Deployment Guide for INTELINFO Frontend

## Overview
This guide provides step-by-step instructions for deploying the INTELINFO frontend to Coolify using the optimized Docker configuration.

## Prerequisites
- Coolify instance running
- GitHub repository access
- Domain configured (e.g., intelinfo.me)
- Backend API deployed (api.intelinfo.me)

## Quick Deployment Steps

### 1. Repository Setup
1. Ensure all Coolify-specific files are in your repository:
   - `Dockerfile.coolify`
   - `docker-compose.coolify.yml`
   - `.dockerignore.coolify`

### 2. Coolify Application Creation
1. **Create New Application** in Coolify
2. **Connect Repository**: Link your GitHub repository
3. **Select Branch**: Choose `main` branch
4. **Build Pack**: Select "Dockerfile" option

### 3. Docker Configuration
1. **Dockerfile Path**: Set to `Dockerfile.coolify`
2. **Build Context**: Set to `.` (root directory)
3. **Port Configuration**: 
   - Internal Port: `80`
   - External Port: `80` (or your preferred port)

### 4. Environment Variables
Set these environment variables in Coolify:

```bash
# Required Environment Variables
VITE_API_BASE=https://api.intelinfo.me
VITE_API_PORT=8006
NODE_ENV=production
VITE_SOURCEMAP=false
```

### 5. Health Check Configuration
- **Health Check Path**: `/` (root)
- **Health Check Interval**: `30s`
- **Health Check Timeout**: `10s`
- **Start Period**: `30s`
- **Retries**: `3`

### 6. Domain Configuration
1. **Custom Domain**: Set to `intelinfo.me`
2. **SSL Certificate**: Enable automatic SSL
3. **Force HTTPS**: Enable

## Deployment Process

### Step 1: Initial Deployment
1. Click "Deploy" in Coolify
2. Monitor the build logs
3. Wait for health check to pass

### Step 2: Verify Deployment
Test the deployment with:
```bash
# Frontend health check
curl https://intelinfo.me/

# Check if API connection works
curl https://intelinfo.me/api/health
```

### Step 3: Test Frontend Features
1. **Home Page**: Visit `https://intelinfo.me/`
2. **Events Page**: Test event navigation
3. **Contact Form**: Test message submission
4. **Announcements**: Check announcement ticker
5. **RAG Chatbot**: Test chatbot functionality

## Frontend-Specific Configuration

### 1. Nginx Configuration
The frontend uses a custom nginx configuration optimized for:
- **Static File Serving**: Efficient delivery of React build files
- **API Proxying**: Proper routing to backend API
- **WebSocket Support**: Real-time announcement updates
- **Security Headers**: Enhanced security configuration
- **Gzip Compression**: Optimized file delivery

### 2. Build Optimization
- **Multi-stage Build**: Separate build and production stages
- **Node.js Optimization**: Uses Node 18 Alpine for smaller image
- **Nginx Alpine**: Lightweight production server
- **Asset Optimization**: Optimized static asset delivery

### 3. Environment Variables
- **API Base URL**: Points to backend API
- **Production Mode**: Optimized for production
- **Source Maps**: Disabled for security

## Troubleshooting

### Common Issues

#### 1. Build Failures
- **Check Node Version**: Ensure Node 18+ compatibility
- **Check Dependencies**: Verify `package.json` and `package-lock.json`
- **Check Build Script**: Ensure `npm run build` works locally

#### 2. Runtime Errors
- **API Connection**: Verify backend API is accessible
- **Environment Variables**: Check VITE_API_BASE setting
- **Nginx Configuration**: Verify nginx.conf is correct

#### 3. Health Check Failures
- **Startup Time**: Check if nginx starts properly
- **Port Binding**: Verify port 80 is accessible
- **File Permissions**: Check nginx user permissions

### Debugging Commands
```bash
# Check container logs
docker logs intelinfo-frontend-coolify

# Check container status
docker ps -a

# Test nginx configuration
docker exec intelinfo-frontend-coolify nginx -t

# Check file permissions
docker exec intelinfo-frontend-coolify ls -la /usr/share/nginx/html
```

## Performance Optimization

### 1. Resource Limits
Set appropriate resource limits in Coolify:
- **CPU**: 0.5-1 core
- **Memory**: 512MB-1GB
- **Storage**: 5-10GB

### 2. Caching
- **Static Assets**: Configure CDN for static files
- **API Responses**: Use appropriate cache headers
- **Browser Caching**: Optimize cache headers

### 3. Compression
- **Gzip**: Enabled in nginx configuration
- **Brotli**: Consider enabling for better compression
- **Image Optimization**: Optimize images before build

## Security Considerations

### 1. Headers
- **Security Headers**: Configured in nginx
- **CORS**: Properly configured for API calls
- **HTTPS**: Force HTTPS redirects

### 2. Content Security Policy
- **CSP Headers**: Configure appropriate CSP
- **XSS Protection**: Enable XSS protection
- **Frame Options**: Prevent clickjacking

### 3. API Security
- **API Endpoints**: Secure API communication
- **Authentication**: Proper authentication flow
- **Rate Limiting**: Consider rate limiting

## Monitoring

### 1. Health Monitoring
- **Uptime**: Monitor service availability
- **Response Times**: Track page load times
- **Error Rates**: Monitor 4xx/5xx errors

### 2. Performance Monitoring
- **Page Load Times**: Track Core Web Vitals
- **API Response Times**: Monitor API performance
- **Resource Usage**: Monitor CPU/memory usage

### 3. User Experience
- **Page Views**: Track user engagement
- **Error Tracking**: Monitor JavaScript errors
- **User Flows**: Track user navigation

## Maintenance

### 1. Updates
- **Code Updates**: Deploy through Coolify
- **Dependencies**: Update npm packages regularly
- **Security**: Keep dependencies updated

### 2. Monitoring
- **Logs**: Monitor nginx and application logs
- **Metrics**: Track performance metrics
- **Alerts**: Set up alerting for issues

### 3. Backups
- **Configuration**: Backup nginx configuration
- **Environment**: Backup environment variables
- **Code**: Regular code backups

## Success Indicators

Your deployment is successful when:
- ✅ Frontend loads at `https://intelinfo.me/`
- ✅ All pages navigate correctly
- ✅ API calls work properly
- ✅ Contact form submits successfully
- ✅ Announcement ticker works
- ✅ RAG chatbot responds
- ✅ Mobile navigation works
- ✅ All animations and effects work

## Integration with Backend

### 1. API Communication
- **Base URL**: Configured via VITE_API_BASE
- **CORS**: Properly configured for cross-origin requests
- **WebSocket**: Real-time announcement updates

### 2. Environment Sync
- **API Endpoints**: Frontend calls backend endpoints
- **Authentication**: Shared authentication system
- **Data Flow**: Proper data flow between services

### 3. Deployment Coordination
- **Backend First**: Deploy backend before frontend
- **API Testing**: Test API endpoints before frontend deployment
- **Integration Testing**: Test full integration after deployment

## Support

For issues or questions:
1. Check Coolify logs first
2. Review nginx logs
3. Test API connectivity
4. Check environment variables
5. Verify domain configuration

## Next Steps

After successful deployment:
1. **Test All Features**: Comprehensive testing
2. **Monitor Performance**: Set up monitoring
3. **Configure CDN**: Consider CDN for static assets
4. **Set Up Analytics**: Implement analytics tracking
5. **Security Audit**: Perform security review
