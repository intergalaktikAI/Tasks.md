# Tasks.md Documentation

Welcome to the official documentation for **Tasks.md** - a self-hosted, Markdown file-based task management board.

![Tasks.md Board Overview](screenshots/board-overview.png)

## What is Tasks.md?

Tasks.md is a modern, self-hosted task management solution that stores all your data as simple Markdown files. It's designed for individuals, teams, and organizations who want full control over their data while enjoying a beautiful, responsive interface.

## Key Features

<div class="grid cards" markdown>

-   :material-file-document: **Markdown-Based**

    ---

    Cards are stored as `.md` files. Edit them with any text editor, version control with Git, or open in Obsidian.

-   :material-docker: **Easy Installation**

    ---

    Deploy with a single Docker command. No complex setup required.

-   :material-palette: **Themeable**

    ---

    Light and dark themes with Adwaita, Nord, and Catppuccin color schemes.

-   :material-shield-account: **Multi-User Support**

    ---

    User authentication with roles (member, moderator) and card ownership.

-   :material-checkbox-marked: **Membership Management**

    ---

    First-login activity selection and progress tracking for NGO/club management.

-   :material-keyboard: **Keyboard Navigation**

    ---

    Vim-style shortcuts for power users. Navigate and manage cards without touching the mouse.

</div>

## Quick Start

```bash
docker run -d \
  --name tasks.md \
  -p 8080:8080 \
  -v /path/to/tasks/:/tasks/ \
  -v /path/to/config/:/config/ \
  baldissaramatheus/tasks.md
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## For Radiona Members

This instance is configured for **Radiona NGO** membership management. On your first login, you'll choose a membership activity:

| Activity | Times Required |
|----------|----------------|
| Open Radiona | 10 |
| Organise Meetup | 2 |
| Create Art Work | 1 |

See [Activity Selection](radiona/activity-selection.md) for details.

## Getting Help

- **Installation issues?** See [Installation Guide](getting-started/installation.md)
- **Can't log in?** Check [Authentication](user-guide/authentication.md)
- **Keyboard shortcuts?** View [Keyboard Shortcuts](user-guide/keyboard-shortcuts.md)

## Technology Stack

Tasks.md is built with:

- **Frontend**: [SolidJS](https://solidjs.com/) with Vite
- **Backend**: [Koa](https://koajs.com/) with file-system persistence
- **Editor**: [Stacks-Editor](https://github.com/StackExchange/Stacks-Editor)

---

**Version**: 1.0.5 | [View Changelog](https://github.com/BaldissaraMatheus/Tasks.md/blob/main/CHANGELOG.md)
