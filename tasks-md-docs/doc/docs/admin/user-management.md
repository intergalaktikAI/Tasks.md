# User Management

This guide covers administering users in Tasks.md.

## User Storage

Users are stored in `/config/users.md`:

```markdown
# Users

| Email | Password | Role |
|-------|----------|------|
| admin@radiona.org | abc123:def456... | moderator |
| member@example.com | xyz789:uvw321... | member |
```

!!! warning "Never Edit Manually"
    The password column contains hashed values. Always use the CLI tool to add users.

## Adding Users

### Using the CLI

```bash
cd backend
node add-user.js <email> <password> [role]
```

### Examples

```bash
# Add a regular member
node add-user.js john@example.com secretpass

# Add a moderator
node add-user.js admin@radiona.org adminpass moderator
```

### Docker Environment

```bash
# Using docker exec
docker exec -it tasks.md node /app/backend/add-user.js user@email.com password

# Using docker-compose
docker-compose exec tasks.md node /app/backend/add-user.js user@email.com password
```

## User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `member` | Regular user | Edit own cards only |
| `moderator` | Administrator | Edit all cards, admin controls |

### Member Capabilities

- Create cards (automatically owned)
- Edit and delete own cards
- View all cards (read-only for others')
- Track membership progress

### Moderator Capabilities

Everything members can do, plus:

- Edit any user's cards
- Delete any card
- Access sort/filter controls
- View all user profiles

## Viewing Users

### List All Users

```bash
cat /path/to/config/users.md
```

### Docker

```bash
docker exec tasks.md cat /config/users.md
```

## Updating Users

### Reset Password

Run add-user with the same email:

```bash
node add-user.js existing@user.com newpassword
```

The existing user's password is updated.

### Change Role

Currently requires manual edit:

1. Stop the application
2. Edit `/config/users.md`
3. Change `member` to `moderator` (or vice versa)
4. Restart the application

```markdown
| olduser@email.com | hash:value | moderator |
```

## Deleting Users

### Manual Deletion

1. Stop the application
2. Edit `/config/users.md` and remove the user's row
3. Optionally delete their profile: `rm /config/profiles/user@email.json`
4. Restart the application

!!! note "Card Ownership"
    Deleted users' cards remain in the system with their ownership markers. Other users still can't edit them, but moderators can.

### Cleanup Orphaned Cards

After deleting a user, their cards still have `[owner:deleted@email.com]`. Options:

1. **Leave as-is**: Cards remain read-only
2. **Moderator reassigns**: Moderator edits cards to change owner
3. **Delete cards**: Remove the `.md` files from the tasks directory

## User Profiles

### Profile Location

```
/config/profiles/<email>.json
```

### Profile Contents

```json
{
  "email": "user@example.com",
  "activityChoice": "Open Radiona",
  "activityProgress": 3,
  "activityTarget": 10,
  "firstLoginCompleted": true
}
```

### View All Profiles (Moderator API)

```bash
curl -b cookies.txt http://localhost:8080/auth/profiles
```

## Session Management

### Active Sessions

Sessions are stored in-memory. There's no built-in way to view active sessions.

### Force Logout (All Users)

Restart the server to clear all sessions:

```bash
docker restart tasks.md
```

### Session Expiry

Sessions expire after 7 days automatically.

## Bulk User Operations

### Import Multiple Users

Create a script:

```bash
#!/bin/bash
while IFS=, read -r email password role; do
  node add-user.js "$email" "$password" "$role"
done < users.csv
```

### Export User List

```bash
grep '|' /config/users.md | tail -n +3 | cut -d'|' -f2 | tr -d ' '
```

## Security Considerations

### Password Policy

Enforce password requirements through your onboarding process. The system accepts any password.

### Moderator Access

Limit moderator accounts. Moderators can:

- Read all task content
- Modify any user's work
- View all user profiles

### Audit Trail

Tasks.md doesn't maintain an audit log. For compliance needs, consider:

- Git versioning the tasks directory
- External logging of API requests
- Periodic backups with timestamps

## Troubleshooting

### "User already exists"

The email is already in the system. To update password, run the command again.

### "Invalid email format"

Email must contain `@` and a domain.

### User Can't Log In

1. Verify email spelling (case-sensitive)
2. Reset password with CLI
3. Check for special characters in password
