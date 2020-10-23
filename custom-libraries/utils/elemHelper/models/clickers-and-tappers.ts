/* tslint:disable */
import { browser, by, ElementFinder, ExpectedConditions } from 'protractor';
require('env-params').env(browser.params.environment, 'environment/');

import { timeout } from '../utils/validator';
import {
  browserWaitElementClickable,
  browserWaitElementPresence,
  browserWaitElementVisible,
} from './waiters';

/**
 * This method helps to click specific web element
 * @param webElement
 * @param timeoutInMilliseconds
 *
 * @example
 * const buttonElement=element(by.id('ok'));
 * await p.click(buttonElement);
 */
export const click = async (
  webElement: ElementFinder,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<boolean> =>
  webElement.click().then(
    () => true,
    (error) => {
      console.log(
        `Re-trying clicking Element ${webElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
      );
      if (tryCount > 0) {
        return browser.sleep(sleepTime).then(() => {
          return click(webElement, 1000, tryCount - 1);
        });
      } else {
        throw error;
      }
    }
  );

/**
 * This method helps to hover and click specific web element
 * @param webElement
 * @param timeoutInMilliseconds
 *
 * @example
 * const buttonElement=element(by.id('ok'));
 * await p.hoverAndClick(buttonElement);
 */
export const hoverAndClick = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) => {
  await browserWaitElementPresence(webElement, timeoutInMilliseconds);
  await browser.actions().mouseMove(webElement).click().perform();
};

/**
 * This method helps to hover and click specific web element
 * @param webElement
 * @param timeoutInMilliseconds
 *
 * @example
 * await p.hoverAndClick(element);
 */
export const tap = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) => {
  await browserWaitElementClickable(webElement, timeoutInMilliseconds);
  await browser.touchActions().tap(webElement).perform();
};

/**
 * This method helps to select the checkboxes
 * @param checkboxElement
 * @param selected
 */
export const selectCheckbox = async (
  checkboxElement: ElementFinder,
  selected: boolean
) => {
  const isCheckboxSelected: boolean = await checkboxElement.isSelected();
  if (selected !== isCheckboxSelected) {
    await click(checkboxElement);
  }
};

/**
 * this method helps to select an option from single select element
 * @param selectOptionLocator
 * @param textToSelect
 */
export const selectValueFromList = async (
  selectOptionLocator: ElementFinder,
  textToSelect: string
) => {
  await browserWaitElementVisible(selectOptionLocator);
  await click(
    await selectOptionLocator
      .all(by.css('li'))
      .filter(async (element) => {
        return (await element.getText()) === textToSelect;
      })
      .first()
  );
};

/**
 * this method helps to select an option from multiple select element by losing focus mechanism
 * @param selectOptionLocator
 * @param textToSelect
 * @param loseFocusLocator
 */
export const selectValueFromMultipleSelectOption = async (
  selectOptionLocator: ElementFinder,
  textToSelect: string,
  loseFocusLocator: ElementFinder
) => {
  await browser.wait(
    ExpectedConditions.elementToBeClickable(selectOptionLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Select option element is not clickable: ${selectOptionLocator}`
  );
  await selectOptionLocator.click();
  const option: ElementFinder = selectOptionLocator.element(
    by.cssContainingText('li', textToSelect)
  );
  await browser.wait(
    ExpectedConditions.elementToBeClickable(option),
    Number(process.env.IMPLICIT_WAIT),
    `Element with text: ${textToSelect} is not visible`
  );
  await option.click();
  await browser.wait(
    ExpectedConditions.elementToBeClickable(loseFocusLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Element to lose focus is not clickable`
  );
  return loseFocusLocator.click();
};

/**
 * This method helps to perform slow typing sending one character at a time
 * @param elm
 * @param keys
 * @param delay
 */
export const slowType = async (elm, keys, delay = 100) => {
  await click(elm);

  // tslint:disable-next-line: prefer-for-of
  for (const element of keys) {
    await browser.actions().sendKeys(element).perform();
    await browser.sleep(delay);
  }
};

/**
 * This method helps to move to target element and perform click action
 * @param moveToLocator
 */
export const moveAndClick = async (moveToLocator: ElementFinder) => {
  await browser.actions().mouseMove(moveToLocator).perform();
  await moveToLocator.click();
};
