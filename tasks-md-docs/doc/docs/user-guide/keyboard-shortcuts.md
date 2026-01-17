# Keyboard Shortcuts

Tasks.md supports vim-style keyboard navigation for power users.

## Quick Reference

Press `?` at any time to see the keyboard shortcuts help dialog.

![Keyboard Shortcuts Help](../screenshots/keyboard-help.png)

## Navigation

Move focus between cards and lanes:

| Key | Action |
|-----|--------|
| `↑` or `k` | Move focus to card above |
| `↓` or `j` | Move focus to card below |
| `←` or `h` | Move to first card in previous lane |
| `→` or `l` | Move to first card in next lane |

!!! tip "Vim Users"
    The `hjkl` keys work exactly like in Vim for navigation.

## Moving Cards

Reposition cards using Alt + arrow keys:

| Key | Action |
|-----|--------|
| `Alt+↑` | Move focused card up within lane |
| `Alt+↓` | Move focused card down within lane |
| `Alt+←` | Move focused card to previous lane |
| `Alt+→` | Move focused card to next lane |

## Card Actions

Perform actions on the focused card:

| Key | Action |
|-----|--------|
| `Enter` or `e` | Open/edit focused card |
| `n` | Create new card in current lane |
| `r` | Rename focused card |
| `d` | Delete focused card (with confirmation) |

## General

| Key | Action |
|-----|--------|
| `Esc` | Clear focus / close dialogs |
| `?` | Show keyboard shortcuts help |

## Editor Shortcuts

When editing a card:

| Key | Action |
|-----|--------|
| `Ctrl+B` | Bold text |
| `Ctrl+I` | Italic text |
| `Ctrl+K` | Insert link |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Esc` | Close editor and return to board |

## Focus Behavior

### How Focus Works

1. Click a card or use arrow keys to focus it
2. Focused card has a visible outline/highlight
3. Actions apply to the focused card
4. Press `Esc` to clear focus

### Focus After Actions

| Action | Focus Moves To |
|--------|----------------|
| Delete card | Next card in lane (or previous if last) |
| Move card | Follows the moved card |
| Create card | New card |
| Close editor | Previously edited card |

## Tips for Efficiency

### Quick Card Creation

1. Press `l` to jump to a lane
2. Press `n` to create a new card
3. Type the title
4. Press `Enter` to save
5. Press `Enter` again to open and add content

### Rapid Navigation

Use `h/l` to move between lanes and `j/k` to scan through cards quickly.

### Keyboard-Only Workflow

You can manage your entire board without touching the mouse:

1. Navigate with `hjkl`
2. Open cards with `Enter`
3. Edit content with the rich editor
4. Save with `Ctrl+Enter` or `Esc`
5. Move cards with `Alt+arrows`
6. Delete with `d`

## Accessibility

Keyboard navigation also improves accessibility:

- All interactive elements are focusable
- Focus is visually indicated
- Screen readers can navigate the board
- No mouse required for full functionality

## Customizing Shortcuts

Currently, keyboard shortcuts cannot be customized. They are hardcoded for consistency.

If you need different shortcuts, you can use browser extensions like:

- Vimium
- Surfingkeys
- Custom JavaScript injection

## Troubleshooting

### Shortcuts Not Working

1. **Focus is inside an input/editor**: Press `Esc` first
2. **Browser extension conflict**: Disable Vimium or similar
3. **Modal is open**: Close any open dialogs

### Wrong Card Focused

Press `Esc` to clear focus, then click the desired card or navigate with arrow keys.

### Accidental Deletion

The delete action (`d`) always shows a confirmation dialog. If you confirmed accidentally, the card is permanently deleted. Consider enabling file system backups.
