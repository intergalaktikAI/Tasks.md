# Radiona - Feature Requests

## Completed Features

### 1. Simple Multi-User Authentication ✅

**Status:** COMPLETED (v1.0.0)

**Description:** Add login functionality so multiple users can access the board with their own credentials.

**Implemented:**
- Login page with email and password fields
- User credentials stored in `config/users.md`
- Users file protected from web access
- Session management with 7-day expiry
- Logout functionality
- Passwords hashed with PBKDF2-SHA512

---

### 2. Radiona NGO Membership Tasks ✅

**Status:** COMPLETED (v1.0.1)

**Description:** This board serves as a task wall for Radiona NGO members. Each member has required tasks to complete for their membership.

**Implemented:**

#### 2.1 Mandatory Task: "Pay Membership" ✅
- "Pay Membership Fee" task is automatically created when member selects their activity
- Task is created in "Membership" lane with [owner] and [tag:Payment] markers

#### 2.2 First Login - Choose Membership Activity ✅
On first login, each member must choose ONE of these three options:

| Option | Task Name | Times Required | Status |
|--------|-----------|----------------|--------|
| A | Open Radiona | 10 | ✅ Creates task card |
| B | Organise Meetup | 2 | ✅ Creates task card |
| C | Create Art Work | 1 | ✅ Creates task card |

**User Flow:** ✅ All implemented
1. New member logs in for the first time
2. System presents the 3 selectable options (A, B, or C)
3. Member clicks to select their preferred activity
4. **On selection, actual task cards are created:**
   - Selected activity task in "Membership" lane (e.g., "Open Radiona (0/10)")
   - "Pay Membership Fee" task in "Membership" lane
5. User profiles stored in `config/profiles/`
6. Board refreshes to show new tasks

---

### 3. Shared Board with User-Only Editing ✅

**Status:** COMPLETED (v1.0.0)

**Description:** All members see the same board showing everyone's tasks, but can only modify their own.

**Implemented:**
- **All logged-in users see ALL tasks from ALL users** (shared board)
- Each task shows owner via `[owner:email@example.com]` marker
- Users can only edit/delete their own tasks
- Other members' tasks are visible but have disabled edit controls (read-only)
- Tasks are stored as .md files in shared directories

---

### 4. Moderator Role ✅

**Status:** COMPLETED (v1.0.0)

**Description:** Certain users can be assigned as moderators with elevated permissions.

**Implemented:**
- Moderators can edit/complete any user's tasks
- Moderator status stored in users.md with role column
- Regular users: edit own tasks only
- Moderators: edit all tasks

**Users File Format:**
```markdown
# Users

| Email | Password | Role |
|-------|----------|------|
| admin@radiona.org | salt:hash | moderator |
| member@example.com | salt:hash | member |
```

---

### 5. Reset Activity Selection ✅

**Status:** COMPLETED (v1.0.2)

**Description:** Allow logged-in members who have already selected their activity to reset their selection and return to the first-login activity selection modal.

**Implemented:**
- "Reset Selection" button visible to logged-in users who have already chosen an activity
- Clicking the button shows a confirmation dialog
- On confirmation:
  - Delete existing membership task cards created for this user
  - Reset user profile to show first-login modal again
  - User can select a new activity

**Use Case:** Member wants to change from "Open Radiona" to "Create Art Work" activity.

---

## Pending Features

### Progress Tracking
- Track completion count per user (increment when task is marked done)
- Show progress indicator on task cards (e.g., "3/10 completed")
- Consider yearly reset for recurring tasks

**Status:** Not yet implemented

