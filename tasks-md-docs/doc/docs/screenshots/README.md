# Screenshots

This directory should contain the following screenshots from your Tasks.md installation:

## Required Screenshots

| Filename | Description | How to Capture |
|----------|-------------|----------------|
| `login.png` | Login page | Navigate to root URL, not logged in |
| `board-overview.png` | Main board with lanes and cards | Log in, view main board |
| `activity-selection.png` | First-login activity selection modal | Log in as new user or reset selection |
| `card-detail.png` | Card opened in editor | Click on any card |
| `progress-tracking.png` | Card with progress bar and +1 button | View a membership activity card |
| `keyboard-help.png` | Keyboard shortcuts dialog | Press `?` key on board |

## Capture Instructions

### Using Browser DevTools

1. Open the application in Chrome/Firefox
2. Press F12 to open DevTools
3. Click the device toolbar icon (or press Ctrl+Shift+M)
4. Set viewport to 1280x800
5. Press Ctrl+Shift+P → "Capture full size screenshot"

### Using Playwright

```bash
npx playwright screenshot http://localhost:8080 login.png --viewport-size=1280,800
```

### Using Puppeteer

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:8080');
  await page.screenshot({ path: 'login.png' });
  await browser.close();
})();
```

## Recommended Image Settings

- **Format**: PNG
- **Viewport**: 1280x800
- **Quality**: High (for crisp text)
- **File size**: Optimize with `pngquant` if needed

## Placeholder Images

Until real screenshots are captured, the documentation will show broken image links. This is intentional - replace with actual screenshots from your deployment.
