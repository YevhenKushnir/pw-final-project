import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CATEGORIES, POWER_TOOLS } from '../pages/category_enum';

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.homePageNavigate();
    await page.getByRole('checkbox', { name: POWER_TOOLS.SANDER }).check();
    await page.waitForTimeout(3000);
    const productNames = await homePage.getAllProductNames();
    const allContainSander = productNames.every(name => name.trim().includes(POWER_TOOLS.SANDER));
    expect(allContainSander).toBe(true);
}); 