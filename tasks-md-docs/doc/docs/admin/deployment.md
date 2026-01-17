# Deployment

This guide covers deploying Tasks.md in production environments.

## Deployment Options

| Method | Complexity | Best For |
|--------|------------|----------|
| Docker | Low | Most users |
| Docker Compose | Low | Multi-container setups |
| Source | Medium | Development, customization |
| Kubernetes | High | Large-scale deployments |

## Docker Deployment

### Basic Deployment

```bash
docker run -d \
  --name tasks.md \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TITLE="Radiona Tasks" \
  -p 8080:8080 \
  -v /data/tasks:/tasks \
  -v /data/config:/config \
  --restart unless-stopped \
  baldissaramatheus/tasks.md
```

### Production Checklist

- [ ] Set PUID/PGID to match host user
- [ ] Use persistent volumes for `/tasks` and `/config`
- [ ] Configure `--restart unless-stopped`
- [ ] Set a meaningful `TITLE`
- [ ] Add users before exposing publicly

## Docker Compose

### Basic Setup

```yaml
version: "3"
services:
  tasks:
    image: baldissaramatheus/tasks.md
    container_name: tasks.md
    environment:
      - PUID=1000
      - PGID=1000
      - TITLE=Radiona Tasks
    volumes:
      - ./data/tasks:/tasks
      - ./data/config:/config
    restart: unless-stopped
    ports:
      - "8080:8080"
```

### With Reverse Proxy (Traefik)

```yaml
version: "3"
services:
  tasks:
    image: baldissaramatheus/tasks.md
    container_name: tasks.md
    environment:
      - PUID=1000
      - PGID=1000
      - TITLE=Radiona Tasks
    volumes:
      - ./data/tasks:/tasks
      - ./data/config:/config
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.tasks.rule=Host(`tasks.example.com`)"
      - "traefik.http.routers.tasks.entrypoints=websecure"
      - "traefik.http.routers.tasks.tls.certresolver=letsencrypt"
```

## Reverse Proxy Configuration

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name tasks.example.com;

    ssl_certificate /etc/ssl/certs/tasks.crt;
    ssl_certificate_key /etc/ssl/private/tasks.key;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Subpath Setup

For `https://example.com/tasks/`:

```nginx
location /tasks/ {
    proxy_pass http://localhost:8080/;
    # ... other headers
}
```

And set environment variable:
```bash
-e BASE_PATH=/tasks
```

!!! warning "PWA Limitation"
    PWA functionality is disabled when using a subpath.

## HTTPS Setup

### Let's Encrypt with Certbot

```bash
certbot --nginx -d tasks.example.com
```

### Self-Signed (Development)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/tasks.key \
  -out /etc/ssl/certs/tasks.crt
```

## Backup Strategy

### Automated Backup Script

```bash
#!/bin/bash
# backup-tasks.sh

BACKUP_DIR="/backups/tasks-$(date +%Y%m%d-%H%M%S)"
TASKS_DIR="/data/tasks"
CONFIG_DIR="/data/config"

mkdir -p "$BACKUP_DIR"
cp -r "$TASKS_DIR" "$BACKUP_DIR/tasks"
cp -r "$CONFIG_DIR" "$BACKUP_DIR/config"

# Keep only last 30 backups
ls -dt /backups/tasks-* | tail -n +31 | xargs rm -rf

echo "Backup completed: $BACKUP_DIR"
```

### Cron Schedule

```bash
# Daily at 2 AM
0 2 * * * /opt/scripts/backup-tasks.sh
```

### Git-Based Backup

```bash
cd /data/tasks
git init
git add .
git commit -m "Backup $(date)"
git push origin main
```

## Monitoring

### Health Check

```bash
curl -f http://localhost:8080/auth/status || exit 1
```

### Docker Healthcheck

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/auth/status"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Log Monitoring

```bash
# View logs
docker logs -f tasks.md

# Log to file
docker logs tasks.md > /var/log/tasks.log 2>&1
```

## Scaling Considerations

### Single Instance

Tasks.md is designed for single-instance deployment:

- Sessions stored in-memory
- File system as database
- No built-in clustering

### High Availability

For HA requirements, consider:

- Shared storage (NFS, GlusterFS) for `/tasks` and `/config`
- Load balancer with sticky sessions
- External session store (would require code changes)

## Security Hardening

### Network Isolation

```yaml
networks:
  internal:
    internal: true
  external:

services:
  tasks:
    networks:
      - internal
  proxy:
    networks:
      - internal
      - external
```

### Read-Only Root

```yaml
read_only: true
tmpfs:
  - /tmp
```

### Resource Limits

```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 512M
```

## Troubleshooting

### Container Won't Start

```bash
docker logs tasks.md
```

Common issues:
- Permission denied: Check PUID/PGID
- Port in use: Change port mapping
- Volume mount failed: Verify paths exist

### Slow Performance

- Check disk I/O on volume mounts
- Ensure adequate memory
- Review orphan image cleanup interval

### Data Loss

Always maintain backups. If data is lost:

1. Stop the container
2. Restore from backup
3. Restart the container
