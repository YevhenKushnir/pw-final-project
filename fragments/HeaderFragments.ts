import { Page, Locator, expect } from '@playwright/test';

export class HeaderFragment {
    readonly page: Page;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByTestId('nav-cart');
    }

    async proceedToCheckout(): Promise<void> {
        await this.cartIcon.click();
    }

}