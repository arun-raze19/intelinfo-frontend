@echo off
REM Coolify Deployment Script for INTELINFO (Windows)
REM This script automates the deployment process for both frontend and backend

echo 🚀 INTELINFO Coolify Deployment Script
echo ======================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed. Please install Git first.
    exit /b 1
)

echo [INFO] All dependencies are installed.

REM Validate environment variables
if "%GROQ_API_KEY%"=="" (
    echo [ERROR] GROQ_API_KEY environment variable is not set.
    exit /b 1
)

if "%ADMIN_USERNAME%"=="" (
    echo [WARNING] ADMIN_USERNAME not set, using default: ADMIN
    set ADMIN_USERNAME=ADMIN
)

if "%ADMIN_PASSWORD%"=="" (
    echo [WARNING] ADMIN_PASSWORD not set, using default: Intelinfo@2025
    set ADMIN_PASSWORD=Intelinfo@2025
)

echo [SUCCESS] Environment variables validated.

REM Build backend Docker image
echo [INFO] Building backend Docker image...
cd intelinfo-backend
docker build -f Dockerfile.coolify -t intelinfo-backend-coolify .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build backend Docker image.
    exit /b 1
)
echo [SUCCESS] Backend Docker image built successfully.
cd ..

REM Build frontend Docker image
echo [INFO] Building frontend Docker image...
docker build -f Dockerfile.coolify -t intelinfo-frontend-coolify .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build frontend Docker image.
    exit /b 1
)
echo [SUCCESS] Frontend Docker image built successfully.

echo.
echo [SUCCESS] 🎉 INTELINFO Coolify deployment preparation completed!
echo.
echo 📋 Next Steps:
echo 1. Push your code to GitHub repository
echo 2. Create applications in Coolify:
echo    - Backend: Use Dockerfile.coolify in intelinfo-backend/
echo    - Frontend: Use Dockerfile.coolify in root directory
echo 3. Set environment variables in Coolify:
echo    - GROQ_API_KEY: %GROQ_API_KEY%
echo    - ADMIN_USERNAME: %ADMIN_USERNAME%
echo    - ADMIN_PASSWORD: %ADMIN_PASSWORD%
echo 4. Configure domains:
echo    - Backend: api.intelinfo.me
echo    - Frontend: intelinfo.me
echo 5. Deploy both applications
echo.
echo 📚 Documentation:
echo - Backend: intelinfo-backend/COOLIFY_DOCKER_DEPLOYMENT.md
echo - Frontend: COOLIFY_FRONTEND_DEPLOYMENT.md
echo.
echo 🔧 Local Testing:
echo - Backend: docker run -p 8006:8000 intelinfo-backend-coolify
echo - Frontend: docker run -p 80:80 intelinfo-frontend-coolify
echo.

pause
