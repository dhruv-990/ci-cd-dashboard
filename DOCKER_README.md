# Docker Setup for CI/CD Dashboard

This guide explains how to run the CI/CD Dashboard application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- GitHub Personal Access Token (for backend API)

## Quick Start

### 1. Set Environment Variables

Create a `.env` file in the root directory:

```bash
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 2. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Individual Service Commands

### Backend Only

```bash
# Build backend image
docker build -t cicd-backend ./backend

# Run backend container
docker run -p 5000:5000 -e GITHUB_TOKEN=$GITHUB_TOKEN cicd-backend
```

### Frontend Only

```bash
# Build frontend image
docker build -t cicd-frontend ./frontend

# Run frontend container
docker run -p 3000:80 cicd-frontend
```

## Development Mode

For development with hot-reload:

```bash
# Backend with nodemon
docker run -p 5000:5000 -v $(pwd)/backend:/app -e GITHUB_TOKEN=$GITHUB_TOKEN cicd-backend npm run dev

# Frontend with hot-reload (requires different Dockerfile)
# See development Dockerfile below
```

## Docker Compose Commands

```bash
# View running services
docker-compose ps

# View logs
docker-compose logs
docker-compose logs backend
docker-compose logs frontend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Restart specific service
docker-compose restart backend
```

## Production Deployment

### 1. Build Production Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### 2. Run Production Stack

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Environment Variables for Production

```bash
# Production .env
NODE_ENV=production
GITHUB_TOKEN=your_production_github_token
REACT_APP_API_BASE=https://your-production-domain.com
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :5000
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Permission Issues**
   ```bash
   # On Linux/Mac, you might need to run with sudo
   sudo docker-compose up
   ```

3. **Build Failures**
   ```bash
   # Clean up and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

### Logs and Debugging

```bash
# View real-time logs
docker-compose logs -f

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Check container status
docker-compose ps
```

## Performance Optimization

### Multi-stage Builds

The frontend Dockerfile uses multi-stage builds to reduce final image size:
- Build stage: Installs dependencies and builds the app
- Production stage: Uses nginx to serve static files

### Volume Mounting

Development volumes are mounted for hot-reload:
- `./backend:/app`: Source code changes reflect immediately
- `/app/node_modules`: Preserves container's node_modules

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **GitHub Token**: Use minimal required permissions
3. **Container Security**: Run containers as non-root user in production
4. **Network Isolation**: Services communicate via internal Docker network

## Scaling

### Horizontal Scaling

```bash
# Scale backend service
docker-compose up --scale backend=3

# Scale frontend service
docker-compose up --scale frontend=2
```

### Load Balancer

For production, consider adding a load balancer:

```yaml
# Add to docker-compose.yml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
  volumes:
    - ./nginx-lb.conf:/etc/nginx/nginx.conf
  depends_on:
    - frontend
    - backend
```

## Monitoring

### Health Checks

Add health checks to your services:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Resource Limits

```yaml
deploy:
  resources:
    limits:
      cpus: '0.50'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

## Cleanup

```bash
# Remove all containers and images
docker-compose down --rmi all --volumes --remove-orphans

# Clean up Docker system
docker system prune -a --volumes
``` 