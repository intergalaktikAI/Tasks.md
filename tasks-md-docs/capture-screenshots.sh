#!/bin/bash
# Screenshot capture script for Tasks.md documentation
# Run this from your host machine with playwright installed

SCREENSHOT_DIR="/tmp/tasks-md-docs/screenshots"
APP_URL="http://localhost:8080"

mkdir -p "$SCREENSHOT_DIR"

echo "📸 Capturing Tasks.md screenshots..."

# Check if playwright is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Install Node.js first."
    exit 1
fi

# Install playwright if needed
echo "Installing playwright browsers..."
npx playwright install chromium 2>/dev/null

# Create capture script
cat > /tmp/capture.mjs << 'SCRIPT'
import { chromium } from 'playwright';

const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || '/tmp/tasks-md-docs/screenshots';
const APP_URL = process.env.APP_URL || 'http://localhost:8080';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('📸 Capturing login page...');
  await page.goto(APP_URL);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${SCREENSHOT_DIR}/login.png` });
  console.log('✅ login.png');

  // Try to log in (you may need to adjust credentials)
  try {
    // Check if we're on login page
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await page.fill('input[type="email"]', 'admin@radiona.org');
      await page.fill('input[type="password"]', 'admin');
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      console.log('📸 Capturing board overview...');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/board-overview.png` });
      console.log('✅ board-overview.png');

      // Try to capture keyboard help
      console.log('📸 Capturing keyboard shortcuts...');
      await page.keyboard.press('?');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${SCREENSHOT_DIR}/keyboard-help.png` });
      console.log('✅ keyboard-help.png');
      await page.keyboard.press('Escape');

      // Try clicking a card
      const cards = await page.$$('.card');
      if (cards.length > 0) {
        console.log('📸 Capturing card detail...');
        await cards[0].click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `${SCREENSHOT_DIR}/card-detail.png` });
        console.log('✅ card-detail.png');
      }
    }
  } catch (e) {
    console.log('⚠️ Could not capture authenticated views:', e.message);
    console.log('   You may need to add a user first: node backend/add-user.js admin@radiona.org admin moderator');
  }

  await browser.close();
  console.log('');
  console.log('🎉 Screenshots saved to:', SCREENSHOT_DIR);
  console.log('   Copy them to doc/docs/screenshots/ and slides/public/screenshots/');
}

capture().catch(console.error);
SCRIPT

# Run the capture script
SCREENSHOT_DIR="$SCREENSHOT_DIR" APP_URL="$APP_URL" node /tmp/capture.mjs

echo ""
echo "Done! Copy screenshots to documentation folders:"
echo "  cp $SCREENSHOT_DIR/*.png doc/docs/screenshots/"
echo "  mkdir -p slides/public/screenshots && cp $SCREENSHOT_DIR/*.png slides/public/screenshots/"
