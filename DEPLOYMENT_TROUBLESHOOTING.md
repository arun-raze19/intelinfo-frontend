# Deployment Troubleshooting Guide

## Issue: Frontend works locally but not in deployment

### Common Causes and Solutions:

## 1. CORS Issues
**Problem:** Browser blocks API calls due to CORS policy
**Solution:** Backend CORS is already configured to allow all origins (`allow_origins=["*"]`)

## 2. Network Connectivity
**Problem:** Frontend can't reach the backend API
**Solution:** 
- Check if `https://api.intelinfo.me` is accessible from the deployment environment
- Verify DNS resolution
- Check firewall/network policies

## 3. SSL/TLS Issues
**Problem:** Mixed content or SSL certificate issues
**Solution:**
- Ensure both frontend and backend use HTTPS
- Check SSL certificate validity

## 4. Environment Variables
**Problem:** Build-time environment variables not set correctly
**Solution:**
- Verify `VITE_API_BASE` is set to `https://api.intelinfo.me` during build
- Check Docker build args

## 5. Browser Console Errors
**Problem:** JavaScript errors preventing API calls
**Solution:**
- Open browser developer tools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

## Debugging Steps:

### Step 1: Use the API Test Tool
1. Navigate to `https://intelinfo.me/api-test` in your deployed frontend
2. Click "Run API Tests"
3. Review the test results to identify specific issues

### Step 2: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages related to API calls
4. Go to Network tab and check for failed requests

### Step 3: Test Backend Directly
1. Open `https://api.intelinfo.me/ping` in browser
2. Should return a response
3. If not, backend might be down

### Step 4: Check Deployment Logs
1. Check your deployment platform logs (Coolify/Docker)
2. Look for build errors or runtime errors
3. Verify environment variables are set correctly

## Quick Fixes:

### Fix 1: Force HTTPS
If you're getting mixed content errors, ensure all requests use HTTPS:
```javascript
// In src/utils/api.js
const API_BASE = 'https://api.intelinfo.me'
```

### Fix 2: Add Error Boundaries
Add error handling to catch and display API errors:
```javascript
// Already implemented in the updated API service
```

### Fix 3: Check Build Configuration
Ensure Docker build args are correct:
```dockerfile
ARG VITE_API_BASE=https://api.intelinfo.me
ENV VITE_API_BASE=$VITE_API_BASE
```

## Testing Commands:

### Test API from command line:
```bash
curl -X GET https://api.intelinfo.me/ping
curl -X GET https://api.intelinfo.me/health
curl -X GET https://api.intelinfo.me/announcements
```

### Test CORS:
```bash
curl -H "Origin: https://intelinfo.me" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://api.intelinfo.me/ping
```

## Common Error Messages and Solutions:

1. **"Network error: Unable to connect"**
   - Check if backend is running
   - Verify URL is correct
   - Check network connectivity

2. **"CORS policy" errors**
   - Backend CORS is configured correctly
   - Check if request headers are correct

3. **"404 Not Found"**
   - Check API endpoint URLs
   - Verify backend routes

4. **"500 Internal Server Error"**
   - Check backend logs
   - Verify backend dependencies

## Next Steps:
1. Use the API test tool at `/api-test` to diagnose issues
2. Check browser console for specific error messages
3. Verify backend is accessible from deployment environment
4. Test individual API endpoints manually
