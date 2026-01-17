# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2026-01-17

### Added
- **Reset Activity Selection:** Members can now reset their activity selection and choose a new membership activity
  - "Reset Selection" button appears in the header next to logout (only for users who have already selected)
  - Shows confirmation dialog before resetting
  - Deletes existing membership task cards created for this user
  - Returns user to the first-login activity selection modal

### Technical
- Added `handleResetActivity` function in App.jsx
- Added `userProfile` and `onResetActivity` props to Header component
- Added CSS styling for `.user-info__reset` button

## [1.0.1] - 2026-01-17

### Added
- **Task card creation on activity selection:** When user selects a membership activity, actual task cards are now created:
  - Selected activity task (e.g., "Open Radiona - 10x required")
  - "Pay Membership Fee" task
- Tasks are created in a "Membership" lane (auto-created if not exists)
- Tasks include `[owner:email]` and `[tag:Membership]` markers

### Fixed
- Activity selection now creates real task cards instead of just saving to profile
- Fixed task filename with parentheses causing 404 errors

## [1.0.0] - 2026-01-17

### Added
- Multi-user authentication system with email/password login
- User roles: `member` (default) and `moderator`
- Card ownership - users can only edit their own cards
- Moderators can edit any user's cards
- First-login activity selection modal for membership tasks
- User profiles stored in `config/profiles/`
- CLI tool for adding users (`node add-user.js`)

### Fixed
- **Critical:** Fixed SolidJS reactivity bug where login page was stuck on "Loading..."
  - Replaced early return statements with proper `<Switch>`/`<Match>` components
  - SolidJS requires reactive control flow components, not imperative returns
- Added `/title` endpoint to public routes (was returning 401 Unauthorized)
- Fixed PWA service worker files (registerSW.js, sw.js, manifest.webmanifest) not being served correctly

### Technical
- Added `Switch` and `Match` imports from solid-js for proper conditional rendering
- Auth middleware now allows `/auth/login`, `/auth/status`, and `/title` as public routes
- Server static file routing updated to handle root-level PWA files
