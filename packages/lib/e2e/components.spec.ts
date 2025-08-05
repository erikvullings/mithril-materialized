import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Button components render correctly', async ({ page }) => {
    await page.locator('[data-testid="buttons-section"]').waitFor();
    await expect(page.locator('[data-testid="buttons-section"]')).toHaveScreenshot('buttons.png');
  });

  test('Input components render correctly', async ({ page }) => {
    await page.locator('[data-testid="inputs-section"]').waitFor();
    await expect(page.locator('[data-testid="inputs-section"]')).toHaveScreenshot('inputs.png');
  });

  test('Switch component renders correctly', async ({ page }) => {
    await page.locator('[data-testid="switch-section"]').waitFor();
    await expect(page.locator('[data-testid="switch-section"]')).toHaveScreenshot('switch.png');
  });

  test('Select component renders correctly', async ({ page }) => {
    await page.locator('[data-testid="select-section"]').waitFor();
    await expect(page.locator('[data-testid="select-section"]')).toHaveScreenshot('select.png');
  });

  test('Modal component renders correctly', async ({ page }) => {
    await page.click('[data-testid="open-modal"]');
    await page.locator('[data-testid="modal"]').waitFor();
    await expect(page.locator('[data-testid="modal"]')).toHaveScreenshot('modal.png');
  });

  test('Dropdown component renders correctly', async ({ page }) => {
    await page.locator('[data-testid="dropdown-section"]').waitFor();
    await page.click('[data-testid="dropdown-trigger"]');
    await expect(page.locator('[data-testid="dropdown-section"]')).toHaveScreenshot('dropdown.png');
  });

  test('Components are responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('[data-testid="components-container"]').waitFor();
    await expect(page.locator('[data-testid="components-container"]')).toHaveScreenshot('mobile-layout.png');
  });

  test('Dark theme renders correctly', async ({ page }) => {
    await page.click('[data-testid="theme-toggle"]');
    await page.locator('[data-testid="components-container"]').waitFor();
    await expect(page.locator('[data-testid="components-container"]')).toHaveScreenshot('dark-theme.png');
  });
});