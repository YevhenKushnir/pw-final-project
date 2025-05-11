import {expect, test} from '../fixtures/fixtures';
import {LoginPage} from '../pages/login.page';
import * as dotenv from 'dotenv';
import { config } from '../env.config';
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expiryMonth = (currentMonth + 3) % 12 === 0 ? 12 : (currentMonth + 3) % 12;
  const expiryYear = currentYear + Math.floor((currentMonth + 3 - 1) / 12);
  const formattedExpiry = `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear)}`;


  await checkoutPage.fillBillingAddress(
    'Test street 98',
    'Vienna',
    'Some State', 
    'Austria',
    '1010',      
  );

  await checkoutPage.selectCreditCardPayment(
    '1111-1111-1111-1111',
    formattedExpiry,
    '111',
    'Test Name',
  );

  await checkoutPage.verifyPaymentSuccess();
});