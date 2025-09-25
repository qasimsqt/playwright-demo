// tests/example.spec.js
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const RESULTS_DIR = process.env.RESULTS_DIR || '/results';
const shotDir = path.join(RESULTS_DIR, 'screenshots');
if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

test.describe('Example.com Smoke Tests', () => {

  test('Homepage should have correct title and heading', async ({ page }) => {
    await page.goto('https://example.com');

    // assertions
    await expect(page).toHaveTitle(/Example Domain/);
    await expect(page.locator('h1')).toHaveText('Example Domain');

    // screenshot into mounted results path
    await page.screenshot({ path: path.join(shotDir, 'homepage.png') });
  });

  test('More information link navigates to IANA', async ({ page }) => {
    await page.goto('https://example.com');
    await page.getByRole('link', { name: 'More information...' }).click();
    await expect(page).toHaveURL(/iana.org/);

    await page.screenshot({ path: path.join(shotDir, 'iana.png') });
  });

});
