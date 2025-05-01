import { Page, Locator } from '@playwright/test';
export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class ProductsFiltersFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly categoryDropdown: Locator;
  sanderCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('sort');
    this.categoryDropdown = page.getByTestId('category-dropdown'); 
    this.sanderCheckbox = page.getByRole('checkbox', { name: 'Sander' });
  }

async selectSortingOption(sortOption: SortOption): Promise<void> {
    await this.sortDropdown.selectOption({ label: sortOption });
  }
  async selectSander(): Promise<void> {
    await this.sanderCheckbox.check();
  }
}