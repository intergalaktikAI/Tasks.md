# Roles & Permissions

Tasks.md uses a simple two-role permission system.

## Role Overview

| Role | Count | Purpose |
|------|-------|---------|
| `member` | Many | Regular users who manage their own tasks |
| `moderator` | Few | Administrators who oversee the board |

## Permission Matrix

| Action | Member | Moderator |
|--------|--------|-----------|
| View all cards | ✅ | ✅ |
| Create cards | ✅ | ✅ |
| Edit own cards | ✅ | ✅ |
| Delete own cards | ✅ | ✅ |
| Edit others' cards | ❌ | ✅ |
| Delete others' cards | ❌ | ✅ |
| Sort controls | ❌ | ✅ |
| Filter controls | ❌ | ✅ |
| View mode toggle | ❌ | ✅ |
| View all profiles | ❌ | ✅ |
| Track own progress | ✅ | ✅ |

## Member Role

### Capabilities

Members can:

- **View the entire board**: See all lanes and cards
- **Create cards**: New cards are automatically owned by creator
- **Manage own cards**: Edit, rename, delete, move
- **Track progress**: Use +1 button on activity card
- **Reset activity**: Choose a different membership activity

### Restrictions

Members cannot:

- Edit cards owned by others
- Access admin sorting/filtering
- View other users' profile data
- Change system configuration

### UI Experience

Members see a **simplified header** without:

- Sort dropdown
- Filter options
- View mode toggle

This reduces clutter and prevents accidental changes.

## Moderator Role

### Capabilities

Moderators have full access:

- **Everything members can do**
- **Edit any card**: Regardless of owner
- **Admin controls**: Sort, filter, view modes
- **View profiles**: Access `/auth/profiles` API
- **Manage the board**: Create/delete lanes, organize cards

### Use Cases

Moderators typically:

- Set up initial board structure
- Help members with stuck tasks
- Monitor overall progress
- Resolve conflicts
- Clean up abandoned cards

### UI Experience

Moderators see the **full header** with:

- Sort dropdown (Manual, Title, Due Date, Created)
- Filter button
- View mode toggle (Board/List)

## Card Ownership

### How Ownership Works

When a card is created, the creator's email is stored:

```markdown
[owner:creator@email.com]
```

This marker determines who can edit the card.

### Ownership Checks

| Who | Owns Card? | Can Edit? |
|-----|-----------|-----------|
| Creator | Yes | Yes |
| Other member | No | No |
| Moderator | No | Yes (override) |

### Transferring Ownership

To change card ownership:

1. Moderator opens the card
2. Changes `[owner:old@email.com]` to `[owner:new@email.com]`
3. Saves the card

The new owner now has edit rights.

## Best Practices

### Member Count

- **Many members**: Each manages their own tasks
- **Few moderators**: 1-3 for a typical organization

### Moderator Selection

Choose moderators who:

- Understand the organization's workflow
- Can be trusted with all task data
- Will help members, not micromanage

### Shared Accountability

Even though moderators *can* edit everything, they should:

- Respect members' ownership
- Only intervene when necessary
- Document any changes they make

## Special Scenarios

### Orphaned Cards

When a user is deleted, their cards remain with ownership markers. Options:

1. Leave cards as "read-only" forever
2. Moderator transfers ownership
3. Moderator deletes cards

### Promoting to Moderator

1. Edit `/config/users.md`
2. Change `member` to `moderator`
3. Restart the server

### Demoting a Moderator

Same process, change `moderator` to `member`.

!!! warning "Active Sessions"
    Role changes take effect on next login. To force immediately, restart the server to clear sessions.

## Security Considerations

### Moderator Trust

Moderators can:

- Read all task content (potentially sensitive)
- Modify any user's work
- View all user email addresses

Only grant moderator access to trusted individuals.

### No Granular Permissions

There's no middle ground between member and moderator. If you need:

- "Team lead who can edit their team's cards"
- "Read-only viewer role"
- "Lane-specific permissions"

These would require code modifications.

### Audit Trail

Consider implementing external logging if you need to track who changed what. Tasks.md doesn't maintain an audit log.

## API Permissions

| Endpoint | Member | Moderator |
|----------|--------|-----------|
| `GET /resource/*` | ✅ | ✅ |
| `POST /resource/*` | ✅ | ✅ |
| `PATCH /resource/*` | Own only | ✅ |
| `DELETE /resource/*` | Own only | ✅ |
| `GET /auth/profile` | Own | Own |
| `GET /auth/profiles` | ❌ | ✅ |
