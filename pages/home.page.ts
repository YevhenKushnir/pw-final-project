import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/HeaderFragments";
import { ProductsFiltersFragment } from "../fragments/ProductFilterFragments";

export class HomePage {
    page: Page;
    header: HeaderFragment;
    filtration: ProductsFiltersFragment;
    productName: Locator;
    productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.filtration = new ProductsFiltersFragment(page);
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('product-price');
    }

    async homePageNavigate(): Promise<void> {
        await this.page.goto('/');
    }

    async openProduct(productName: string): Promise<void> {
        await this.page.getByRole('heading', { name: productName }).click();
    }
    async getAllProductNames(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        return names.map(name => name.trim());
    }
    async getAllProductPrices(): Promise<string[]> {
        return this.productPrice.allTextContents();
    }

}