# Implementation Estimate - Radiona Features

## Complexity Breakdown

| Feature | Backend | Frontend | Complexity |
|---------|---------|----------|------------|
| 1. Authentication | Auth middleware, session management, bcrypt, user file parsing, protected routes | Login page, auth state, redirects | **High** |
| 2. Membership Tasks | First-login detection, choice storage, completion tracking | First-login modal, progress counters | **Medium** |
| 3. Shared Board | Owner field on tasks, permission checks on edit | Show all tasks, disable others' edits, visual distinction | **Medium** |
| 4. Moderator Role | Role check in middleware | Enable edit for moderators | **Low** |

## Estimated New Code

| Area | Lines of Code |
|------|---------------|
| Backend (auth, sessions, permissions) | ~400-500 |
| Frontend (login, modals, state) | ~500-700 |
| Config/utilities | ~100-150 |
| **Total** | **~1000-1350 lines** |

## Token Estimate

| Scenario | Tokens |
|----------|--------|
| Clean implementation (few issues) | ~100k-150k |
| Typical implementation (some debugging) | ~150k-250k |
| Complex implementation (many iterations) | ~250k-400k |

**Most likely: ~150k-200k tokens** for full implementation.

## Recommended Approach

Implement in phases:
1. **Phase 1**: Authentication (foundation for everything else)
2. **Phase 2**: Shared board with ownership
3. **Phase 3**: Moderator role
4. **Phase 4**: Membership tasks & first-login flow
