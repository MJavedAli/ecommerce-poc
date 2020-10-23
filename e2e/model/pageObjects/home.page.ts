import { by, element, ElementFinder, browser, protractor } from 'protractor';
import { p, expect, logger } from 'custom-libraries';
var EC = protractor.ExpectedConditions;

class HomePage {

  public navLinkHome: ElementFinder;
  public navLinkCart: ElementFinder;
  public linkLaptop: ElementFinder;
  public logo: ElementFinder;
  public btnAddToCart: ElementFinder;


  constructor() {
    this.linkLaptop = element(by.xpath("//a[contains(text(),'Laptops')]"));
    this.navLinkHome = element(by.css('.active > .nav-link'));
    this.navLinkCart = element(by.xpath("//a[contains(text(),'Cart')]"));
    this.logo = element(by.css('.navbar-brand#nava'));
    this.btnAddToCart = element(by.linkText('Add to cart'));
  }

  async launchBasePage() {
    await browser.get(process.env.APP_BASE_URL);
    await p.browserWaitElementVisible(this.navLinkHome);
    expect(this.logo).to.be.present;
  }

  async navigateToLaptop() {
    await p.click(this.linkLaptop);
  }

  async addToCartProduct(products: string) {
    const productLists = products.split(',');
    for (let i in productLists) {
      await p.click(element(by.xpath("//a[contains(text(),'" + productLists[i] + "')]")));
      await p.click(this.btnAddToCart);
      await browser.wait(EC.alertIsPresent(), 5000);
      await browser.switchTo().alert().accept();
      logger.info(`product added to cart is ${productLists[i]}`);
      await p.click(this.navLinkHome);
      await p.click(this.linkLaptop);
    }
  }

  async navigateToCart() {
    await p.click(this.navLinkCart);
  }


}

export const homePage: HomePage = new HomePage();
