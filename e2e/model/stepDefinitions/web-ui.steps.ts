import { Given, Then, When } from 'cucumber';
import { homePage, cartPage } from 'e2e/model/pageObjects';
import { yamlHelper, logger, p, expect } from 'custom-libraries';


Given(/^I am on Demoblaze Home page$/, async () => {
  await homePage.launchBasePage();

});
When(/^I navigate to Laptop section$/, async () => {
  await homePage.navigateToLaptop();

});
Then(/^Add "(.*?)" to cart$/, async (products: string) => {
  const _products = await yamlHelper.getData(
    'CATEGORIES',
    'ADD_ITEMS',
    products,
    'products.yaml'
  );
  logger.info(`${_products} will be added to the cart`);
  await homePage.addToCartProduct(_products);
});
Then(/^I navigate to cart$/, async () => {
  await homePage.navigateToCart();
});

Then(/^Delete "(.*?)" from cart$/, async (deleteItem: string) => {
  const _deleteItem = await yamlHelper.getData(
    'CATEGORIES',
    'DELETE_ITEMS',
    deleteItem,
    'products.yaml'
  );
  logger.info(`${_deleteItem} will be deleted from the cart`);
  await cartPage.deleteItemFromCart(_deleteItem);
});
Then(/^Click on Place Order$/, async () => {
  await cartPage.checkTotalAmountAndPlaceOrder();

});
Then(/^Fill all the Purchase details with "(.*?)" and Purchase$/, async (user: string) => {
  await cartPage.fillUserDetailsToPurchase(user);
});
Then(/^Capture log purchase ID and Amount$/, async () => {
  await cartPage.capturePurchaseDetails();
});

Then(/^Assert the purchase amount$/, async () => {
  await cartPage.assertExpectedValues();
});
Then(/^Click on OK$/, async () => {
  await p.click(cartPage.btnOK);

});

