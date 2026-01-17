# Adding Users

Tasks.md includes a CLI tool for managing user accounts.

## Using the CLI Tool

### Basic Syntax

```bash
node add-user.js <email> <password> [role]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `email` | User's email address (used for login) | Yes |
| `password` | User's password (will be hashed) | Yes |
| `role` | User role: `member` or `moderator` | No (default: `member`) |

## Adding Users

### Add a Regular Member

```bash
cd backend
node add-user.js john@example.com secretpassword
```

### Add a Moderator

```bash
cd backend
node add-user.js admin@radiona.org adminpass moderator
```

### Docker Users

If running with Docker, execute inside the container:

```bash
docker exec -it tasks.md node /app/backend/add-user.js user@example.com password
```

Or with docker-compose:

```bash
docker-compose exec tasks.md node /app/backend/add-user.js user@example.com password
```

## User Roles

| Role | Permissions |
|------|-------------|
| `member` | Can create cards, edit own cards only |
| `moderator` | Can edit all cards, see admin controls |

!!! info "Role Differences"
    - **Members** see a simplified header without sort/filter controls
    - **Moderators** have full access to all UI controls and can edit any user's cards

## Verification

After adding a user, verify they can log in:

1. Open the application in your browser
2. Enter the email and password
3. Click "Login"

![Login Page](../screenshots/login.png)

## Managing Existing Users

### View All Users

The users are stored in `/config/users.md`. You can view (but not edit) this file:

```bash
cat /path/to/config/users.md
```

Output:
```markdown
# Users

| Email | Password | Role |
|-------|----------|------|
| admin@radiona.org | abc123:def456... | moderator |
| member@example.com | xyz789:uvw321... | member |
```

### Delete a User

Currently, users must be manually removed by editing `/config/users.md`:

1. Stop the application
2. Edit the users file and remove the row
3. Also delete their profile from `/config/profiles/` if it exists
4. Restart the application

!!! warning "Deleting Users"
    When deleting a user:

    - Their profile will remain in `/config/profiles/`
    - Their cards will remain (with ownership markers)
    - Other users still cannot edit their cards

### Reset a User's Password

Run the add-user command with the same email but new password:

```bash
node add-user.js existing@user.com newpassword
```

This will update the existing user's password.

## Bulk User Import

For importing multiple users, create a script:

```bash
#!/bin/bash
cd /path/to/backend

# Read from CSV: email,password,role
while IFS=, read -r email password role; do
  node add-user.js "$email" "$password" "$role"
done < users.csv
```

Example `users.csv`:
```csv
user1@example.com,password1,member
user2@example.com,password2,member
admin@example.com,adminpass,moderator
```

## Security Considerations

### Password Requirements

There are no enforced password requirements, but we recommend:

- Minimum 8 characters
- Mix of letters, numbers, and symbols
- Unique passwords for each user

### Password Storage

Passwords are hashed using:

- **Algorithm**: PBKDF2
- **Hash**: SHA-512
- **Iterations**: 100,000
- **Salt**: Random 16-byte salt per user

The stored format is `salt:hash` where both are hex-encoded.

### Session Management

- Sessions expire after **7 days**
- Sessions are stored in-memory (lost on restart)
- Cookies are `httpOnly` and `sameSite: lax`

## Troubleshooting

### "User already exists"

The user email is already in the system. To update their password, run the command again with the new password.

### "Permission denied"

Make sure you're running the command in the correct directory and have write access to `/config/users.md`.

### "Invalid email format"

The email must be a valid email format (contains `@` and domain).
