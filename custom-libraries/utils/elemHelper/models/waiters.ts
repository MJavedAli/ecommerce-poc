import {
  browser,
  ElementFinder,
  ExpectedConditions,
  protractor,
} from 'protractor';
require('env-params').env(browser.params.environment, 'environment/');

import {
  getDeafultTextTextIsStillPresentOnElementMessage,
  getDefaultCurrentUrlContainsTheString,
  getDefaultCurrentUrlDoesNotContainStringMessage,
  getDefaultCurrentUrlIsDifferentThanExpectedUrlMessage,
  getDefaultCurrentUrlIsEqualToExpectedUrlMessage,
  getDefaultIsNotPresentMessage,
  getDefaultIsStillPresentMessage,
  getDefaultIsStillVisibleMessage,
  getDefaultTextTextNotPresentOnElementMessage,
} from '../utils/message-builder';
import { timeout } from '../utils/validator';

const EC = protractor.ExpectedConditions;

/**
 * this method checks one element contains all the required values. Method returns true if it contains all the required values.
 * @param elementToCheck
 * @param values
 */
export const doesElementContainAllValues = async (
  elementToCheck: ElementFinder,
  ...values: string[]
): Promise<boolean> => {
  return elementToCheck.getText().then((text) => {
    return values.reduce((previous, current) => {
      return text.includes(current) && previous;
    }, true);
  });
};

/**
 * this method awaits the execution until an element is clickable
 * @param selectOptionLocator
 */
export const browserWaitElementClickable = async (
  selectOptionLocator: ElementFinder,
  customWait?: number
) =>
  browser.wait(
    ExpectedConditions.elementToBeClickable(selectOptionLocator),
    Number(customWait || process.env.IMPLICIT_WAIT),
    `Element is not clickable: ${selectOptionLocator.locator()}`
  );

/**
 * this method awaits the execution until an element is visible
 * @param selectOptionLocator
 */
export const browserWaitElementVisible = async (
  selectOptionLocator: ElementFinder,
  customWait?: number
) =>
  browser.wait(
    ExpectedConditions.visibilityOf(selectOptionLocator),
    Number(customWait || process.env.IMPLICIT_WAIT),
    `Element is not visible: ${selectOptionLocator.locator()}`
  );

/**
 * This method helps to wait until an element present in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const browserWaitElementPresence = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.presenceOf(webElement),
    timeoutInMilliseconds,
    getDefaultIsNotPresentMessage(webElement)
  );

/**
 * This method helps to wait until an element not present in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const browserWaitElementNotToBePresent = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.stalenessOf(webElement),
    timeoutInMilliseconds,
    getDefaultIsStillPresentMessage(webElement)
  );

/**
 * This method helps to wait until an element not visible in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const browserWaitElementNotToBeVisible = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.invisibilityOf(webElement),
    timeoutInMilliseconds,
    getDefaultIsStillVisibleMessage(webElement)
  );

/**
 * This method helps to wait until specific text is present in specific element
 * @param webElement
 * @param text
 * @param timeoutInMilliseconds
 */
export const browserWaitTextToBePresentInElement = async (
  webElement: ElementFinder,
  text: string,
  timeoutInMilliseconds = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.textToBePresentInElement(webElement, text),
    timeoutInMilliseconds,
    getDefaultTextTextNotPresentOnElementMessage(webElement, text)
  );

/**
 * This method helps to wait until specific text not to be present in specific element
 * @param webElement
 * @param text
 * @param timeoutInMilliseconds
 */
export const browserWaitTextNotToBePresentInElement = async (
  webElement: ElementFinder,
  text: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.not(
      ExpectedConditions.textToBePresentInElement(webElement, text)
    ),
    timeoutInMilliseconds,
    getDeafultTextTextIsStillPresentOnElementMessage(webElement, text)
  );

/**
 * This method helps to wait until browser url to be equal to expected url
 * @param expectedUrl
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlToBeEqualToExpectedUrl = async (
  expectedUrl: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.urlIs(expectedUrl),
    timeoutInMilliseconds,
    getDefaultCurrentUrlIsDifferentThanExpectedUrlMessage(expectedUrl)
  );

/**
 * This method helps to wait until browser url not to be equal to expected url
 * @param expectedUrl
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlNotToBeEqualToExpectedUrl = async (
  expectedUrl: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.not(ExpectedConditions.urlIs(expectedUrl)),
    timeoutInMilliseconds,
    getDefaultCurrentUrlIsEqualToExpectedUrlMessage(expectedUrl)
  );

/**
 * This method helps to wait until url contains specific text
 * @param url
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlToContainString = async (
  url: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.urlContains(url),
    timeoutInMilliseconds,
    getDefaultCurrentUrlDoesNotContainStringMessage(url)
  );

/**
 * This method helps to wait until url des not contain the specific text
 * @param url
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlNotToContainString = async (
  url: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) =>
  browser.wait(
    ExpectedConditions.not(ExpectedConditions.urlContains(url)),
    timeoutInMilliseconds,
    getDefaultCurrentUrlContainsTheString(url)
  );

/**
 * this method awaits the execution until an element is displayed.
 * @param selectOptionLocator
 */
export const isElementDisplayed = async (
  selectOptionLocator: ElementFinder
) => {
  return browser.wait(
    ExpectedConditions.presenceOf(selectOptionLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Element is not displayed: ${selectOptionLocator.locator()}`
  );
};

export const getElementOrWait = async (element: ElementFinder) => {
  return browser
    .wait(EC.visibilityOf(element), 30000)
    .then(() => ElementFinder);
};

export const waitTillElementAppears = async (element: ElementFinder) => {
  try {
    for (let i = 0; i < 30; i++) {
      if (await this.isElementVisible(element)) {
        browser.sleep(1000);
        continue;
      } else {
        break;
      }
    }
  } catch (Error) {}
};
