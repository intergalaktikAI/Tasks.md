# Installation

Tasks.md can be installed using Docker (recommended) or from source code.

## Docker Installation (Recommended)

### Quick Start

```bash
docker run -d \
  --name tasks.md \
  -e PUID=1000 \
  -e PGID=1000 \
  -p 8080:8080 \
  -v /path/to/tasks/:/tasks/ \
  -v /path/to/config/:/config/ \
  --restart unless-stopped \
  baldissaramatheus/tasks.md
```

!!! warning "Replace Paths"
    Replace `/path/to/tasks/` and `/path/to/config/` with actual directories on your system.

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: "3"
services:
  tasks.md:
    image: baldissaramatheus/tasks.md
    container_name: tasks.md
    environment:
      - PUID=1000
      - PGID=1000
      - TITLE=My Tasks
    volumes:
      - ./tasks:/tasks
      - ./config:/config
    restart: unless-stopped
    ports:
      - 8080:8080
```

Then run:

```bash
docker-compose up -d
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUID` | User ID for file ownership | `root` |
| `PGID` | Group ID for file ownership | `root` |
| `TITLE` | Application title shown in header | Empty |
| `BASE_PATH` | URL base path for reverse proxy | `/` |
| `LOCAL_IMAGES_CLEANUP_INTERVAL` | Minutes between orphan image cleanup | `1440` |

!!! tip "Finding Your UID/GID"
    On Linux, run `id` in terminal to find your user ID and group ID (usually both are `1000`).

## Source Code Installation

### Prerequisites

- Node.js 18+ (see `.nvmrc` for exact version)
- npm or yarn

### Steps

1. **Clone the repository**
    ```bash
    git clone --recursive https://github.com/BaldissaraMatheus/Tasks.md.git
    cd Tasks.md
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Start the backend**
    ```bash
    cd ../backend
    npm start
    ```

5. **Start the frontend** (in a new terminal)
    ```bash
    cd frontend
    npm start
    ```

The application will be available at:
- Frontend dev server: `http://localhost:3000`
- Backend API: `http://localhost:8080`

### Production Build

For production deployment:

```bash
cd frontend
npm run build
cp -r dist/* ../backend/static/
cd ../backend
npm start
```

## Reverse Proxy Setup

### Nginx

```nginx
location /tasks/ {
    proxy_pass http://localhost:8080/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

!!! note "BASE_PATH Required"
    When using a subpath, set `BASE_PATH=/tasks` environment variable.

### Traefik

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.tasks.rule=Host(`tasks.example.com`)"
```

## Verification

After installation, verify everything works:

1. Open `http://localhost:8080` in your browser
2. You should see the login page
3. Log in with credentials (see [Adding Users](adding-users.md))

![Login Page](../screenshots/login.png)

## Troubleshooting

### Permission Denied Errors

If you see permission errors, check that PUID/PGID match your user:

```bash
# Check your UID/GID
id

# Update docker-compose.yml with correct values
environment:
  - PUID=1000
  - PGID=1000
```

### Port Already in Use

Change the port mapping:

```bash
-p 3000:8080  # Use port 3000 instead
```

### PWA Not Working

PWA only works when `BASE_PATH` is `/` (root path). If using a subpath, PWA will be disabled.
