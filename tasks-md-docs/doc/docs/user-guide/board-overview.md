# Board Overview

The Tasks.md board is your central workspace for managing tasks. It uses a familiar kanban-style layout with lanes and cards.

![Board Overview](../screenshots/board-overview.png)

## Understanding the Interface

### Header

The header contains:

| Element | Description |
|---------|-------------|
| **Logo** | Application logo and title |
| **User Info** | Your email and role |
| **Reset Selection** | Reset your activity choice (if selected) |
| **Logout** | End your session |

!!! note "Moderator Controls"
    Moderators see additional controls: Sort dropdown, filter options, and view mode toggle. Regular members see a simplified header.

### Lanes

Lanes are vertical columns that organize your tasks:

- Each lane represents a stage or category
- Lanes are stored as **directories** in the file system
- Drag cards between lanes to move tasks

#### Lane Operations

| Action | How To |
|--------|--------|
| Add Lane | Click **+ Add Lane** button |
| Rename Lane | Click lane title to edit |
| Delete Lane | Click the trash icon (must be empty) |
| Reorder Lanes | Drag lanes by their header |

### Cards

Cards represent individual tasks:

- Each card is a **Markdown file** (`.md`)
- Cards show title, tags, due date, and owner
- Click a card to view/edit its content

#### Card Elements

| Element | Description |
|---------|-------------|
| **Title** | Card name (filename without `.md`) |
| **Tags** | Colored labels for categorization |
| **Due Date** | When the task is due |
| **Owner Badge** | Email of the card owner |
| **Progress Bar** | For membership activity cards |

## File System Mapping

Tasks.md uses a file-system-as-database approach:

```
/tasks/
├── Backlog/                    # Lane
│   ├── Research API options.md # Card
│   └── Design mockups.md       # Card
├── In Progress/                # Lane
│   └── Implement login.md      # Card
└── Done/                       # Lane
    └── Setup project.md        # Card
```

!!! tip "Edit with Any Tool"
    Because tasks are Markdown files, you can edit them with VS Code, Obsidian, or any text editor.

## Views

### Board View (Default)

The standard kanban view with lanes arranged horizontally.

### List View

A compact list showing all cards vertically. Useful for:

- Seeing all tasks at once
- Filtering and sorting
- Quick overview

Toggle with the view mode button (moderators only).

## Filtering & Sorting

!!! note "Moderator Only"
    These controls are only visible to moderators.

### Sort Options

| Sort By | Description |
|---------|-------------|
| Manual | Drag-and-drop order |
| Title | Alphabetical by name |
| Due Date | Nearest due date first |
| Created | Newest first |

### Filter Options

Filter cards by:

- **Tags**: Show only cards with specific tags
- **Owner**: Show only your cards or specific users

## Themes

Tasks.md syncs with your operating system's theme preference:

- **Light Mode**: Clean white background
- **Dark Mode**: Easy on the eyes at night

The theme switches automatically when you change your OS settings.

## Card Ownership

Every card has an owner (the person who created it):

- Owners are shown with an email badge
- You can only edit **your own cards**
- Moderators can edit **any card**

![Card with Owner Badge](../screenshots/card-detail.png)

## Quick Actions

From the board view, you can:

| Action | Method |
|--------|--------|
| Open card | Click on it |
| Move card | Drag to another lane |
| Create card | Click **+ Add Card** in lane |
| Use keyboard | Press `?` for shortcuts |

See [Keyboard Shortcuts](keyboard-shortcuts.md) for power-user navigation.

## Mobile Support

Tasks.md is fully responsive:

- Touch-friendly interface
- Swipe to scroll lanes
- PWA installable on mobile

!!! warning "PWA Limitation"
    PWA installation only works when the app is served from the root path (`/`), not a subpath.
