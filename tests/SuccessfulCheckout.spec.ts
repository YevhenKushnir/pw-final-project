import {expect, test} from '../fixtures/fixtures';
import {LoginPage} from '../pages/login.page';
import * as dotenv from 'dotenv';
import { config } from '../env.config';
import { getExpiryDate } from '../dateUtils';
dotenv.config();

test('Verify successful checkout with logged in user', async ({ loggedInPage, productPage, cartPage, checkoutPage }) => {

  await loggedInPage.openProduct(' Combination Pliers ');

  await expect(productPage.page).toHaveURL(/product/);

  const actualProductName = await productPage.productName.innerText();
  const actualProductPriceText = await productPage.productPrice.innerText();
  const actualProductPrice = actualProductPriceText ? actualProductPriceText.replace('$', '') : '';

  await productPage.addToCart();

  await loggedInPage.header.proceedToCheckout();
  await cartPage.verifyProductDetails(actualProductName, actualProductPrice);
  await cartPage.verifyTotalPrice(actualProductPrice);

  await cartPage.proceedToCheckout();

  const loginPageOnCheckout = new LoginPage(checkoutPage.page); 

  await loginPageOnCheckout.login(config.USER_EMAIL!, config.USER_PASSWORD!);

  await checkoutPage.expectUserIsLoggedIn();
  const expiryDate = getExpiryDate();

  await checkoutPage.fillBillingAddress(
    'Test street 98',
    'Vienna',
    'Some State', 
    'Austria',
    '1010',      
  );

  await checkoutPage.selectCreditCardPayment(
    '1111-1111-1111-1111',
    expiryDate,
    '111',
    'Test Name',
  );

  await checkoutPage.verifyPaymentSuccess();
});