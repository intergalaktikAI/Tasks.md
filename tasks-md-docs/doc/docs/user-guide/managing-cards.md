# Managing Cards

Cards are the core unit of work in Tasks.md. Each card is stored as a Markdown file.

## Creating Cards

### Via UI

1. Click **+ Add Card** at the bottom of any lane
2. Enter the card title
3. Press Enter or click outside to save

### Via Keyboard

1. Press `n` to create a new card
2. The card is created in the currently focused lane
3. If no lane is focused, it's created in the first lane

### Card Title Rules

- Titles become the filename (with `.md` extension)
- Special characters are sanitized
- Avoid: `/ \ : * ? " < > |`

## Editing Cards

### Opening a Card

Click on any card to open it in the editor.

![Card Editor](../screenshots/card-detail.png)

### The Editor

Tasks.md uses a rich Markdown editor with:

- **Formatting toolbar**: Bold, italic, links, lists
- **Live preview**: See formatting as you type
- **Code blocks**: Syntax highlighting included
- **Image support**: Paste or upload images

### Editor Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+K` | Insert link |
| `Ctrl+Enter` | Save and close |
| `Esc` | Close without saving |

### Saving Changes

- Click outside the editor to save
- Press `Esc` to close (auto-saves)
- Changes are saved to the Markdown file immediately

## Card Ownership

When you create a card, you become its owner:

```markdown
# My Task

This is my task content.

[owner:myemail@example.com]
```

The `[owner:email]` marker is added automatically.

### Ownership Rules

| You Are | Can Edit |
|---------|----------|
| Owner | Your card |
| Moderator | Any card |
| Other member | View only |

!!! warning "Read-Only Cards"
    If you can't edit a card, it belongs to another user. Contact them or a moderator to make changes.

## Moving Cards

### Drag and Drop

1. Click and hold a card
2. Drag to the desired lane
3. Drop to place it

### Keyboard Movement

| Shortcut | Action |
|----------|--------|
| `Alt+←` | Move to previous lane |
| `Alt+→` | Move to next lane |
| `Alt+↑` | Move up within lane |
| `Alt+↓` | Move down within lane |

## Renaming Cards

### Via UI

1. Right-click the card (or use menu)
2. Select "Rename"
3. Enter new name
4. Press Enter to save

### Via Keyboard

1. Focus the card (use arrow keys)
2. Press `r` to rename
3. Enter new name
4. Press Enter

### What Happens

- The `.md` file is renamed
- All content is preserved
- Sort order is maintained

## Deleting Cards

### Via UI

1. Open the card
2. Click the delete/trash icon
3. Confirm deletion

### Via Keyboard

1. Focus the card
2. Press `d`
3. Confirm in the dialog

!!! danger "Permanent Deletion"
    Deleted cards are permanently removed from the file system. There is no recycle bin. Consider backing up important tasks.

## Card Content Format

Cards are Markdown files with special markers:

```markdown
# Task Title

Regular markdown content here.

## Subtasks
- [ ] First item
- [x] Completed item

[tag:Feature]
[tag:Urgent]
[due:2024-12-31]
[owner:user@example.com]
```

### Special Markers

| Marker | Purpose | Example |
|--------|---------|---------|
| `[tag:Name]` | Add a tag | `[tag:Bug]` |
| `[due:DATE]` | Set due date | `[due:2024-12-31]` |
| `[owner:EMAIL]` | Set owner | `[owner:me@site.com]` |

These markers are hidden in the UI but stored in the file.

## Images

### Adding Images

1. Paste from clipboard (Ctrl+V)
2. Drag and drop an image file
3. Use the image button in toolbar

### Image Storage

Images are:

- Converted to base64 or
- Saved to the tasks directory with UUID names
- Orphan images are cleaned up periodically

## Duplicating Cards

Currently, there's no built-in duplicate function. To copy a card:

1. Open the card
2. Select all content (Ctrl+A)
3. Copy (Ctrl+C)
4. Create new card
5. Paste content (Ctrl+V)

## Bulk Operations

For bulk operations, use the file system directly:

```bash
# Move all cards from Backlog to Archive
mv /tasks/Backlog/*.md /tasks/Archive/

# Copy a card
cp /tasks/Sprint/task.md /tasks/Backlog/task-copy.md
```

Remember to refresh the browser after file system changes.
