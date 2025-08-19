.PHONY: help build run stop clean dev prod logs shell-backend shell-frontend

# Default target
help:
	@echo "Available commands:"
	@echo "  build     - Build all Docker images"
	@echo "  run       - Run the application in production mode"
	@echo "  dev       - Run the application in development mode"
	@echo "  stop      - Stop all running containers"
	@echo "  clean     - Remove all containers, images, and volumes"
	@echo "  logs      - Show logs from all services"
	@echo "  shell-backend  - Access backend container shell"
	@echo "  shell-frontend - Access frontend container shell"

# Build all images
build:
	docker-compose build

# Run in production mode
run:
	docker-compose -f docker-compose.prod.yml up -d

# Run in development mode
dev:
	docker-compose -f docker-compose.dev.yml up -d

# Stop all containers
stop:
	docker-compose down
	docker-compose -f docker-compose.prod.yml down
	docker-compose -f docker-compose.dev.yml down

# Clean up everything
clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose.prod.yml down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
	docker system prune -a --volumes -f

# Show logs
logs:
	docker-compose logs -f

# Access backend container shell
shell-backend:
	docker-compose exec backend sh

# Access frontend container shell
shell-frontend:
	docker-compose exec frontend sh

# Production logs
logs-prod:
	docker-compose -f docker-compose.prod.yml logs -f

# Development logs
logs-dev:
	docker-compose -f docker-compose.dev.yml logs -f

# Restart services
restart:
	docker-compose restart

# Rebuild and restart
rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d 