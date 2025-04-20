import { test, expect } from '@playwright/test';
import { ProductsFiltersFragment } from '../fragments/ProductFilterFragments';
import { HomePage } from '../pages/home.page';

test('Verify sorting by Name (A - Z)', async ({ page }) => {
  const homePage = new HomePage(page);
  const filters = new ProductsFiltersFragment(page);
  await homePage.homePageNavigate();
  await filters.selectSortingOption('Name (A - Z)');
  const productNames = await homePage.getAllProductNames();
  let sortedCorrectly = true;
  for (let i = 1; i < productNames.length; i++) {
    if (productNames[i].localeCompare(productNames[i - 1]) < 0) {
      sortedCorrectly = false;
      break;
    }
  }
  expect(sortedCorrectly).toBe(true);
});

test('Verify sorting by Name (Z - A)', async ({ page }) => {
  const homePage = new HomePage(page);
  const filters = new ProductsFiltersFragment(page);
  await homePage.homePageNavigate();
  await filters.selectSortingOption('Name (Z - A)');
  const productNames = await homePage.getAllProductNames();
  let sortedCorrectly = true;
  for (let i = 1; i < productNames.length; i++) {
    if (productNames[i].localeCompare(productNames[i - 1]) > 0) {
      sortedCorrectly = false;
      break;
    }
  }
  expect(sortedCorrectly).toBe(true);
});