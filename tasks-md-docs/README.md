# Tasks.md Documentation & Presentation

This directory contains comprehensive documentation and a business presentation for Tasks.md.

## Contents

```
/tmp/tasks-md-docs/
├── doc/                    # MkDocs documentation
│   ├── mkdocs.yml          # MkDocs configuration
│   └── docs/               # Documentation pages
│       ├── index.md        # Home page
│       ├── getting-started/
│       │   ├── installation.md
│       │   ├── configuration.md
│       │   └── adding-users.md
│       ├── user-guide/
│       │   ├── authentication.md
│       │   ├── board-overview.md
│       │   ├── managing-cards.md
│       │   ├── tags-due-dates.md
│       │   └── keyboard-shortcuts.md
│       ├── radiona/
│       │   ├── activity-selection.md
│       │   ├── progress-tracking.md
│       │   └── reset-selection.md
│       ├── admin/
│       │   ├── user-management.md
│       │   ├── roles-permissions.md
│       │   └── deployment.md
│       ├── reference/
│       │   ├── api.md
│       │   └── environment.md
│       └── screenshots/
│           └── README.md
├── slides/                 # Slidev presentation
│   ├── package.json
│   └── slides.md           # 15+ slide business pitch
├── screenshots/            # Screenshot output directory
├── capture-screenshots.sh  # Screenshot capture script
└── README.md               # This file
```

## Setup Instructions

### 1. Copy to Project

```bash
# Copy documentation to project
sudo cp -r /tmp/tasks-md-docs/doc /app/Tasks.md/
sudo cp -r /tmp/tasks-md-docs/slides /app/Tasks.md/

# Fix ownership if needed
sudo chown -R $(whoami):$(whoami) /app/Tasks.md/doc /app/Tasks.md/slides
```

### 2. Capture Screenshots

```bash
# From host machine (not container)
cd /app/Tasks.md

# Add a test user first
cd backend && node add-user.js admin@radiona.org admin moderator && cd ..

# Run capture script (requires playwright)
bash /tmp/tasks-md-docs/capture-screenshots.sh

# Copy screenshots
cp /tmp/tasks-md-docs/screenshots/*.png doc/docs/screenshots/
mkdir -p slides/public/screenshots
cp /tmp/tasks-md-docs/screenshots/*.png slides/public/screenshots/
```

### 3. Run MkDocs

```bash
cd doc

# Install MkDocs Material theme
pip install mkdocs-material

# Serve locally
mkdocs serve

# Build static site
mkdocs build
```

Documentation will be at: http://localhost:8000

### 4. Run Slidev

```bash
cd slides

# Install dependencies
npm install

# Start presentation
npm run dev

# Build for deployment
npm run build
```

Presentation will be at: http://localhost:3030

## Documentation Features

- **14 documentation pages** covering all aspects
- **MkDocs Material theme** with dark/light mode
- **Admonitions** for tips, warnings, notes
- **Code examples** with syntax highlighting
- **API reference** with curl examples
- **Keyboard shortcuts** reference

## Presentation Features

- **15+ slides** for business pitch
- **Seriph theme** with animations
- **Speaker notes** included
- **Code examples** with highlighting
- **Grid layouts** and visual cards
- **Export to PDF** supported

## Screenshot Checklist

After capturing, ensure these exist:

- [ ] `login.png` - Login page
- [ ] `board-overview.png` - Main board view
- [ ] `activity-selection.png` - Activity selection modal
- [ ] `card-detail.png` - Card in editor
- [ ] `progress-tracking.png` - Progress bar card
- [ ] `keyboard-help.png` - Keyboard shortcuts dialog

## Deployment

### MkDocs to GitHub Pages

```bash
cd doc
mkdocs gh-deploy
```

### Slidev to Static

```bash
cd slides
npm run build
# Output in dist/
```
