import { p, yamlHelper } from 'custom-libraries';
import { browser, element, by, protractor } from 'protractor';
import { homePage, projectPage } from 'e2e/model/pageObjects';
import { expect } from 'chai';
var EC = protractor.ExpectedConditions;
require('env-params').env(browser.params.environment, 'environment/');

class HomeFunctions {
  async launchBasePage() {
    await browser.get(process.env.APP_BASE_URL);
    await p.browserWaitUrlToContainString('Xylect.dll', 20000);
    expect(homePage.allLogo).to.be.present;
  }
  async navigateToCountryHomePage(country: string) {
    await p.click(element(by.xpath("//a[contains(text(),'" + country + "')]")));
    await this.handlePrivacyPopUp();
  }

  async userLogin(username: string, password: string) {
    await browser.wait(EC.presenceOf(homePage.txtUsername));
    await p.typeValue(homePage.txtUsername, username);
    await p.typeValue(homePage.txtPassword, password);
    await p.click(homePage.btnLogon);
    await p.browserWaitElementPresence(projectPage.btnHeader);
  }

  async handlePrivacyPopUp() {
    try {
      await browser.wait(EC.presenceOf(homePage.btnPrivacyAccept));
      await p.click(homePage.btnPrivacyAccept);
      await p.click(homePage.btnCookieAccept);
    } catch (error) {
      console.log('privacy pop up not present');
    }
  }

  async getUserCredentials(userType: string) {
    const credentialsMap = new Map();
    const userEmail = await yamlHelper.getData(
      'USERS',
      'username',
      userType,
      'all-users.yaml'
    );
    credentialsMap.set('username', userEmail);
    const userPassword = await yamlHelper.getData(
      'USERS',
      'password',
      userType,
      'all-users.yaml'
    );
    credentialsMap.set('password', userPassword);
    return credentialsMap;
  }
}
export const homeFunctions: HomeFunctions = new HomeFunctions();
