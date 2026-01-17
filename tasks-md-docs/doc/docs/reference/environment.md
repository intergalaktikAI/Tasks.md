# Environment Variables

Complete reference for all environment variables in Tasks.md.

## Backend Variables

### PORT

| Property | Value |
|----------|-------|
| **Default** | `8080` |
| **Required** | No |
| **Description** | The port the server listens on |

```bash
docker run -e PORT=3000 -p 3000:3000 ...
```

### TASKS_DIR

| Property | Value |
|----------|-------|
| **Default** | `/tasks` |
| **Required** | Yes (via volume) |
| **Description** | Path to the directory containing task lanes and cards |

```bash
docker run -v /my/tasks:/tasks ...
# or
docker run -e TASKS_DIR=/custom/path -v /my/tasks:/custom/path ...
```

### CONFIG_DIR

| Property | Value |
|----------|-------|
| **Default** | `/config` |
| **Required** | Yes (via volume) |
| **Description** | Path to the configuration directory |

Contains:
- `users.md` - User credentials
- `tags.json` - Tag colors
- `sort.json` - Sort order
- `custom.css` - CSS overrides
- `profiles/` - User profiles

### BASE_PATH

| Property | Value |
|----------|-------|
| **Default** | `/` (empty) |
| **Required** | No |
| **Description** | URL base path for reverse proxy setups |

```bash
# For https://example.com/tasks/
docker run -e BASE_PATH=/tasks ...
```

!!! warning "PWA Disabled"
    Setting BASE_PATH to anything other than `/` disables PWA functionality.

### TITLE

| Property | Value |
|----------|-------|
| **Default** | Empty |
| **Required** | No |
| **Description** | Application title shown in header and browser tab |

```bash
docker run -e TITLE="Radiona Tasks" ...
```

### LOCAL_IMAGES_CLEANUP_INTERVAL

| Property | Value |
|----------|-------|
| **Default** | `1440` (24 hours) |
| **Required** | No |
| **Description** | Minutes between orphan image cleanup runs |

```bash
# Disable cleanup
docker run -e LOCAL_IMAGES_CLEANUP_INTERVAL=0 ...

# Run every hour
docker run -e LOCAL_IMAGES_CLEANUP_INTERVAL=60 ...
```

## Docker Variables

### PUID

| Property | Value |
|----------|-------|
| **Default** | `root` |
| **Required** | Recommended |
| **Description** | User ID for file ownership |

```bash
# Find your UID
id -u

# Use in Docker
docker run -e PUID=1000 ...
```

### PGID

| Property | Value |
|----------|-------|
| **Default** | `root` |
| **Required** | Recommended |
| **Description** | Group ID for file ownership |

```bash
# Find your GID
id -g

# Use in Docker
docker run -e PGID=1000 ...
```

!!! tip "Why Set PUID/PGID?"
    Without these, files are created as root, making them difficult to manage from the host system.

## Frontend Variables (Vite)

These are used during development only.

### VITE_PORT

| Property | Value |
|----------|-------|
| **Default** | `3000` |
| **Required** | No |
| **Description** | Development server port |

### VITE_API_PORT

| Property | Value |
|----------|-------|
| **Default** | `8080` |
| **Required** | No |
| **Description** | Backend API port for dev proxy |

## Complete Examples

### Docker Run

```bash
docker run -d \
  --name tasks.md \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TITLE="My Tasks" \
  -e BASE_PATH="" \
  -e LOCAL_IMAGES_CLEANUP_INTERVAL=1440 \
  -p 8080:8080 \
  -v /home/user/tasks:/tasks \
  -v /home/user/config:/config \
  --restart unless-stopped \
  baldissaramatheus/tasks.md
```

### Docker Compose

```yaml
version: "3"
services:
  tasks.md:
    image: baldissaramatheus/tasks.md
    container_name: tasks.md
    environment:
      - PUID=1000
      - PGID=1000
      - TITLE=Radiona Tasks
      - BASE_PATH=
      - LOCAL_IMAGES_CLEANUP_INTERVAL=1440
    volumes:
      - ./tasks:/tasks
      - ./config:/config
    restart: unless-stopped
    ports:
      - 8080:8080
```

### Development

```bash
# Backend
cd backend
PORT=8080 TASKS_DIR=./tasks CONFIG_DIR=./config npm start

# Frontend (separate terminal)
cd frontend
VITE_PORT=3000 VITE_API_PORT=8080 npm start
```

## Variable Precedence

1. Environment variables (highest priority)
2. Default values in code
3. Fallback values

## Validation

Variables are validated at startup:

| Variable | Validation |
|----------|------------|
| `PORT` | Must be valid port number |
| `TASKS_DIR` | Must be writable directory |
| `CONFIG_DIR` | Must be writable directory |
| `PUID/PGID` | Must be valid numeric IDs |
| `LOCAL_IMAGES_CLEANUP_INTERVAL` | Must be >= 0 |

## Troubleshooting

### Permission Denied

```
EACCES: permission denied
```

**Fix**: Set correct PUID/PGID matching host user.

### Port Already in Use

```
EADDRINUSE: address already in use
```

**Fix**: Change PORT or stop conflicting service.

### Directory Not Found

```
ENOENT: no such file or directory
```

**Fix**: Ensure volume mount paths exist on host.
