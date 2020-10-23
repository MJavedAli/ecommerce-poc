/* tslint:disable */
import * as fs from 'fs';
import * as path from 'path';
import { browser, ElementFinder } from 'protractor';
require('env-params').env(browser.params.environment, 'environment/');

import { timeout } from '../utils/validator';
import { browserWaitElementVisible } from './waiters';

/**
 * this method helps to upload a file from the system to a certain drop element
 * @param fileName
 * @param element
 */
export const uploadFile = (fileName: string, htmlElement: ElementFinder) => {
  const filePath: string = path.resolve(__dirname, fileName);
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (rslt) => {
      if (!rslt) {
        htmlElement.sendKeys(filePath);
        resolve(true);
      } else {
        const message =
          rslt.code === 'ENOENT'
            ? `File does not exist in path ${fileName}!!!`
            : `Some other error: ${rslt.code}`;
        reject(message);
      }
    });
  });
};

/**
 * this method helps to drag and drop a element into another element
 * @param dragElement
 * @param dropElement
 */
export const dragAndDrop = async (
  dragElement: ElementFinder,
  dropElement: ElementFinder
) => {
  await browser.executeScript(dragAndDrop, dragElement, dropElement);
};

/**
 * This method helps to check whether current url is different from base url
 */
export const isCurrentUrlDifferentFromBaseUrl = async () => {
  return browser.getCurrentUrl().then((url) => url !== browser.baseUrl);
};

/**
 * This method helps to scroll to a specific element
 * @param htmlElement
 * @param timeoutInMilliseconds
 */
export const scrollToElement = async (
  htmlElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) => {
  await browserWaitElementVisible(htmlElement, timeoutInMilliseconds);
  await browser.executeScript(
    'arguments[0].scrollIntoView(true);',
    htmlElement
  );
};

/**
 * this method helps to get the current date and time
 */
export const getCurrentDateTime = () => {
  const today: Date = new Date();
  const currentDateAndTime = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
  return currentDateAndTime;
};

/**
 * this method helps to get all window titles
 * @param windowTitle
 */
export const getAllRedirectedBrowserWindowTitles = async () => {
  const title: string[] = [];
  await browser.wait(
    async () => {
      return (await browser.getAllWindowHandles()).length >= 2;
    },
    Number(process.env.IMPLICIT_WAIT),
    `Only one browser handle found. There is no other browser handle to iterate`
  );
  const _windowHandles: string[] = await browser.getAllWindowHandles();
  const _parentHandle: string = _windowHandles[0];
  for (const guid of _windowHandles) {
    if (guid !== _parentHandle) {
      await browser.switchTo().window(guid);
      await browser.wait(
        async () => {
          return (await browser.getTitle()) ? true : false;
        },
        Number(process.env.IMPLICIT_WAIT),
        `Child browser title not loaded`
      );
      title.push(await browser.getTitle());
      await browser.close();
    }
  }
  await browser.switchTo().window(_parentHandle);
  return title;
};

/**
 * this method verify the file is downloaded
 * @param fileName
 */
export const verifyFileDownloaded = async (fileName: string) => {
  console.log('Getting users download path: ' + (await this.downloadsFolder()));
  const filePath: string = (
    (await this.downloadsFolder()) +
    '\\' +
    fileName
  ).replace(/\\/g, '/');
  console.log('Getting the path ' + filePath);
  return browser.wait(
    async () => fs.existsSync(filePath),
    Number(process.env.IMPLICIT_WAIT),
    'File never appeared!'
  );
};

/**
 * This method provides the download directory based on the browser
 */
export const downloadsFolder = async () => {
  let downloadsPath = '';
  const capabilities = await browser.getCapabilities();
  const currentBrowser = capabilities.get('browserName');
  if (currentBrowser.includes('chrome')) {
    downloadsPath =
      process.cwd() +
      `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\chrome`;
  }
  if (currentBrowser.includes('firefox')) {
    downloadsPath =
      process.cwd() +
      `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\firefox`;
  }
  if (currentBrowser.includes('ie')) {
    downloadsPath =
      process.cwd() + `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\ie`;
  }

  return downloadsPath;
};

/**
 * This method helps to add content to TinyMce text editor
 * @param content
 * @param frameIndex
 */
export const addContentToTinyMceEditor = async (
  content: string,
  index: number
) => {
  await browser.executeScript(
    `return tinyMCE.editors[${index}].resetContent();`
  );
  await browser.executeScript(
    `return tinyMCE.editors[${index}].setContent('<html><head><style type="text/css">.c0 { font-family: Arial }</style></head><body class="c0">${content}</body></html>');`
  );
  await browser.executeScript(`return tinyMCE.editors[${index}].save();`);
};

/**
 * This method helps verify text from TinyMce text editor
 * @param content
 * @param frameIndex
 */
export const getTinyMceEditorContent = async (index: string) => {
  return browser.executeScript(
    `return tinyMCE.editors[${index}].getContent();`
  );
};
/**
 * This method internal to this library to identify alert
 */
async function checkForAlert() {
  try {
    await browser.driver.switchTo().alert();
    console.log('Alert is Present & Handled');
    return true;
  } catch (error) {
    console.log('No Alert Present');
    return false;
  }
}
/**
 * This method helps handle alerts in browser
 */
export const handleAlerts = async () => {
  const alert = await checkForAlert();
  if (alert) {
    (await browser.driver.switchTo().alert()).accept();
  } else {
    //    console.log("No Alert");
  }
};
