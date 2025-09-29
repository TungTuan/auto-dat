import { firefox, test } from '@playwright/test';
import path from 'path';

import * as XLSX from 'xlsx';

test.use({
  launchOptions: {
    headless: false, // show Chrome
  },
});

// Read Excel before tests
const workbook = XLSX.readFile('test.xlsx');
const sheetName = workbook.SheetNames[0]; // first sheet
const sheet = workbook.Sheets[sheetName];
const rows: any[] = XLSX.utils.sheet_to_json(sheet);

test('Read data from Excel', async ({ page }) => {
  console.log('rows', rows);
});

test('launch with firefox profile', async () => {
  // Path to your real Firefox profile
  const profilePath = path.join(
    process.env.HOME || '',
    'Library/Application Support/Firefox/Profiles/tun29igs.default' // change to your folder
  );
  console.log('profilePath', profilePath);
  
  // Launch Firefox with persistent profile
  const context = await firefox.launchPersistentContext(profilePath, {
    headless: false,
    // optional: executablePath if you want system Firefox instead of bundled one
    // executablePath: '/Applications/Firefox.app/Contents/MacOS/firefox',
  });

  const page = await context.newPage();

  // Go to your admin page
  await page.goto('https://admin.tenereteam.com/#/login');

  console.log('⚠️ Solve Cloudflare manually in Firefox window, profile will keep cookies.');

  // Keep Firefox open for manual verification
  await page.pause();

  // Continue automation after verification
  console.log('✅ Page title:', await page.title());

  // Don’t close context if you want Firefox to stay open
  // await context.close();
});
