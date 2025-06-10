import {expect, test} from '../fixtures/fixtures';

test('Verify sorting by Name (A - Z)', async ({ homePage }) => {
  await homePage.homePageNavigate();
  await homePage.filtration.selectSortingOption('Name (A - Z)');
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

test('Verify sorting by Name (Z - A)', async ({ homePage }) => {
  await homePage.homePageNavigate();
  await homePage.filtration.selectSortingOption('Name (Z - A)');
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