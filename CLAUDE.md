# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tasks.md is a self-hosted, Markdown file-based task management board. It uses a file-system-as-database approach where lanes are directories and cards are `.md` files.

## Development Commands

### Frontend (from `/frontend`)
```bash
npm install
npm start          # Dev server on localhost:3000 (proxies API to port 8080)
npm run build      # Production build to dist/
```

### Backend (from `/backend`)
```bash
npm install
npm start          # API server on localhost:8080
```

### Linting (frontend only)
```bash
npx @biomejs/biome check .        # Check for issues
npx @biomejs/biome check --write  # Auto-fix issues
```

## Architecture

### Technology Stack
- **Frontend**: SolidJS with Vite, PWA support via vite-plugin-pwa
- **Backend**: Koa with file-system persistence
- **Editor**: Custom Stacks-Editor component (bundled in `frontend/src/components/Stacks-Editor/`)

### Data Model
- **Lanes**: Directories in `TASKS_DIR`
- **Cards**: Markdown files within lane directories
- **Tags**: Inline markers `[tag:TagName]` in card content; colors stored in `CONFIG_DIR/tags.json`
- **Due dates**: Inline markers `[due:YYYY-MM-DD]` in card content
- **Sort order**: `CONFIG_DIR/sort.json` stores manual ordering per lane

### Backend Endpoints (`/backend/server.js`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET/POST/PATCH/DELETE | `/resource/:path*` | CRUD for lanes and cards |
| GET/PATCH | `/tags/:path*` | Tag color management |
| GET/PUT | `/sort/:path*` | Manual sort order |
| POST | `/image` | Image upload (base64, returns UUID filename) |

### Frontend State (`/frontend/src/App.jsx`)
Main component manages all state using SolidJS signals. Key state:
- `lanes()`, `tagsOptions()` - data from API
- `sort()`, `sortDirection()`, `viewMode()` - persisted to localStorage
- `focusedCardId()`, `focusedLaneIndex()` - keyboard navigation tracking

### Key Utilities
- `frontend/src/card-content-utils.js`: Tag/due-date extraction and manipulation via regex
- `frontend/src/api.js`: API base path configuration (handles dev vs prod)

### Keyboard Navigation
Vim-style (`hjkl`) and arrow key navigation implemented in `App.jsx`. Help dialog in `keyboard-navigation-dialog.jsx`.

## Environment Variables

### Backend
- `PORT`: Server port (default: 8080)
- `TASKS_DIR`: Path to tasks directory
- `CONFIG_DIR`: Path to config directory
- `BASE_PATH`: URL base path for reverse proxy setups
- `LOCAL_IMAGES_CLEANUP_INTERVAL`: Minutes between orphan image cleanup (0 to disable)

### Frontend (Vite)
- `VITE_PORT`: Dev server port
- `VITE_API_PORT`: Backend API port for dev proxy
