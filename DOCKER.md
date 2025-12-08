# Docker Deployment Guide

## Building the Docker Image

### Build locally:
```bash
docker build -t cross-app .
```

### Run locally:
```bash
# Using docker run
docker run -p 3001:80 cross-app

# Using docker-compose
docker-compose up -d
```

The application will be available at `http://localhost:3001`

## GitHub Container Registry

### Automatic Build
The Docker image is automatically built and pushed to GitHub Container Registry when you push to the `main` branch.

### Pull from GitHub Container Registry:
```bash
docker pull ghcr.io/husainf4l/cross:latest
```

### Run from GitHub Container Registry:
```bash
docker run -p 3001:80 ghcr.io/husainf4l/cross:latest
```

## Manual Push to GitHub Container Registry

### 1. Login to GitHub Container Registry:
```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u husainf4l --password-stdin
```

### 2. Build and tag the image:
```bash
docker build -t ghcr.io/husainf4l/cross:latest .
```

### 3. Push to registry:
```bash
docker push ghcr.io/husainf4l/cross:latest
```

## Environment Variables

The application uses production configuration which points to:
- API URL: `https://cross.aqlaan.com/api`

## Production Deployment

### Using docker-compose:
```bash
docker-compose up -d
```

### Using docker run:
```bash
docker run -d -p 3001:80 --name cross-app ghcr.io/husainf4l/cross:latest
```

## Stopping the Application

```bash
# If using docker-compose
docker-compose down

# If using docker run
docker stop cross-app
docker rm cross-app
```
