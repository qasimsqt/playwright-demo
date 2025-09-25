// playwright.config.js
import { defineConfig } from '@playwright/test';
import path from 'path';

const resultsDir = process.env.RESULTS_DIR || '/results';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  outputDir: path.join(resultsDir, 'test-artifacts'),
  reporter: [
    ['list'],
    ['junit', { outputFile: path.join(resultsDir, 'junit', 'results.xml') }],
    ['html', { open: 'never', outputFolder: path.join(resultsDir, 'playwright-report') }]
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure'
  },
});
