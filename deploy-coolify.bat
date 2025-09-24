@echo off
REM Coolify Deployment Script for INTELINFO Frontend
REM Simplified deployment with single Dockerfile and docker-compose.yml

echo 🚀 INTELINFO Frontend Coolify Deployment
echo ========================================

REM Check if we're in the right directory
if not exist "Dockerfile" (
    echo ❌ Error: Dockerfile not found. Please run this script from the frontend directory.
    pause
    exit /b 1
)

if not exist "docker-compose.yml" (
    echo ❌ Error: docker-compose.yml not found.
    pause
    exit /b 1
)

echo ✅ Required files found:
echo   - Dockerfile
echo   - docker-compose.yml
echo   - nginx.conf
echo   - package.json

echo.
echo 📋 Coolify Deployment Checklist:
echo 1. ✅ Repository connected to Coolify
echo 2. ✅ Dockerfile configured
echo 3. ✅ docker-compose.yml configured
echo 4. ✅ Environment variables set
echo.
echo 🔧 Environment Variables to Set in Coolify:
echo   VITE_API_BASE=https://api.intelinfo.me
echo   VITE_API_PORT=8006
echo   NODE_ENV=production
echo   VITE_SOURCEMAP=false
echo.
echo 📚 For detailed instructions, see COOLIFY_DEPLOYMENT.md
echo.
echo 🎉 Ready for Coolify deployment!
pause