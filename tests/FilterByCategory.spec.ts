import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductsFiltersFragment } from '../fragments/ProductFilterFragments'; 
import { CATEGORIES, POWER_TOOLS } from '../pages/category_enum';

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.homePageNavigate();
    const responsePromise = page.waitForResponse((response) => 
        response.url().includes('/products?between=price,1,100&by_category=') && response.status() === 200
    );
    await homePage.filtration.selectSander();
    await responsePromise;
    const productNames = await homePage.getAllProductNames();
    console.log('Product names after filtering: ', productNames);
    const allContainSander = productNames.every(name => name.trim().includes(POWER_TOOLS.SANDER));
    expect(allContainSander).toBe(true);
});