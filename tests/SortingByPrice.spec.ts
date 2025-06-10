import {expect, test} from '../fixtures/fixtures';

test('Verify sorting by Price (Low - High)', async ({ homePage }) => {
  await homePage.homePageNavigate();
  await homePage.filtration.selectSortingOption('Price (Low - High)');
  const productPrices = await homePage.getAllProductPrices();
  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice >= previousPrice;
  });

  expect(isSorted).toBe(true);
});

test('Verify sorting by Price (High - Low)', async ({ homePage }) => {
  await homePage.homePageNavigate();
  await homePage.filtration.selectSortingOption('Price (High - Low)');
  const productPrices = await homePage.getAllProductPrices();
  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice <= previousPrice;
  });

  expect(isSorted).toBe(true);
});