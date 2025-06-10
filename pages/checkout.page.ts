import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postCodeInput: Locator;
  readonly proceedToCheckoutButton3: Locator;

  readonly paymentMethodDropdown: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmPaymentButton: Locator;
  readonly paymentSuccessMessage: Locator;
  readonly userLoggedInMessage: Locator;
  readonly proceedToCheckoutButton2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryInput = page.getByTestId('country');
    this.postCodeInput = page.getByTestId('postal_code');
    this.proceedToCheckoutButton3 = page.getByTestId('proceed-3');
    this.proceedToCheckoutButton2 = page.getByTestId('proceed-2');

    this.paymentMethodDropdown = page.getByTestId('payment-method');
    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cvvInput = page.getByTestId('cvv');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');
    this.confirmPaymentButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByText('Payment was successful');
    this.userLoggedInMessage = page.getByTestId('user-logged-in');
  }

  async fillBillingAddress(street: string, city: string, state: string, country: string, postCode: string): Promise<void> {
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countryInput.fill(country);
    await this.postCodeInput.fill(postCode);
    await this.proceedToCheckoutButton3.click();
  }

  async selectCreditCardPayment(cardNumber: string, expirationDate: string, cvv: string, cardHolderName: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption('Credit Card'); 
    await this.cardNumberInput.fill(cardNumber);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);
    await this.cardHolderNameInput.fill(cardHolderName);
    await this.confirmPaymentButton.click();
  }

  async verifyPaymentSuccess(): Promise<void> {
    await expect(this.paymentSuccessMessage).toBeVisible();
  }

  async expectUserIsLoggedIn(): Promise<void> {
    await this.proceedToCheckoutButton2.click();
  }
}