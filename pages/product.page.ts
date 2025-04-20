import { expect, Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/HeaderFragments";

export class ProductPage {
    page: Page;
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;
    productAlert: Locator;
    cartQuantity: Locator;
    cartIcon: Locator;
    header: HeaderFragment;

    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.locator('[data-test="product-name"]');
        this.productPrice = this.page.getByLabel('unit-price');
        this.addToCartButton = this.page.locator('#btn-add-to-cart');
        this.addToFavoritesButton = this.page.getByRole('button', { name: ' Add to favourites ' });
        this.productAlert = this.page.getByRole('alert', { name: 'Product added to shopping cart.' });
        this.cartQuantity = this.page.locator('#lblCartCount');
        this.cartIcon = this.page.locator('a[href="/checkout"]');
        this.header = new HeaderFragment(page);

    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.addToCartButton).toBeVisible();
        await this.addToCartButton.click();
    }

}