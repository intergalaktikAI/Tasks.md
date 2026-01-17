# Configuration

Tasks.md can be configured through environment variables and configuration files.

## Directory Structure

```
/config/
├── custom.css          # Custom CSS overrides
├── tags.json           # Tag color definitions
├── sort.json           # Lane sort order
├── users.md            # User credentials
└── profiles/           # User profile data
    └── user@email.json

/tasks/
├── Backlog/           # Lane directory
│   └── Task 1.md      # Card file
├── In Progress/
└── Done/
```

## Environment Variables

### Backend Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `8080` | No |
| `TASKS_DIR` | Path to tasks directory | `/tasks` | Yes |
| `CONFIG_DIR` | Path to config directory | `/config` | Yes |
| `BASE_PATH` | URL base path for reverse proxy | `/` | No |
| `LOCAL_IMAGES_CLEANUP_INTERVAL` | Minutes between cleanup (0 to disable) | `1440` | No |
| `TITLE` | Application title | Empty | No |

### Docker Environment

| Variable | Description | Default |
|----------|-------------|---------|
| `PUID` | User ID for file ownership | `root` |
| `PGID` | Group ID for file ownership | `root` |

## Customizing Appearance

### Custom CSS

Create or edit `/config/custom.css` to customize the appearance:

```css
/* Change to Nord theme */
@import url("stylesheets/nord.css");

/* Or Catppuccin theme */
@import url("stylesheets/catppuccin.css");
```

### Color Variables

Override these CSS variables for custom colors:

```css
:root {
  --color-accent: #3584e4;           /* Highlight color */
  --color-foreground: #1e1e1e;       /* Text color */
  --color-background-1: #fafafa;     /* Main background */
  --color-background-2: #f6f5f4;     /* Lanes, header */
  --color-background-3: #ffffff;     /* Cards */
  --color-background-4: #deddda;     /* Buttons, inputs */

  /* Tag colors */
  --color-alt-1: #e01b24;            /* Red */
  --color-alt-2: #ff7800;            /* Orange */
  --color-alt-3: #f6d32d;            /* Yellow */
  --color-alt-4: #33d17a;            /* Green */
  --color-alt-5: #62a0ea;            /* Blue */
  --color-alt-6: #9141ac;            /* Purple */
  --color-alt-7: #986a44;            /* Brown */
}
```

## Tag Configuration

Tags are defined inline in card content as `[tag:TagName]`. Tag colors are stored in `/config/tags.json`:

```json
{
  "Urgent": "#e01b24",
  "Bug": "#ff7800",
  "Feature": "#33d17a",
  "Membership": "#62a0ea"
}
```

Tags are automatically assigned colors when first created, but you can customize them via the UI.

## Sort Order

Lane and card sort order is stored in `/config/sort.json`:

```json
{
  "lanes": ["Backlog", "In Progress", "Done"],
  "cards": {
    "Backlog": ["Task 1.md", "Task 2.md"],
    "In Progress": ["Task 3.md"]
  }
}
```

!!! tip "Automatic Sorting"
    Sort order is managed through the UI. Manual edits are possible but not recommended.

## User Configuration

See [Adding Users](adding-users.md) for user management details.

### Users File Format

`/config/users.md`:

```markdown
# Users

| Email | Password | Role |
|-------|----------|------|
| admin@radiona.org | salt:hash | moderator |
| member@example.com | salt:hash | member |
```

!!! warning "Never Edit Passwords Manually"
    Passwords are hashed with PBKDF2-SHA512. Use the CLI tool to add users.

## Themes

### Available Themes

| Theme | Description |
|-------|-------------|
| `adwaita` | Default GNOME theme (light/dark) |
| `nord` | Arctic, bluish color palette |
| `catppuccin` | Soothing pastel theme |

### Setting a Theme

In `/config/custom.css`:

=== "Adwaita (Default)"
    ```css
    /* No import needed - default theme */
    ```

=== "Nord"
    ```css
    @import url("stylesheets/nord.css");
    ```

=== "Catppuccin"
    ```css
    @import url("stylesheets/catppuccin.css");
    ```

### System Theme Sync

Tasks.md automatically syncs with your operating system's light/dark mode preference.

## Backup

### What to Backup

For complete backup, save these directories:

- `/tasks/` - All your task data
- `/config/` - Configuration, users, and profiles

### Using Git

Since tasks are Markdown files, you can version control them:

```bash
cd /path/to/tasks
git init
git add .
git commit -m "Backup tasks"
```

### Automated Backup Script

```bash
#!/bin/bash
BACKUP_DIR="/backups/tasks-$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"
cp -r /path/to/tasks "$BACKUP_DIR/tasks"
cp -r /path/to/config "$BACKUP_DIR/config"
```
