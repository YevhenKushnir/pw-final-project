import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailLocator: Locator;
    password: Locator;
    submitButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailLocator = this.page.getByPlaceholder('Your email');
        this.password = this.page.getByPlaceholder('Your password')
        this.submitButton = this.page.getByRole('button', { name: 'Login' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailLocator.fill(email);
        await this.password.fill(password);
        await this.submitButton.click();
    }
}