# Tags & Due Dates

Tags and due dates help you organize and prioritize your tasks.

## Tags

### What Are Tags?

Tags are colored labels that categorize your cards. They appear as small badges on the card.

### Adding Tags

#### Via Editor

1. Open the card
2. Type `[tag:YourTagName]` anywhere in the content
3. The tag will appear on the card

#### Via Quick Add

Some interfaces provide a tag picker - click the tag icon and select or create a tag.

### Tag Syntax

```markdown
[tag:Bug]
[tag:Feature Request]
[tag:Urgent]
[tag:Membership]
```

!!! tip "Multiple Tags"
    You can add as many tags as you want to a single card.

### Tag Colors

Tags are automatically assigned colors when first created. Colors are stored in `/config/tags.json`:

```json
{
  "Bug": "#e01b24",
  "Feature": "#33d17a",
  "Urgent": "#ff7800",
  "Membership": "#62a0ea"
}
```

### Available Colors

| Color Variable | Hex Code | Usage |
|---------------|----------|-------|
| `color-alt-1` | `#e01b24` | Red - errors, urgent |
| `color-alt-2` | `#ff7800` | Orange - warnings |
| `color-alt-3` | `#f6d32d` | Yellow - attention |
| `color-alt-4` | `#33d17a` | Green - success |
| `color-alt-5` | `#62a0ea` | Blue - info |
| `color-alt-6` | `#9141ac` | Purple - special |
| `color-alt-7` | `#986a44` | Brown - misc |

### Changing Tag Colors

1. Open any card with the tag
2. Click on the tag
3. Select a new color from the picker

The color change applies to **all cards** with that tag.

### Removing Tags

1. Open the card in the editor
2. Delete the `[tag:Name]` text
3. Save the card

### Filtering by Tag

!!! note "Moderator Feature"
    Tag filtering is only available to moderators.

1. Click the filter dropdown in the header
2. Select the tag(s) to filter by
3. Only cards with those tags are shown

## Due Dates

### What Are Due Dates?

Due dates indicate when a task should be completed. They appear on the card with color coding based on urgency.

### Adding a Due Date

#### Via Editor

Add this marker anywhere in the card content:

```markdown
[due:2024-12-31]
```

#### Date Format

Use ISO format: `YYYY-MM-DD`

- Valid: `[due:2024-12-31]`
- Invalid: `[due:12/31/2024]` or `[due:Dec 31, 2024]`

### Due Date Colors

| Status | Color | Description |
|--------|-------|-------------|
| **Overdue** | Red | Date has passed |
| **Due Today** | Yellow | Due today |
| **Upcoming** | Default | Future date |

### Removing Due Dates

1. Open the card in the editor
2. Delete the `[due:DATE]` text
3. Save the card

### Sorting by Due Date

!!! note "Moderator Feature"
    Sorting options are only available to moderators.

1. Click the sort dropdown in the header
2. Select "Due Date"
3. Cards are sorted with nearest due date first

## Combining Tags and Due Dates

A typical card might look like:

```markdown
# Implement User Authentication

## Requirements
- Login page
- Session management
- Password hashing

## Notes
Need to review security best practices first.

[tag:Feature]
[tag:Backend]
[due:2024-01-15]
[owner:dev@example.com]
```

This card has:
- Two tags: Feature, Backend
- Due date: January 15, 2024
- Owner: dev@example.com

## Best Practices

### Tag Naming

- Keep tag names short and descriptive
- Use consistent casing (e.g., always Title Case)
- Create a tag taxonomy for your team:
  - Type: Bug, Feature, Improvement
  - Priority: Urgent, High, Low
  - Area: Frontend, Backend, DevOps

### Due Date Usage

- Set realistic due dates
- Update dates when priorities change
- Use due dates for deadlines, not start dates

### Example Tag System

| Category | Tags |
|----------|------|
| **Type** | Bug, Feature, Task, Research |
| **Priority** | Urgent, High, Medium, Low |
| **Status** | Blocked, Waiting, Review |
| **Membership** | Membership (for activity tasks) |
