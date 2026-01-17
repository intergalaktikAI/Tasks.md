const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  page.on('response', async response => {
    const url = response.url();
    if (url.includes('_api')) {
      try {
        const text = await response.text();
        console.log(`API ${response.status()} ${url.split('_api')[1]} => ${text.substring(0, 100)}`);
      } catch (e) {}
    }
  });

  console.log('=== Step 1: Load page ===\n');
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n=== Step 2: Login ===\n');
  await page.type('input[type="email"]', 'member@radiona.org');
  await page.type('input[type="password"]', 'member123');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 3000));

  let text = await page.evaluate(() => document.body.innerText);
  if (text.includes('Welcome to Radiona')) {
    console.log('\n=== Step 3: Select activity ===\n');

    // Click option using evaluate for better event handling
    await page.evaluate(() => {
      const options = document.querySelectorAll('.activity-option');
      for (const opt of options) {
        if (opt.textContent.includes('Open Radiona')) {
          opt.click();
          console.log('Clicked option');
          break;
        }
      }
    });
    await new Promise(r => setTimeout(r, 1000));

    // Check button state
    const btnInfo = await page.evaluate(() => {
      const btn = document.querySelector('.first-login-confirm');
      return { disabled: btn?.disabled, text: btn?.textContent, exists: !!btn };
    });
    console.log('Button info:', btnInfo);

    // Click confirm using evaluate
    console.log('\nClicking confirm via evaluate...');
    await page.evaluate(() => {
      const btn = document.querySelector('.first-login-confirm');
      if (btn && !btn.disabled) {
        console.log('Triggering click on confirm button');
        btn.click();
      }
    });

    console.log('Waiting for response...');
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log('\n=== Final check ===\n');
  text = await page.evaluate(() => document.body.innerText);
  console.log('Page now shows:', text.substring(0, 200));

  const fs = require('fs');
  try {
    const lanes = fs.readdirSync('/app/Tasks.md/backend/tasks');
    console.log('Lanes:', lanes);
    if (lanes.includes('Membership')) {
      console.log('Tasks:', fs.readdirSync('/app/Tasks.md/backend/tasks/Membership'));
    }
  } catch (e) {
    console.log('No tasks yet');
  }

  await browser.close();
})();
