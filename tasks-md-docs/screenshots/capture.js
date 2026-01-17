const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Login page
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'login.png' });
  console.log('Captured: login.png');
  
  await browser.close();
  console.log('Done!');
})();
