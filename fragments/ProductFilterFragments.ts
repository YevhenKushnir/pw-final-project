import { Page, Locator } from '@playwright/test';
export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class ProductsFiltersFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly categoryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productPrices = page.locator('[data-test="product-price"]');
    this.categoryDropdown = page.locator('[data-test="category-dropdown"]')
  }

async selectSortingOption(sortOption: SortOption): Promise<void> {
    await this.sortDropdown.selectOption({ label: sortOption });
  }
}