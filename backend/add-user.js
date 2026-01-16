#!/usr/bin/env node
/**
 * CLI tool to add users to users.md
 * Usage: node add-user.js <email> <password> [role]
 * Example: node add-user.js admin@radiona.org mypassword moderator
 */

const fs = require("fs");
const auth = require("./auth");

const CONFIG_DIR = process.env.CONFIG_DIR || "config";
const PUID = Number(process.env.PUID || "0");
const PGID = Number(process.env.PGID || "0");

async function main() {
  const [, , email, password, role = "member"] = process.argv;

  if (!email || !password) {
    console.log("Usage: node add-user.js <email> <password> [role]");
    console.log("Roles: member (default), moderator");
    console.log("Example: node add-user.js admin@radiona.org mypassword moderator");
    process.exit(1);
  }

  // Ensure config directory exists
  await fs.promises.mkdir(CONFIG_DIR, { recursive: true });

  // Load existing users
  const users = await auth.parseUsersFile(CONFIG_DIR);

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email.toLowerCase());
  if (existingUser) {
    console.log(`User ${email} already exists. Updating password...`);
    existingUser.password = auth.hashPassword(password);
    existingUser.role = role;
  } else {
    users.push({
      email: email.toLowerCase(),
      password: auth.hashPassword(password),
      role,
    });
  }

  // Save users
  await auth.saveUsersFile(CONFIG_DIR, users, PUID, PGID);
  console.log(`User ${email} added/updated with role: ${role}`);
}

main().catch(console.error);
