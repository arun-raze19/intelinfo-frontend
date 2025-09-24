#!/bin/bash

# Coolify Deployment Script for INTELINFO
# This script automates the deployment process for both frontend and backend

set -e

echo "🚀 INTELINFO Coolify Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    print_success "All dependencies are installed."
}

# Validate environment variables
validate_env() {
    print_status "Validating environment variables..."
    
    if [ -z "$GROQ_API_KEY" ]; then
        print_error "GROQ_API_KEY environment variable is not set."
        exit 1
    fi
    
    if [ -z "$ADMIN_USERNAME" ]; then
        print_warning "ADMIN_USERNAME not set, using default: ADMIN"
        export ADMIN_USERNAME="ADMIN"
    fi
    
    if [ -z "$ADMIN_PASSWORD" ]; then
        print_warning "ADMIN_PASSWORD not set, using default: Intelinfo@2025"
        export ADMIN_PASSWORD="Intelinfo@2025"
    fi
    
    print_success "Environment variables validated."
}

# Build backend Docker image
build_backend() {
    print_status "Building backend Docker image..."
    
    cd intelinfo-backend
    
    # Build the image
    docker build -f Dockerfile.coolify -t intelinfo-backend-coolify .
    
    if [ $? -eq 0 ]; then
        print_success "Backend Docker image built successfully."
    else
        print_error "Failed to build backend Docker image."
        exit 1
    fi
    
    cd ..
}

# Build frontend Docker image
build_frontend() {
    print_status "Building frontend Docker image..."
    
    # Build the image
    docker build -f Dockerfile.coolify -t intelinfo-frontend-coolify .
    
    if [ $? -eq 0 ]; then
        print_success "Frontend Docker image built successfully."
    else
        print_error "Failed to build frontend Docker image."
        exit 1
    fi
}

# Test Docker images locally
test_images() {
    print_status "Testing Docker images locally..."
    
    # Test backend
    print_status "Testing backend image..."
    docker run --rm -d --name test-backend \
        -p 8006:8000 \
        -e GROQ_API_KEY="$GROQ_API_KEY" \
        -e ADMIN_USERNAME="$ADMIN_USERNAME" \
        -e ADMIN_PASSWORD="$ADMIN_PASSWORD" \
        intelinfo-backend-coolify
    
    # Wait for backend to start
    sleep 10
    
    # Test health endpoint
    if curl -f http://localhost:8006/health > /dev/null 2>&1; then
        print_success "Backend health check passed."
    else
        print_error "Backend health check failed."
        docker stop test-backend
        exit 1
    fi
    
    # Stop test container
    docker stop test-backend
    
    # Test frontend
    print_status "Testing frontend image..."
    docker run --rm -d --name test-frontend \
        -p 8080:80 \
        -e VITE_API_BASE=http://localhost:8006 \
        intelinfo-frontend-coolify
    
    # Wait for frontend to start
    sleep 5
    
    # Test frontend
    if curl -f http://localhost:8080/ > /dev/null 2>&1; then
        print_success "Frontend health check passed."
    else
        print_error "Frontend health check failed."
        docker stop test-frontend
        exit 1
    fi
    
    # Stop test container
    docker stop test-frontend
    
    print_success "All Docker images tested successfully."
}

# Generate deployment files
generate_deployment_files() {
    print_status "Generating deployment files..."
    
    # Create backend deployment file
    cat > intelinfo-backend/deploy-coolify.sh << 'EOF'
#!/bin/bash
# Backend deployment script for Coolify

echo "🚀 Deploying INTELINFO Backend to Coolify..."

# Set environment variables
export GROQ_API_KEY="${GROQ_API_KEY}"
export ADMIN_USERNAME="${ADMIN_USERNAME:-ADMIN}"
export ADMIN_PASSWORD="${ADMIN_PASSWORD:-Intelinfo@2025}"

# Build and deploy
docker build -f Dockerfile.coolify -t intelinfo-backend-coolify .
docker run -d --name intelinfo-backend \
    -p 8006:8000 \
    -e GROQ_API_KEY="$GROQ_API_KEY" \
    -e ADMIN_USERNAME="$ADMIN_USERNAME" \
    -e ADMIN_PASSWORD="$ADMIN_PASSWORD" \
    -e GROQ_MODEL="openai/gpt-oss-20b" \
    -e GROQ_TEMPERATURE="0.4" \
    -e GROQ_MAX_TOKENS="180" \
    -e CHROMA_TELEMETRY_IMPLEMENTATION="none" \
    -e NODE_ENV="production" \
    intelinfo-backend-coolify

echo "✅ Backend deployed successfully!"
echo "🌐 Backend URL: http://localhost:8006"
echo "🔍 Health Check: http://localhost:8006/health"
EOF

    # Create frontend deployment file
    cat > deploy-coolify.sh << 'EOF'
#!/bin/bash
# Frontend deployment script for Coolify

echo "🚀 Deploying INTELINFO Frontend to Coolify..."

# Set environment variables
export VITE_API_BASE="${VITE_API_BASE:-https://api.intelinfo.me}"
export VITE_API_PORT="${VITE_API_PORT:-8006}"
export NODE_ENV="production"
export VITE_SOURCEMAP="false"

# Build and deploy
docker build -f Dockerfile.coolify -t intelinfo-frontend-coolify .
docker run -d --name intelinfo-frontend \
    -p 80:80 \
    -e VITE_API_BASE="$VITE_API_BASE" \
    -e VITE_API_PORT="$VITE_API_PORT" \
    -e NODE_ENV="$NODE_ENV" \
    -e VITE_SOURCEMAP="$VITE_SOURCEMAP" \
    intelinfo-frontend-coolify

echo "✅ Frontend deployed successfully!"
echo "🌐 Frontend URL: http://localhost"
echo "🔍 Health Check: http://localhost/"
EOF

    # Make scripts executable
    chmod +x intelinfo-backend/deploy-coolify.sh
    chmod +x deploy-coolify.sh
    
    print_success "Deployment files generated successfully."
}

# Create Coolify configuration files
create_coolify_config() {
    print_status "Creating Coolify configuration files..."
    
    # Backend Coolify config
    cat > intelinfo-backend/coolify.yml << 'EOF'
# Coolify configuration for INTELINFO Backend
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.coolify
    ports:
      - "8006:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - ADMIN_USERNAME=${ADMIN_USERNAME:-ADMIN}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD:-Intelinfo@2025}
      - GROQ_MODEL=openai/gpt-oss-20b
      - GROQ_TEMPERATURE=0.4
      - GROQ_MAX_TOKENS=180
      - CHROMA_TELEMETRY_IMPLEMENTATION=none
      - NODE_ENV=production
    volumes:
      - ./data.db:/app/data.db:rw
      - ./uploads:/app/uploads:rw
      - ./cache:/app/.cache:rw
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
EOF

    # Frontend Coolify config
    cat > coolify.yml << 'EOF'
# Coolify configuration for INTELINFO Frontend
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.coolify
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE=${VITE_API_BASE:-https://api.intelinfo.me}
      - VITE_API_PORT=${VITE_API_PORT:-8006}
      - NODE_ENV=production
      - VITE_SOURCEMAP=false
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
EOF

    print_success "Coolify configuration files created."
}

# Main deployment function
main() {
    echo "Starting INTELINFO Coolify deployment process..."
    echo ""
    
    # Check dependencies
    check_dependencies
    
    # Validate environment
    validate_env
    
    # Generate deployment files
    generate_deployment_files
    
    # Create Coolify configs
    create_coolify_config
    
    # Build images
    build_backend
    build_frontend
    
    # Test images
    test_images
    
    echo ""
    print_success "🎉 INTELINFO Coolify deployment preparation completed!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push your code to GitHub repository"
    echo "2. Create applications in Coolify:"
    echo "   - Backend: Use Dockerfile.coolify in intelinfo-backend/"
    echo "   - Frontend: Use Dockerfile.coolify in root directory"
    echo "3. Set environment variables in Coolify:"
    echo "   - GROQ_API_KEY: $GROQ_API_KEY"
    echo "   - ADMIN_USERNAME: $ADMIN_USERNAME"
    echo "   - ADMIN_PASSWORD: $ADMIN_PASSWORD"
    echo "4. Configure domains:"
    echo "   - Backend: api.intelinfo.me"
    echo "   - Frontend: intelinfo.me"
    echo "5. Deploy both applications"
    echo ""
    echo "📚 Documentation:"
    echo "- Backend: intelinfo-backend/COOLIFY_DOCKER_DEPLOYMENT.md"
    echo "- Frontend: COOLIFY_FRONTEND_DEPLOYMENT.md"
    echo ""
    echo "🔧 Local Testing:"
    echo "- Backend: ./intelinfo-backend/deploy-coolify.sh"
    echo "- Frontend: ./deploy-coolify.sh"
    echo ""
}

# Run main function
main "$@"
