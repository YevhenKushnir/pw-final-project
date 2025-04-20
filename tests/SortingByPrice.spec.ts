import { test, expect } from '@playwright/test';
import { ProductsFiltersFragment } from '../fragments/ProductFilterFragments';
import { HomePage } from '../pages/home.page';

test('Verify sorting by Price (Low - High)', async ({ page }) => {
  const homePage = new HomePage(page);
  const filters = new ProductsFiltersFragment(page);
  await homePage.homePageNavigate();
  await filters.selectSortingOption('Price (Low - High)');
  const productPrices = await homePage.getAllProductPrices();
  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice >= previousPrice;
  });

  expect(isSorted).toBe(true);
});

test('Verify sorting by Price (High - Low)', async ({ page }) => {
  const homePage = new HomePage(page);
  const filters = new ProductsFiltersFragment(page);
  await homePage.homePageNavigate();
  await filters.selectSortingOption('Price (High - Low)');
  const productPrices = await homePage.getAllProductPrices();
  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice <= previousPrice;
  });

  expect(isSorted).toBe(true);
});