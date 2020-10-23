import { p, yamlHelper } from 'custom-libraries';
import { browser, element, by } from 'protractor';
import { expect } from 'chai';
import { projectPage } from 'e2e/model/pageObjects/';
import { LanguageList } from 'testData/enums';
require('env-params').env(browser.params.environment, 'environment/');

class ProjectFunctions {
  async validateLoggedInUserDetail() {
    expect(await p.getText(projectPage.lblLoggedInUser)).to.includes('Hi');
  }

  async searchAndValidatePumpModelQuantity(searchTag: string, seriesname: string) {
    await p.getElementOrWait(projectPage.txtModelSearch);
    const expectedCount = await yamlHelper.getData(
      'PUMPMODEL',
      'quantity',
      searchTag,
      'pump-details.yaml'
    );
    await p.typeValue(projectPage.txtModelSearch, searchTag);
    await p.click(element(by.xpath("//a[contains(text(),'" + seriesname + "')]")))
    await p.getElementOrWait(projectPage.lblProductCount);
    const productDetails = await projectPage.lblProductCount.getText();
    var arrProd: string[] = productDetails.split(" ");
    expect(arrProd[0]).equal(expectedCount, 'Expected pump count to contain: ' + expectedCount + ' but found: ' + arrProd[0]);
  }

  async validateLanguageList() {
    await p.click(projectPage.btnHeader);
    await p.click(projectPage.OptPreference);
    var actuallanguageList: string = await projectPage.listLanguage.all(by.tagName('option')).getAttribute('value');
    var expectedLanguageList: string[] = LanguageList.ALL.split(',')
    expect(actuallanguageList).to.deep.equal(expectedLanguageList);
  }
  async isProjectPage() {
    try {
      if (await browser.isElementPresent(projectPage.btnHeader)) {
        return true;
      }
    } catch (error) {
      console.error('User is not at Project Page');
      return false;
    }
  }
}
export const projectFunctions: ProjectFunctions = new ProjectFunctions();
