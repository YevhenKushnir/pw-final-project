import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/HeaderFragments";
import { ProductsFiltersFragment } from "../fragments/ProductFilterFragments";

export class HomePage {
    page: Page;
    header: HeaderFragment;
    searchLocator: Locator;
    filtration: ProductsFiltersFragment;
    productName: Locator;
    productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.filtration = new ProductsFiltersFragment(page);
        this.searchLocator = this.page.getByPlaceholder('Search');
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="product-price"]');
    }

    async homePageNavigate(): Promise<void> {
        await this.page.goto(process.env.WEB_URL!);
    }

    async openProduct(productName: string): Promise<void> {
        await this.page.getByRole('heading', { name: productName }).click();
    }
    async getAllProductNames(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        return names.filter(name => typeof name === 'string').map(name => name.trim());
    }
      async getAllProductPrices(): Promise<string[]> {
        return this.productPrice.allTextContents();
      }

}