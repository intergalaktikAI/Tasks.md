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

*No pending features at this time.*

---

### 12. User-Named Initial Lane ✅

**Status:** COMPLETED (v1.0.4)

**Description:** When user first logs in and selects activity, the lane created is named after the logged-in user.

**Implemented:**
- Lane named based on user's email (e.g., "john@example.com" → "John's Tasks")
- Email prefix is capitalized and cleaned (dots/underscores become spaces)
- Function `getUserLaneName()` handles the naming logic

---

## Bug Fixes (v1.0.5)

### BUG FIX: Login Button Visibility ✅

**Status:** FIXED & VERIFIED

**Description:** Login button now extremely prominent with pulsing green glow animation.

**Fixed:**
- Gradient green background (`linear-gradient(135deg, #22c55e, #16a34a)`)
- Pulsing animation effect (`pulse-green 2s infinite`)
- Large shadow and border (`box-shadow: 0 8px 30px`)
- Uppercase bold text (1.25rem, 700 weight)
- 3px green border
- Impossible to miss

**CSS class:** `.login-button` in `index.css:1007-1041`

---

### BUG FIX: Reset Button ✅

**Status:** FIXED & VERIFIED

**Description:** Reset Selection button now properly shows when user has chosen an activity.

**Fixed:**
- Changed condition to use optional chaining `props.userProfile?.chosenActivity`
- Uses SolidJS `<Show>` component for proper reactivity
- Button appears in header next to Logout when activity is selected

**Code:** `header.jsx:97-101`

---

### BUG FIX: Sort/View Mode Hidden ✅

**Status:** FIXED & VERIFIED

**Description:** Sort by, Filter by, and View mode dropdowns now hidden for regular members.

**Fixed:**
- Changed Show condition to `props.user?.role === "moderator"`
- Only moderators see these controls
- Regular logged-in members have simplified header

**Code:** `header.jsx:51-79`

---

## IMPORTANT: Deployment Note

**Frontend build must be copied to backend static folder:**
```bash
cd frontend && npm run build
cp -r dist/* ../backend/static/
```

---

### 9. Simplified Header for Members ✅

**Status:** COMPLETED (v1.0.4)

**Description:** Regular members don't need advanced sorting/filtering options. Simplified the UI by hiding these controls.

**Implemented:**
- "Sort by" dropdown hidden when logged in
- "Filter by" dropdown hidden when logged in
- "View mode" selector hidden when logged in
- Code remains intact - only display is hidden via `<Show>` component
- Moderators still see all controls (role="moderator" check)

---

### 10. Login Button Visibility ✅

**Status:** COMPLETED (v1.0.4)

**Description:** Made the Login button more prominent and visible.

**Implemented:**
- Bright green color (#22c55e) with high contrast
- Larger padding and font size
- Bold uppercase text with letter spacing
- Green glow shadow effect
- Hover animation (lifts up slightly)
- Clearly stands out as primary action

---

### 11. Activity Selection - Better Visual Feedback ✅

**Status:** COMPLETED (v1.0.4)

**Description:** Improved visual feedback when clicking on an activity option during first login.

**Implemented:**
- Selected option has bright green border (3px thick)
- Green-tinted background on selected option
- Large green glow/shadow effect around selected option
- Larger checkmark badge (48px) with shadow
- Selected activity name turns green
- Scale animation (1.03x) on selection
- Impossible to miss which option is selected

---

## Recently Completed Features

### 6. User-Specific Lanes ✅

**Status:** COMPLETED (v1.0.3)

**Description:** Each user now has their own lane instead of a shared "Membership" lane.

**Implemented:**
- Lane is named after the user (e.g., "John's Tasks" derived from email prefix)
- Each user's lane is visible to all users (shared board)
- Only the lane owner can edit/delete cards in their lane (enforced by `[owner:email]` tag)
- Moderators can still edit any lane
- Lane is deleted when user resets their activity selection (if empty)

---

### 7. Activity Selection Visual Feedback ✅

**Status:** COMPLETED (v1.0.3)

**Description:** Improved visual feedback on the first-login activity selection screen.

**Implemented:**
- Selected activity option now has a prominent green checkmark badge
- Selected option has a visible box-shadow glow effect
- Selected option slightly scales up (1.02x) for emphasis
- Smooth animation when checkmark appears
- Clear visual distinction between selected and unselected options

---

### 8. Progress Tracking ✅

**Status:** COMPLETED (v1.0.3)

**Description:** Visual progress tracking for activity task cards.

**Implemented:**
- Progress bar displayed on cards with `**Progress:** X / Y completed` in content
- Shows current/total count (e.g., "3/10")
- "+1" button to increment progress (visible only to card owner)
- Progress is synced to user profile for persistence
- Button hidden when progress reaches target

