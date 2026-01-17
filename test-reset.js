const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Capture console
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));

  // Test with member user (who already has a selection)
  console.log('Testing with member@radiona.org...');

  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });

  // Wait for login page
  await page.waitForSelector('input[type="email"]', { timeout: 5000 });

  // Fill login form
  await page.type('input[type="email"]', 'member@radiona.org');
  await page.type('input[type="password"]', 'member123');
  await page.click('button[type="submit"]');

  // Wait for either first login modal or main board
  await page.waitForFunction(() => {
    return document.querySelector('.first-login-modal') || document.querySelector('.app-header');
  }, { timeout: 10000 });

  // Check if first login modal appears
  const firstLoginModal = await page.$('.first-login-modal');
  if (firstLoginModal) {
    console.log('First login modal detected - selecting activity...');
    // Select first activity
    const activities = await page.$$('.first-login-modal__option');
    if (activities.length > 0) {
      await activities[0].click();
      await page.waitForSelector('.app-header', { timeout: 10000 });
    }
  }

  // Wait for the header to load fully
  await page.waitForSelector('.user-info', { timeout: 10000 });

  // Check for Reset Selection button
  const resetBtn = await page.$('.user-info__reset');
  if (resetBtn) {
    console.log('SUCCESS: Reset Selection button found!');

    // Get button text
    const btnText = await page.$eval('.user-info__reset', el => el.textContent);
    console.log('Button text:', btnText);

    // Set up dialog handler to accept confirm
    page.on('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      await dialog.accept();
    });

    // Click reset button
    console.log('Clicking Reset Selection button...');
    await resetBtn.click();

    // Wait for first login modal to appear
    await page.waitForSelector('.first-login-modal', { timeout: 10000 });
    console.log('SUCCESS: First login modal appeared after reset!');

    // Take screenshot
    await page.screenshot({ path: '/tmp/reset-success.png' });
    console.log('Screenshot saved to /tmp/reset-success.png');
  } else {
    console.log('Reset Selection button not found - user may not have a profile yet');

    // Take screenshot for debugging
    await page.screenshot({ path: '/tmp/no-reset-btn.png' });
    console.log('Screenshot saved to /tmp/no-reset-btn.png');

    // Show page content for debugging
    const userInfo = await page.$('.user-info');
    if (userInfo) {
      const html = await page.$eval('.user-info', el => el.innerHTML);
      console.log('User info HTML:', html);
    }
  }

  await browser.close();
  console.log('Test completed!');
})();
