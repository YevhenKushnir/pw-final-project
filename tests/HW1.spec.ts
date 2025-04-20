import { expect, test } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { HeaderFragment } from '../fragments/HeaderFragments';
dotenv.config();

test('Test 1: Verify login with valid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]'), 'My account').toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText(process.env.USER_NAME!);
});


test('Test 2: Verify user can view product details', async ({ page }) => {

  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.homePageNavigate();
  await homePage.openProduct('Combination Pliers');
  await expect(page.url()).toContain('/product');
  await expect(productPage.productName).toHaveText('Combination Pliers', { timeout: 5000 });
  await expect(productPage.productPrice).toContainText('14.15');
  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoritesButton).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ page }) => {

  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new HeaderFragment(page);
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';

  await homePage.homePageNavigate();
  await homePage.openProduct(productName);
  await expect(page.url()).toContain('/product');
  await expect(productPage.productName).toHaveText(productName);
  await expect(productPage.productPrice).toHaveText(productPrice);

  await productPage.addToCart();
  await expect(productPage.productAlert).toBeVisible();
  await expect(productPage.productAlert).toHaveText('Product added to shopping cart.');
  await expect(productPage.productAlert).toBeHidden({ timeout: 8000 });
  await expect(productPage.cartQuantity).toHaveText('1');

  await productPage.header.proceedToCheckout();
  await expect(page).toHaveURL('/checkout');
  await expect(page.locator('[data-test="product-quantity"]')).toHaveCount(1);
  await expect(page.locator('[data-test="product-title"]')).toHaveText(productName);
  await expect(page.locator('[data-test="proceed-1"]'), 'Proceed to checkout').toBeVisible();
});