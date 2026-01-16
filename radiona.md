# Radiona - Feature Requests

## Planned Features

### 1. Simple Multi-User Authentication

**Description:** Add login functionality so multiple users can access the board with their own credentials.

**Requirements:**
- Simple login page with email and password fields
- User credentials stored in a markdown file (e.g., `config/users.md`)
- The users file must NOT be accessible from outside (protected from web access)
- Session management to keep users logged in
- Logout functionality

**Implementation Notes:**
- Users file format could be:
  ```markdown
  # Users

  | Email | Password (hashed) |
  |-------|-------------------|
  | user@example.com | $2b$... |
  ```
- Passwords should be hashed (bcrypt or similar)
- Backend needs authentication middleware
- Frontend needs login page and auth state management

---

### 2. Radiona NGO Membership Tasks

**Description:** This board serves as a task wall for Radiona NGO members. Each member has required tasks to complete for their membership.

**Requirements:**

#### 2.1 Mandatory Task: "Pay Membership"
- Every member sees a "Pay membership" task when they log in
- This task resets yearly (or per membership period)

#### 2.2 First Login - Choose Membership Activity
On first login, each member must choose ONE of these three options:

| Option | Task Name | Times Required | Type |
|--------|-----------|----------------|------|
| A | Open Radiona | 10 | Counter (manual check-off each time) |
| B | Organise Meetup | 2 | Counter (manual check-off each time) |
| C | Create one Art work | 1 | Single task |

**User Flow:**
1. New member logs in for the first time
2. System presents the 3 options (A, B, or C)
3. Member selects their preferred activity
4. Selected task appears on their board with the required count
5. Member manually marks completion each time they do the activity
6. Task shows progress (e.g., "Open Radiona 3/10")

**Implementation Notes:**
- Store user's chosen option in their profile/config
- Track completion count per user
- Show progress indicator on task cards
- Consider allowing option change (or lock after selection?)

---

### 3. Shared Board with User-Only Editing

**Description:** All members see the same board showing everyone's tasks, but can only modify their own.

**Requirements:**
- All logged-in users see all members' tasks on the board
- Each task shows which member it belongs to
- Users can only edit/complete their own tasks
- Other members' tasks are read-only (view only)

**Implementation Notes:**
- Tasks need owner field (user email/id)
- UI should visually distinguish own tasks vs others' tasks
- Edit/complete buttons hidden or disabled for others' tasks
- Consider grouping tasks by member or showing member name on each card

---

### 4. Moderator Role

**Description:** Certain users can be assigned as moderators with elevated permissions.

**Requirements:**
- Moderators can edit/complete any user's tasks
- Moderator status stored in the users file
- Regular users: edit own tasks only
- Moderators: edit all tasks

**Users File Format (updated):**
```markdown
# Users

| Email | Password (hashed) | Role |
|-------|-------------------|------|
| admin@radiona.org | $2b$... | moderator |
| member@example.com | $2b$... | member |
```

**Implementation Notes:**
- Add role field to user config (default: "member")
- Check role before allowing edit operations
- UI could show moderator badge or indicator
- Consider logging moderator edits for accountability

