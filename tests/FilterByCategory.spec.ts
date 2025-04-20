import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

  test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.homePageNavigate();
    await page.getByRole('checkbox', { name: 'Sander' }).check();
    await page.waitForTimeout(3000);
    const productNames = await homePage.getAllProductNames();
    const allContainSander = productNames.every(name => name.trim().includes('Sander'));
    expect(allContainSander).toBe(true); 
  });