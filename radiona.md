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

**Status:** COMPLETED (v1.0.0)

**Description:** This board serves as a task wall for Radiona NGO members. Each member has required tasks to complete for their membership.

**Implemented:**

#### 2.2 First Login - Choose Membership Activity
On first login, each member must choose ONE of these three options:

| Option | Task Name | Times Required | Status |
|--------|-----------|----------------|--------|
| A | Open Radiona | 10 | ✅ Implemented |
| B | Organise Meetup | 2 | ✅ Implemented |
| C | Create Art Work | 1 | ✅ Implemented |

**User Flow:** ✅ All implemented
1. New member logs in for the first time
2. System presents the 3 options (A, B, or C)
3. Member selects their preferred activity
4. User profiles stored in `config/profiles/`

---

### 3. Shared Board with User-Only Editing ✅

**Status:** COMPLETED (v1.0.0)

**Description:** All members see the same board showing everyone's tasks, but can only modify their own.

**Implemented:**
- All logged-in users see all tasks on the board
- Each task shows owner via `[owner:email@example.com]` marker
- Users can only edit/delete their own tasks
- Other members' tasks have disabled edit controls

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

## Pending Features

### 2.1 Mandatory Task: "Pay Membership"
- Every member sees a "Pay membership" task when they log in
- This task resets yearly (or per membership period)

**Status:** Not yet implemented

