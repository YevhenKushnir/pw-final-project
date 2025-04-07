import { expect, test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test('Test 1: Verify login with valid credentials', async ({ page }) => {

  await page.goto('/auth/login');

  await page.locator('#email').fill(process.env.USER_EMAIL!);
  await page.locator('#password').fill(process.env.USER_PASSWORD!);
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]'), 'My account').toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});


test('Test 2: Verify user can view product details', async ({ page }) => {

  await page.goto('/');
    await page.getByText('Combination Pliers').click();
    await expect(page.url()).toContain('/product');
    await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toHaveText('14.15');
  
    await expect(page.locator('[data-test="add-to-cart"]'), 'Add to cart ').toBeVisible();
    await expect(page.locator('[data-test="add-to-favorites"]'), ' Add to favourites ').toBeVisible();
  });

  test('Test 3: Verify user can add product to cart', async ({ page }) => {

    await page.goto('/');
    await page.getByText('Slip Joint Pliers').click();
    await expect(page.url()).toContain(`/product`);
    await expect(page.locator('[data-test="product-name"]')).toHaveText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toHaveText('9.17');

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText('Product added to shopping cart.');
    await expect(page.getByRole('alert')).toBeHidden({ timeout: 8000 });
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
    
    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('[data-test="product-quantity"]')).toHaveCount(1);
    await expect(page.locator('[data-test="product-title"]')).toHaveText('Slip Joint Pliers');
    await expect(page.locator('[data-test="proceed-1"]'), 'Proceed to checkout').toBeVisible();
});