# API Endpoints

Tasks.md exposes a REST API for programmatic access.

## Authentication

All endpoints except `/auth/login`, `/auth/status`, and `/title` require authentication via session cookie.

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

**Response (Success)**:
```json
{
  "user": {
    "email": "user@example.com",
    "role": "member"
  }
}
```

**Response (Failure)**:
```json
{
  "error": "Invalid credentials"
}
```

### Logout

```http
POST /auth/logout
```

### Check Status

```http
GET /auth/status
```

**Response (Authenticated)**:
```json
{
  "authenticated": true,
  "user": {
    "email": "user@example.com",
    "role": "member"
  }
}
```

**Response (Not Authenticated)**:
```json
{
  "authenticated": false
}
```

## Resource Endpoints

### List Lanes

```http
GET /resource/
```

**Response**:
```json
[
  {
    "name": "Backlog",
    "type": "directory",
    "cards": [...]
  },
  {
    "name": "In Progress",
    "type": "directory",
    "cards": [...]
  }
]
```

### Get Lane Contents

```http
GET /resource/Backlog
```

**Response**:
```json
{
  "name": "Backlog",
  "cards": [
    {
      "name": "Task 1",
      "content": "# Task 1\n\nDescription here..."
    }
  ]
}
```

### Get Card

```http
GET /resource/Backlog/Task%201.md
```

**Response**:
```json
{
  "name": "Task 1.md",
  "content": "# Task 1\n\nDescription...\n\n[tag:Feature]\n[owner:user@example.com]"
}
```

### Create Lane

```http
POST /resource/
Content-Type: application/json

{
  "name": "New Lane",
  "type": "directory"
}
```

### Create Card

```http
POST /resource/Backlog
Content-Type: application/json

{
  "name": "New Task.md",
  "content": "# New Task\n\nContent here\n\n[owner:user@example.com]"
}
```

### Update Card

```http
PATCH /resource/Backlog/Task%201.md
Content-Type: application/json

{
  "content": "# Updated Task\n\nNew content...\n\n[tag:Updated]\n[owner:user@example.com]"
}
```

!!! note "Ownership Required"
    You can only update cards you own (unless moderator).

### Delete Card

```http
DELETE /resource/Backlog/Task%201.md
```

!!! warning "Permanent"
    Deletion is permanent. There is no recycle bin.

### Move Card

```http
PATCH /resource/Backlog/Task%201.md
Content-Type: application/json

{
  "newPath": "In Progress/Task 1.md"
}
```

### Rename Card

```http
PATCH /resource/Backlog/Task%201.md
Content-Type: application/json

{
  "newName": "Renamed Task.md"
}
```

## Tags Endpoints

### Get All Tags

```http
GET /tags/
```

**Response**:
```json
{
  "Bug": "#e01b24",
  "Feature": "#33d17a",
  "Urgent": "#ff7800"
}
```

### Update Tag Color

```http
PATCH /tags/Bug
Content-Type: application/json

{
  "color": "#ff0000"
}
```

## Sort Endpoints

### Get Sort Order

```http
GET /sort/
```

**Response**:
```json
{
  "lanes": ["Backlog", "In Progress", "Done"],
  "cards": {
    "Backlog": ["Task 1.md", "Task 2.md"],
    "In Progress": ["Task 3.md"]
  }
}
```

### Update Sort Order

```http
PUT /sort/
Content-Type: application/json

{
  "lanes": ["Done", "In Progress", "Backlog"],
  "cards": {
    "Backlog": ["Task 2.md", "Task 1.md"]
  }
}
```

## Image Upload

### Upload Image

```http
POST /image
Content-Type: application/json

{
  "data": "data:image/png;base64,iVBORw0KGgo..."
}
```

**Response**:
```json
{
  "filename": "a1b2c3d4-5678-90ab-cdef-ghijklmnop.png"
}
```

## Profile Endpoints

### Get Own Profile

```http
GET /auth/profile
```

**Response**:
```json
{
  "email": "user@example.com",
  "activityChoice": "Open Radiona",
  "activityProgress": 3,
  "activityTarget": 10,
  "firstLoginCompleted": true
}
```

### Update Profile

```http
PATCH /auth/profile
Content-Type: application/json

{
  "activityProgress": 4
}
```

### Get All Profiles (Moderator Only)

```http
GET /auth/profiles
```

**Response**:
```json
[
  {
    "email": "user1@example.com",
    "activityChoice": "Open Radiona",
    "activityProgress": 3,
    "activityTarget": 10
  },
  {
    "email": "user2@example.com",
    "activityChoice": "Organise Meetup",
    "activityProgress": 1,
    "activityTarget": 2
  }
]
```

## Title Endpoint

### Get Application Title

```http
GET /title
```

**Response**:
```json
{
  "title": "Radiona Tasks"
}
```

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Not authenticated"
}
```

### 403 Forbidden

```json
{
  "error": "Cannot edit cards owned by others"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Server Error

```json
{
  "error": "Internal server error"
}
```

## cURL Examples

### Full Workflow

```bash
# Login and save cookies
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}' \
  -c cookies.txt

# List lanes
curl -b cookies.txt http://localhost:8080/resource/

# Create a card
curl -X POST http://localhost:8080/resource/Backlog \
  -H "Content-Type: application/json" \
  -d '{"name":"New Task.md","content":"# New Task\n\n[owner:user@example.com]"}' \
  -b cookies.txt

# Update the card
curl -X PATCH http://localhost:8080/resource/Backlog/New%20Task.md \
  -H "Content-Type: application/json" \
  -d '{"content":"# Updated\n\n[owner:user@example.com]"}' \
  -b cookies.txt

# Logout
curl -X POST http://localhost:8080/auth/logout -b cookies.txt
```
