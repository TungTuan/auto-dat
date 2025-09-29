import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const profilePath = path.join(process.env.HOME || '', 'Library/Application Support/Google/Chrome/Profile 2');
  const chromeExec = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  // IMPORTANT: Make sure all Chrome instances are closed first!
  const context = await chromium.launchPersistentContext(profilePath, {
    headless: false,
    executablePath: chromeExec,
    // optional: args: ['--start-maximized'],
  });

  const page = await context.newPage();
  await page.goto('https://admin.tenereteam.com/#/login');

  console.log('Chrome launched with real profile. Manually solve Cloudflare if needed.');

  // Keep the browser open (don't call context.close() now) or call when you're done:
  // await context.close();
})();