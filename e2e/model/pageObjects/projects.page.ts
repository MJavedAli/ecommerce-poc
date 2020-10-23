/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import { by, element, ElementFinder } from 'protractor';

class ProjectPage {
  public btnHeader: ElementFinder;
  public lblLoggedInUser: ElementFinder;
  public txtModelSearch: ElementFinder;
  public lblProductCount: ElementFinder;
  public OptPreference: ElementFinder;
  public listLanguage: ElementFinder;

  constructor() {
    this.btnHeader = element(by.xpath("//input[@id='HeaderBtnOpts']"));
    this.lblLoggedInUser = element(by.xpath("//span[@class='HiName_text']"));
    this.txtModelSearch = element(by.xpath("//input[@id='quicksearch_inpproduct']"));
    this.lblProductCount = element(by.xpath("//span[@class='wichtig']"));
    this.listLanguage = element(by.xpath("//select[@id='TP__LGG']"));
    this.OptPreference = element(by.xpath("//p[contains(text(),'Preferences')]"));
  }
}

export const projectPage: ProjectPage = new ProjectPage();
