import { by, element, ElementFinder } from 'protractor';

class HomePage {
  public allLogo: ElementFinder;
  public btnPrivacyAccept: ElementFinder;
  public btnCookieAccept: ElementFinder;
  public consentBox: ElementFinder;
  public txtUsername: ElementFinder;
  public txtPassword: ElementFinder;
  public btnLogon: ElementFinder;

  constructor() {
    this.allLogo = element(by.xpath("//img[@id='all_logos']"));
    this.btnPrivacyAccept = element(by.xpath("//a[@id='xyl-privacy-accept']"));
    this.btnCookieAccept = element(by.xpath("//a[@id='xyl-cookies-accept']"));
    this.consentBox = element(by.xpath("//div[@id='xyl-consent']"));
    this.txtUsername = element(by.xpath("//input[@id='inpage_login_user']"));
    this.txtPassword = element(by.xpath("//input[@id='inpage_login_passwd']"));
    this.btnLogon = element(by.xpath("//a[@id='inpage_login_submit']"));
  }
}

export const homePage: HomePage = new HomePage();
