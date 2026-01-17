# Radiona Tasks - Application Specification

This document describes the features and requirements for the Radiona NGO membership task management application.

---

## Overview

Radiona Tasks is a membership task wall for Radiona NGO. Members have required tasks to complete for their membership. The application uses a shared board where all members can see everyone's tasks but can only edit their own.

---

## Features

### 1. Multi-User Authentication

Members log in with email and password credentials.

- Login page with email and password fields
- User credentials stored in `config/users.md`
- Session management with 7-day expiry
- Logout functionality
- Passwords hashed with PBKDF2-SHA512

### 2. User Roles

| Role | Permissions |
|------|-------------|
| `member` | Edit own tasks only |
| `moderator` | Edit all tasks, see sorting/filtering controls |

**Users File Format:**
```markdown
# Users

| Email | Password | Role |
|-------|----------|------|
| admin@radiona.org | salt:hash | moderator |
| member@example.com | salt:hash | member |
```

### 3. First Login - Activity Selection

On first login, each member must choose ONE membership activity:

| Option | Task Name | Times Required |
|--------|-----------|----------------|
| A | Open Radiona | 10 |
| B | Organise Meetup | 2 |
| C | Create Art Work | 1 |

**User Flow:**
1. New member logs in for the first time
2. System presents the 3 selectable options
3. Member clicks to select their preferred activity
4. On selection, task cards are created:
   - Selected activity task in user's lane (e.g., "Open Radiona - 10x required")
   - "Pay Membership Fee" task
5. User profiles stored in `config/profiles/`
6. Board refreshes to show new tasks

### 4. Shared Board with User-Only Editing

- All logged-in users see ALL tasks from ALL users (shared board)
- Each task shows owner via `[owner:email@example.com]` marker
- Users can only edit/delete their own tasks
- Other members' tasks are visible but read-only
- Tasks are stored as .md files in shared directories

### 5. User-Named Lanes

When user first logs in and selects activity, a lane is created named after the user.

- Lane named based on user's email (e.g., "john@example.com" → "John's Tasks")
- Email prefix is capitalized and cleaned (dots/underscores become spaces)

### 6. Progress Tracking

Visual progress tracking for activity task cards.

- Progress bar displayed on cards with `**Progress:** X / Y completed` in content
- Shows current/total count (e.g., "3/10")
- "+1" button to increment progress (visible only to card owner)
- Progress synced to user profile for persistence
- Button hidden when progress reaches target

### 7. Reset Activity Selection

Members who have already selected their activity can reset and choose again.

- "Reset Selection" button visible in header when activity is selected
- Confirmation dialog before resetting
- On confirmation:
  - Delete existing membership task cards for this user
  - Reset user profile to show first-login modal again
  - User can select a new activity

---

## Deployment

**Frontend build must be copied to backend static folder:**
```bash
cd frontend && npm run build
cp -r dist/* ../backend/static/
```

---

## Adding Users

```bash
cd backend
node add-user.js <email> <password> [role]
# Example: node add-user.js admin@example.com secret moderator
```
