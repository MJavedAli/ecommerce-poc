
import { by, element, ElementFinder } from 'protractor';
import { p, yamlHelper, logger, expect } from 'custom-libraries';
import { globalVariable } from 'testData/globalVariable';

class CartPage {
  public btnOK: ElementFinder;
  public btnPlaceOrder: ElementFinder;
  public txtOrderName: ElementFinder;
  public txtOrderCountry: ElementFinder;
  public txtOrderCity: ElementFinder;
  public txtOrderCreditCard: ElementFinder;
  public txtOrderMonth: ElementFinder;
  public txtOrderYear: ElementFinder;

  public lblPurchaseAmount: ElementFinder;
  public btnPurchase: ElementFinder;
  public lblPurchaseDetails: ElementFinder;


  constructor() {
    this.btnPlaceOrder = element(by.css(".btn-success"));
    this.txtOrderName = element(by.id('name'));
    this.txtOrderCountry = element(by.id('country'));
    this.txtOrderCity = element(by.id('city'));
    this.txtOrderCreditCard = element(by.id('card'));
    this.txtOrderMonth = element(by.id('month'));
    this.txtOrderYear = element(by.id('year'));
    this.btnPurchase = element(by.css('#orderModal .btn-primary'));
    this.lblPurchaseAmount = element(by.xpath("//h3[@id='totalp']"));
    this.lblPurchaseDetails = element(by.css('.lead'));
    this.btnOK = element(by.xpath("//button[contains(text(),'OK')]"));

  }

  async deleteItemFromCart(deleteItem: string) {
    const deleteElement: ElementFinder = element(by.xpath("//td[text()='" + deleteItem + "']/following-sibling::td/a[text()='Delete']"));
    await p.click(deleteElement);
    await p.browserWaitElementNotToBePresent(deleteElement, 10000);
    logger.info(`${deleteItem} is deleted from cart`);
  }

  async checkTotalAmountAndPlaceOrder() {
    await p.browserWaitElementVisible(this.lblPurchaseAmount, 10000);
    globalVariable.purchaseAmount = await this.lblPurchaseAmount.getText()
    logger.info(`Purchase Total = ${globalVariable.purchaseAmount}`);
    await p.click(cartPage.btnPlaceOrder);
  }
  async fillUserDetailsToPurchase(user: string) {
    await p.typeValue(this.txtOrderName, await yamlHelper.getData(
      'USER',
      'name',
      user,
      'user-details.yaml'
    ));
    await p.typeValue(this.txtOrderCountry, await yamlHelper.getData(
      'USER',
      'country',
      user,
      'user-details.yaml'
    ));
    await p.typeValue(this.txtOrderCity, await yamlHelper.getData(
      'USER',
      'city',
      user,
      'user-details.yaml'
    ));
    await p.typeValue(this.txtOrderCreditCard, await yamlHelper.getData(
      'USER',
      'creditcard',
      user,
      'user-details.yaml'
    ));
    await p.typeValue(this.txtOrderMonth, await yamlHelper.getData(
      'USER',
      'month',
      user,
      'user-details.yaml'
    ));
    await p.typeValue(this.txtOrderYear, await yamlHelper.getData(
      'USER',
      'year',
      user,
      'user-details.yaml'
    ));
    await p.click(this.btnPurchase);

  }

  async capturePurchaseDetails() {
    const purchaseDetail = await this.lblPurchaseDetails.getText();
    const purchaseLogs = purchaseDetail.split("\n");
    logger.info(`purchase id is => ${(purchaseLogs[0].split(":"))[1]}`);
    logger.info(`purchase amount is => ${(purchaseLogs[1].split(":"))[1]}`);
    globalVariable.amountFromLogs = (purchaseLogs[1].split(":"))[1]

  }
  async assertExpectedValues() {
    expect(globalVariable.amountFromLogs.includes(globalVariable.purchaseAmount));
  }


}

export const cartPage: CartPage = new CartPage();
