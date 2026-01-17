---
theme: seriph
background: https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Tasks.md
  Membership Management Made Simple

  A self-hosted, Markdown-based task management solution for NGOs and makerspaces.
drawings:
  persist: false
transition: slide-left
title: Tasks.md - Membership Management Made Simple
mdc: true
---

# Tasks.md

## Membership Management Made Simple

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Self-hosted • Privacy-first • Open Source
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/BaldissaraMatheus/Tasks.md" target="_blank"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
Welcome! Today I'm excited to present Tasks.md - a revolutionary approach to membership management for NGOs, makerspaces, and community organizations.
-->

---
layout: two-cols
---

# The Problem

<v-clicks>

- 📊 **Spreadsheet chaos** - tracking members in Excel
- 💸 **Expensive SaaS** - monthly fees add up
- 🔒 **Privacy concerns** - member data on third-party servers
- 🤯 **Complexity** - enterprise tools are overkill
- 📱 **No mobile access** - can't check tasks on the go

</v-clicks>

::right::

<div class="ml-4 mt-12">

```
┌──────────────────────────┐
│    members_2024.xlsx     │
├──────────────────────────┤
│ "Who updated this?"      │
│ "Where's the backup?"    │
│ "Wait, v2 or v3?"        │
│ "VLOOKUP error #REF!"    │
└──────────────────────────┘
```

<div class="mt-8 text-center text-6xl">
  😱
</div>

</div>

<!--
Sound familiar? Every organization faces these challenges. Spreadsheets become unmaintainable, SaaS tools drain budgets, and member data ends up who-knows-where.
-->

---
layout: center
class: text-center
---

# The Solution

<div class="text-6xl mb-8">
  📋 Tasks.md
</div>

<div class="grid grid-cols-3 gap-8 mt-12">
  <div>
    <div class="text-4xl mb-4">🏠</div>
    <h3>Self-Hosted</h3>
    <p class="text-sm opacity-75">Your data stays on your server</p>
  </div>
  <div>
    <div class="text-4xl mb-4">📝</div>
    <h3>Markdown Files</h3>
    <p class="text-sm opacity-75">No database lock-in</p>
  </div>
  <div>
    <div class="text-4xl mb-4">🆓</div>
    <h3>100% Free</h3>
    <p class="text-sm opacity-75">Open source forever</p>
  </div>
</div>

<!--
Tasks.md is the answer. A self-hosted, Markdown-based task management board that puts you in control.
-->

---
layout: image-right
image: /screenshots/board-overview.png
---

# Beautiful Kanban Board

<v-clicks>

- **Intuitive lanes** - organize tasks by status
- **Drag & drop** - move tasks effortlessly
- **Responsive design** - works on any device
- **Dark mode** - easy on the eyes
- **Customizable themes** - Adwaita, Nord, Catppuccin

</v-clicks>

<div class="mt-8">

```
📁 tasks/
├── 📂 Backlog/
│   └── 📄 Feature idea.md
├── 📂 In Progress/
│   └── 📄 Working on it.md
└── 📂 Done/
    └── 📄 Completed.md
```

</div>

<!--
The interface is clean and familiar. Each lane is a folder, each card is a Markdown file. Simple as that.
-->

---

# Multi-User Authentication

<div class="grid grid-cols-2 gap-8">
<div>

### Secure Login System

<v-clicks>

- 📧 Email + password authentication
- 🔐 PBKDF2-SHA512 password hashing
- 🍪 7-day session management
- 👤 Card ownership tracking

</v-clicks>

</div>
<div>

### Role-Based Access

| Role | Permissions |
|------|-------------|
| **Member** | Edit own cards |
| **Moderator** | Edit all cards |

<v-click>

```bash
# Add users easily
node add-user.js admin@org.com pass moderator
node add-user.js member@org.com pass
```

</v-click>

</div>
</div>

<!--
Security matters. Tasks.md includes a complete authentication system with role-based permissions.
-->

---
layout: center
---

# Membership Activity Selection

<div class="text-center mb-8">
  <span class="text-2xl">First login? Choose your contribution path.</span>
</div>

<div class="grid grid-cols-3 gap-6">
  <div class="border-2 border-blue-400 rounded-lg p-6 text-center hover:border-green-400 transition">
    <div class="text-5xl mb-4">🚪</div>
    <h3 class="text-xl font-bold">Open Radiona</h3>
    <p class="text-gray-400">10 times</p>
    <p class="text-sm mt-2 opacity-75">Host the space for the community</p>
  </div>
  <div class="border-2 border-blue-400 rounded-lg p-6 text-center hover:border-green-400 transition">
    <div class="text-5xl mb-4">🎤</div>
    <h3 class="text-xl font-bold">Organise Meetup</h3>
    <p class="text-gray-400">2 times</p>
    <p class="text-sm mt-2 opacity-75">Plan and run community events</p>
  </div>
  <div class="border-2 border-blue-400 rounded-lg p-6 text-center hover:border-green-400 transition">
    <div class="text-5xl mb-4">🎨</div>
    <h3 class="text-xl font-bold">Create Art Work</h3>
    <p class="text-gray-400">1 time</p>
    <p class="text-sm mt-2 opacity-75">Contribute creative work</p>
  </div>
</div>

<!--
The killer feature for NGOs: activity selection on first login. Members choose how they'll contribute, and the system tracks their progress.
-->

---

# Progress Tracking

<div class="grid grid-cols-2 gap-8">
<div>

### Visual Progress Bars

<v-clicks>

- 📊 See completion at a glance
- ➕ **+1 button** to log activities
- 🎯 Clear targets (e.g., 3/10)
- 📱 Mobile-friendly interface

</v-clicks>

<div class="mt-8">

```markdown
# Open Radiona - 10x required

**Progress:** 3 / 10 completed
████████░░░░░░░░░░░░ 30%

[+1]
```

</div>

</div>
<div class="flex items-center justify-center">

<div class="text-center">
  <div class="text-8xl mb-4">📈</div>
  <p class="text-xl">Members track their own progress</p>
  <p class="text-gray-400">Moderators can view all</p>
</div>

</div>
</div>

<!--
Progress tracking is built-in. Members see their progress, stay motivated, and moderators can monitor overall membership health.
-->

---
layout: two-cols
---

# File-Based Architecture

<v-clicks>

### Your Data, Your Way

- 📂 Lanes = Directories
- 📄 Cards = Markdown files
- 🔍 grep, find, sed - just work
- 📦 Git version control ready
- 💾 Easy backup (just copy files!)

</v-clicks>

::right::

<div class="ml-8 mt-4">

```markdown
# Task Title

Regular **markdown** content!

## Subtasks
- [ ] First item
- [x] Done item

---

[tag:Feature]
[tag:Urgent]
[due:2024-12-31]
[owner:user@email.com]
```

<v-click>

<div class="mt-4 p-4 bg-green-900 rounded-lg">
  <strong>No vendor lock-in!</strong><br>
  Open in VS Code, Obsidian, or any editor.
</div>

</v-click>

</div>

<!--
This is the magic: everything is just files. No proprietary database. Open your tasks in any Markdown editor. Back them up with a simple copy command.
-->

---

# Keyboard Navigation

<div class="text-center mb-8">
  <span class="text-3xl">⌨️ Vim-style shortcuts for power users</span>
</div>

<div class="grid grid-cols-2 gap-8">
<div>

### Navigation

| Key | Action |
|-----|--------|
| `h j k l` | Navigate cards |
| `↑ ↓ ← →` | Arrow keys work too |
| `?` | Show help |

</div>
<div>

### Actions

| Key | Action |
|-----|--------|
| `Enter` | Open card |
| `n` | New card |
| `d` | Delete |
| `Alt+←→` | Move card |

</div>
</div>

<div class="mt-8 text-center">
  <span class="text-xl opacity-75">No mouse required! 🖱️❌</span>
</div>

<!--
For keyboard enthusiasts: vim-style navigation. hjkl to navigate, Enter to edit, n to create. Your hands never leave the keyboard.
-->

---
layout: center
---

# Installation

<div class="text-center mb-8">
  <span class="text-3xl">🐳 One command to rule them all</span>
</div>

```bash {all|1-8|all}
docker run -d \
  --name tasks.md \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TITLE="Radiona Tasks" \
  -p 8080:8080 \
  -v /path/to/tasks:/tasks \
  -v /path/to/config:/config \
  baldissaramatheus/tasks.md
```

<v-click>

<div class="mt-8 grid grid-cols-3 gap-4 text-center">
  <div>
    <div class="text-4xl">⚡</div>
    <p>30 seconds to deploy</p>
  </div>
  <div>
    <div class="text-4xl">💾</div>
    <p>~50MB image</p>
  </div>
  <div>
    <div class="text-4xl">🔄</div>
    <p>Auto-restart enabled</p>
  </div>
</div>

</v-click>

<!--
Deployment couldn't be simpler. One Docker command and you're running. No database setup, no complex configuration.
-->

---

# Why Organizations Love It

<div class="grid grid-cols-2 gap-12 mt-8">
<div>

### For NGOs & Makerspaces

<v-clicks>

- ✅ Track membership activities
- ✅ No recurring costs
- ✅ Member privacy protected
- ✅ Works offline
- ✅ Mobile-friendly PWA

</v-clicks>

</div>
<div>

### For IT Admins

<v-clicks>

- ✅ Single Docker container
- ✅ No database to maintain
- ✅ Easy backup/restore
- ✅ Reverse proxy ready
- ✅ Open source codebase

</v-clicks>

</div>
</div>

<v-click>

<div class="mt-12 text-center p-6 bg-blue-900 rounded-lg">
  <span class="text-2xl">💰 Cost: $0/month, forever</span>
</div>

</v-click>

<!--
Organizations save money, protect member privacy, and get a tool that just works. IT teams love the simplicity.
-->

---

# Radiona Case Study

<div class="grid grid-cols-2 gap-8">
<div>

### The Challenge

<v-clicks>

- 50+ active members
- Multiple contribution types
- Manual tracking nightmare
- No centralized system

</v-clicks>

</div>
<div>

### The Solution

<v-clicks>

- ✅ Members choose activity on first login
- ✅ Progress bars show completion
- ✅ Personal lanes per member
- ✅ Moderators track overall health

</v-clicks>

</div>
</div>

<v-click>

<div class="mt-8 p-6 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg text-center">
  <span class="text-xl">"Finally, a system that matches how we actually work!"</span>
  <p class="mt-2 opacity-75">— Radiona Membership Committee</p>
</div>

</v-click>

<!--
Radiona was our first deployment. The feedback has been incredible - members love the simplicity, moderators love the visibility.
-->

---

# Roadmap

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="p-4 border border-green-400 rounded-lg">
  <div class="text-green-400 font-bold mb-2">✅ Completed</div>
  <ul class="text-sm">
    <li>Multi-user auth</li>
    <li>Activity selection</li>
    <li>Progress tracking</li>
    <li>Keyboard navigation</li>
    <li>PWA support</li>
  </ul>
</div>
<div class="p-4 border border-yellow-400 rounded-lg">
  <div class="text-yellow-400 font-bold mb-2">🚧 In Progress</div>
  <ul class="text-sm">
    <li>Email notifications</li>
    <li>Activity reports</li>
    <li>Custom activity types</li>
  </ul>
</div>
<div class="p-4 border border-blue-400 rounded-lg">
  <div class="text-blue-400 font-bold mb-2">🔮 Planned</div>
  <ul class="text-sm">
    <li>Calendar integration</li>
    <li>Member directory</li>
    <li>API webhooks</li>
    <li>Mobile app</li>
  </ul>
</div>
</div>

<!--
The product is mature and stable, with exciting features on the roadmap. Your feedback shapes our priorities.
-->

---
layout: center
class: text-center
---

# Get Started Today

<div class="text-6xl mb-8">🚀</div>

<div class="grid grid-cols-2 gap-8 mb-8">
<div class="p-6 border border-blue-400 rounded-lg">
  <h3 class="text-xl font-bold mb-2">Self-Hosted</h3>
  <p class="text-sm opacity-75 mb-4">Deploy on your own server</p>

```bash
docker run -d \
  -p 8080:8080 \
  baldissaramatheus/tasks.md
```

</div>
<div class="p-6 border border-green-400 rounded-lg">
  <h3 class="text-xl font-bold mb-2">Source Code</h3>
  <p class="text-sm opacity-75 mb-4">Customize everything</p>

```bash
git clone --recursive \
  github.com/BaldissaraMatheus/Tasks.md
```

</div>
</div>

<a href="https://github.com/BaldissaraMatheus/Tasks.md" target="_blank" class="text-2xl">
  github.com/BaldissaraMatheus/Tasks.md
</a>

<!--
Two ways to get started: Docker for quick deployment, source code for customization. Both are free, forever.
-->

---
layout: center
class: text-center
---

# Questions?

<div class="text-8xl mb-8">🤔</div>

<div class="grid grid-cols-3 gap-8 mt-8">
  <div>
    <carbon-logo-github class="text-4xl mb-2" />
    <p class="text-sm">GitHub Issues</p>
  </div>
  <div>
    <carbon-document class="text-4xl mb-2" />
    <p class="text-sm">Documentation</p>
  </div>
  <div>
    <carbon-email class="text-4xl mb-2" />
    <p class="text-sm">Contact Us</p>
  </div>
</div>

<div class="mt-12 text-xl opacity-75">
  Let's make membership management simple!
</div>

<!--
I'm happy to answer any questions. Let's discuss how Tasks.md can help your organization!
-->

---
layout: end
---

# Thank You!

<div class="text-center">
  <div class="text-6xl mb-4">📋</div>
  <h2 class="text-3xl">Tasks.md</h2>
  <p class="text-xl opacity-75">Membership Management Made Simple</p>

  <div class="mt-8">
    <a href="https://github.com/BaldissaraMatheus/Tasks.md" target="_blank" class="text-blue-400">
      github.com/BaldissaraMatheus/Tasks.md
    </a>
  </div>
</div>
