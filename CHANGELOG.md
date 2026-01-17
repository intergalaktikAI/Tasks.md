# Changelog

All notable changes to this project will be documented in this file.

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
