# Progress Tracking

Track your progress toward completing your membership activity with visual progress bars.

## Progress Display

Your activity card shows a progress bar indicating completion:

![Progress Tracking](../screenshots/progress-tracking.png)

## Progress Bar Components

| Element | Description |
|---------|-------------|
| **Progress Bar** | Visual fill showing % complete |
| **Count Display** | "X / Y completed" (e.g., "3/10") |
| **+1 Button** | Increment your progress |

## Incrementing Progress

### Using the +1 Button

1. Find your activity task card
2. Click the **+1** button
3. Progress increments by one
4. Progress bar updates immediately

### When to Increment

Increment your progress when you:

- **Open Radiona**: After each session you host
- **Organise Meetup**: After each event is complete
- **Create Art Work**: When your project is finished (single increment)

!!! warning "Honor System"
    Progress tracking is self-reported. Please only increment when you've genuinely completed the activity.

## Progress Visibility

### Your View

- You see the +1 button on your own activity card
- You can increment at any time

### Other Members

- Can see your progress bar (read-only)
- Cannot increment your progress
- Cannot edit your activity card

### Moderators

- Can view all member progress
- Can see detailed profiles at `/auth/profiles`
- Cannot increment on your behalf through UI

## Progress Storage

Progress is stored in your user profile:

```
/config/profiles/yourname@email.json
```

Example profile:
```json
{
  "email": "yourname@email.com",
  "activityChoice": "Open Radiona",
  "activityProgress": 3,
  "activityTarget": 10,
  "firstLoginCompleted": true
}
```

## Completion

### When You Reach Target

- Progress bar shows 100%
- +1 button is hidden
- Card can be moved to "Done" lane

### Celebrating Completion

When you complete your activity:

1. The progress shows as fully complete
2. Move the card to your "Done" lane (if you have one)
3. Your membership commitment is fulfilled!

## Progress States

| State | Display | Actions |
|-------|---------|---------|
| **Not Started** | `0 / X completed` | +1 visible |
| **In Progress** | `N / X completed` | +1 visible |
| **Complete** | `X / X completed` | +1 hidden |

## Syncing

Progress syncs automatically:

- Increments are saved immediately
- Profile data persists across sessions
- Page refresh shows current progress

## Troubleshooting

### +1 Button Not Showing

1. **Not your card**: You can only increment your own progress
2. **Already complete**: Button hides when target is reached
3. **Wrong card type**: Only activity cards have progress

### Progress Not Saving

1. Check network connection
2. Refresh the page
3. Contact admin if issue persists

### Progress Incorrect

If your progress count is wrong:

1. Contact a moderator
2. They can manually adjust profile data
3. Or use [Reset Selection](reset-selection.md) to start over

## Best Practices

### Track Honestly

Only increment when you've genuinely completed an activity instance. The system is based on trust.

### Track Promptly

Increment your progress soon after completing an activity so you don't forget.

### Keep Evidence

Consider keeping notes or photos of your activities in case verification is needed.

## For Moderators

### Viewing All Progress

Access all member profiles:

```
GET /auth/profiles
```

Response includes all member progress data.

### Manual Adjustments

Edit profile JSON directly if corrections are needed:

```bash
# Edit user's profile
nano /config/profiles/user@email.json
```

Restart the server after manual edits.
