# Login & Authentication

Tasks.md uses email and password authentication with session management.

## Logging In

1. Navigate to the application URL (e.g., `http://localhost:8080`)
2. Enter your email address
3. Enter your password
4. Click **Login**

![Login Page](../screenshots/login.png)

!!! note "First Login"
    If this is your first login, you'll be prompted to select a membership activity. See [Activity Selection](../radiona/activity-selection.md).

## Session Management

### Session Duration

- Sessions last **7 days** by default
- After 7 days, you'll need to log in again
- Sessions are stored in-memory and cleared on server restart

### Staying Logged In

Your session is maintained via a secure cookie. As long as:

- You don't clear your cookies
- The server hasn't restarted
- 7 days haven't passed

You'll remain logged in automatically.

## Logging Out

1. Click the **Logout** button in the top-right header
2. You'll be redirected to the login page
3. Your session is immediately invalidated

![Logout Button Location](../screenshots/board-overview.png)

## Password Requirements

There are no enforced password requirements, but administrators typically set passwords with:

- 8+ characters
- Letters and numbers

!!! warning "Forgot Password?"
    There is no self-service password reset. Contact your administrator to reset your password using the CLI tool.

## Security Features

### Cookie Security

| Setting | Value | Purpose |
|---------|-------|---------|
| `httpOnly` | `true` | Prevents JavaScript access |
| `sameSite` | `lax` | Prevents CSRF attacks |
| `secure` | `false`* | Set `true` for HTTPS |

*Enable `secure` flag when using HTTPS in production.

### Password Storage

Passwords are never stored in plain text:

- Hashed with **PBKDF2-SHA512**
- 100,000 iterations
- Random salt per user

## Troubleshooting

### "Invalid credentials"

- Check that your email is spelled correctly
- Verify caps lock is off
- Contact admin to reset your password

### "Loading..." stuck on login

This can happen if:

- Backend server is not running
- Network connectivity issues
- Cookie blocking by browser extensions

Try:
1. Refresh the page
2. Clear browser cache
3. Check if backend is accessible

### Session expired unexpectedly

Sessions are stored in memory. If the server restarts, all sessions are cleared. Simply log in again.

### Can't see login page

If you see a blank page or error:

1. Check if the server is running: `docker logs tasks.md`
2. Verify the URL is correct
3. Try a different browser
4. Check browser console for errors

## Multiple Devices

You can be logged in from multiple devices simultaneously. Each device has its own session.

## API Authentication

For programmatic access, the auth endpoints are:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | Create session |
| `/auth/logout` | POST | End session |
| `/auth/status` | GET | Check auth status |

Example login request:

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}' \
  -c cookies.txt
```
