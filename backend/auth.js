const fs = require("fs");
const crypto = require("crypto");

// Simple password hashing using Node.js built-in crypto (no external deps)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(":");
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === verifyHash;
}

// Parse users.md file
// Format:
// | Email | Password | Role |
// |-------|----------|------|
// | user@example.com | salt:hash | member |
async function parseUsersFile(configDir) {
  const usersPath = `${configDir}/users.md`;
  try {
    const content = await fs.promises.readFile(usersPath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());

    // Find table rows (skip header and separator)
    const users = [];
    let inTable = false;

    for (const line of lines) {
      if (line.startsWith("|") && line.includes("Email")) {
        inTable = true;
        continue;
      }
      if (line.startsWith("|") && line.includes("---")) {
        continue;
      }
      if (inTable && line.startsWith("|")) {
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell);
        if (cells.length >= 3) {
          users.push({
            email: cells[0].toLowerCase(),
            password: cells[1],
            role: cells[2] || "member",
          });
        }
      }
    }
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

// Save users back to users.md
async function saveUsersFile(configDir, users, puid, pgid) {
  const usersPath = `${configDir}/users.md`;
  let content = "# Users\n\n";
  content += "| Email | Password | Role |\n";
  content += "|-------|----------|------|\n";

  for (const user of users) {
    content += `| ${user.email} | ${user.password} | ${user.role} |\n`;
  }

  await fs.promises.writeFile(usersPath, content);
  if (puid && pgid) {
    await fs.promises.chown(usersPath, puid, pgid);
  }
}

// Find user by email
async function findUser(configDir, email) {
  const users = await parseUsersFile(configDir);
  return users.find((u) => u.email === email.toLowerCase());
}

// Authenticate user
async function authenticateUser(configDir, email, password) {
  const user = await findUser(configDir, email);
  if (!user) {
    return null;
  }
  if (verifyPassword(password, user.password)) {
    return { email: user.email, role: user.role };
  }
  return null;
}

// Simple session management using signed cookies
const sessions = new Map();

function createSession(user) {
  const sessionId = crypto.randomBytes(32).toString("hex");
  sessions.set(sessionId, {
    user,
    createdAt: Date.now(),
  });
  return sessionId;
}

function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) {
    return null;
  }
  // Session expires after 7 days
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - session.createdAt > maxAge) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

function deleteSession(sessionId) {
  sessions.delete(sessionId);
}

// Auth middleware
function authMiddleware(configDir) {
  return async (ctx, next) => {
    const sessionId = ctx.cookies.get("session");

    if (sessionId) {
      const session = getSession(sessionId);
      if (session) {
        ctx.state.user = session.user;
      }
    }

    // Public routes that don't require auth
    const publicRoutes = ["/auth/login", "/auth/status", "/title"];
    const isPublicRoute = publicRoutes.some((route) =>
      ctx.request.url.startsWith(route)
    );

    if (!ctx.state.user && !isPublicRoute) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }

    await next();
  };
}

module.exports = {
  hashPassword,
  verifyPassword,
  parseUsersFile,
  saveUsersFile,
  findUser,
  authenticateUser,
  createSession,
  getSession,
  deleteSession,
  authMiddleware,
};
