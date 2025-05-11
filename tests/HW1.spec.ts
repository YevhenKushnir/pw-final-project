
import * as dotenv from 'dotenv';
import { config } from '../env.config';
dotenv.config();
import {expect, test} from '../fixtures/fixtures'; 

test('1: Verify login with valid credentials', async ({ page, loginPage }) => {
  await page.goto('/auth/login');
  await loginPage.login(config.USER_EMAIL!, config.USER_PASSWORD!);
  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId('page-title')).toBeVisible();
  await expect(page.getByTestId('nav-menu')).toHaveText(process.env.USER_NAME!);
});


test('2: Verify user can view product details', async ({ page, homePage, productPage }) => {

  await homePage.homePageNavigate();
  await homePage.openProduct('Combination Pliers');
  expect(page.url()).toContain('/product');
  await expect(productPage.productName).toHaveText('Combination Pliers', { timeout: 5000 });
  await expect(productPage.productPrice).toContainText('14.15');
  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoritesButton).toBeVisible();
});

test('3: Verify user can add product to cart', async ({ page, homePage, productPage }) => {

  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';

  await homePage.homePageNavigate();
  await homePage.openProduct(productName);
  expect(page.url()).toContain('/product');
  await expect(productPage.productName).toHaveText(productName);
  await expect(productPage.productPrice).toHaveText(productPrice);

  await productPage.addToCart();
  await expect(productPage.productAlert).toBeVisible();
  await expect(productPage.productAlert).toHaveText('Product added to shopping cart.');
  await expect(productPage.productAlert).toBeHidden({ timeout: 8000 });
  await expect(productPage.cartQuantity).toHaveText('1');

  await productPage.header.proceedToCheckout();
  await expect(page).toHaveURL('/checkout');
  await expect(page.getByTestId('product-quantity')).toHaveCount(1);
  await expect(page.getByTestId('product-title')).toHaveText(productName);
  await expect(page.getByTestId('proceed-1')).toBeVisible();
});