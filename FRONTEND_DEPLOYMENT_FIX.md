# Frontend Deployment Fix - Docker Image Pull Issues

## Problem Identified
The frontend deployment is failing due to Docker image pull timeouts:
- `node:20-alpine` image pull timeout
- Network connectivity issues with Docker registry
- DeadlineExceeded errors during image resolution

## Solutions Implemented

### 1. Updated Dockerfile.frontend
- Changed from `node:20-alpine` to `node:18-alpine` (more stable)
- Added retry logic for npm operations
- Improved error handling and timeout configurations

### 2. Created Alternative Dockerfiles
- `Dockerfile.frontend.alternative` - Uses `node:18-slim` with Ubuntu base
- `Dockerfile.frontend.simple` - Single-stage build with `serve` package

### 3. Updated Coolify Configuration
- Modified `docker-compose.coolify.yml` to use simple Dockerfile
- Changed port mapping from 80:80 to 3000:3000
- Updated health check endpoints

## Deployment Options

### Option 1: Use Simple Dockerfile (Recommended)
```yaml
# In Coolify, set Dockerfile to: Dockerfile.frontend.simple
# This uses a single-stage build with serve package
```

### Option 2: Use Alternative Dockerfile
```yaml
# In Coolify, set Dockerfile to: Dockerfile.frontend.alternative
# This uses Ubuntu-based images which are more reliable
```

### Option 3: Use Updated Main Dockerfile
```yaml
# In Coolify, set Dockerfile to: Dockerfile.frontend
# This uses node:18-alpine with retry logic
```

## Manual Deployment Steps

1. **In Coolify Dashboard**:
   - Go to your frontend project
   - Navigate to "Configuration" tab
   - Set Dockerfile to `Dockerfile.frontend.simple`
   - Set Port to `3000`
   - Save configuration

2. **Redeploy**:
   - Click "Deploy" button
   - Monitor logs for any remaining issues

## Troubleshooting

### If Still Getting Timeouts:
1. Try using `Dockerfile.frontend.alternative` (Ubuntu-based)
2. Check Coolify's Docker registry connectivity
3. Consider using a different base image registry

### If Build Succeeds but App Doesn't Start:
1. Check if port 3000 is properly exposed
2. Verify health check endpoint
3. Check application logs in Coolify

## Expected Behavior
- Build should complete without Docker image pull timeouts
- Application should start on port 3000
- Health checks should pass
- Frontend should be accessible via Coolify URL

## Files Modified
- ✅ `Dockerfile.frontend` - Updated with retry logic
- ✅ `Dockerfile.frontend.alternative` - Ubuntu-based alternative
- ✅ `Dockerfile.frontend.simple` - Single-stage build
- ✅ `docker-compose.coolify.yml` - Updated configuration
