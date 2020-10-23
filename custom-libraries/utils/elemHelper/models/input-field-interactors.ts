/* tslint:disable */
import { browser, ElementFinder, protractor } from 'protractor';
require('env-params').env(browser.params.environment, 'environment/');

import { timeout } from '../utils/validator';
import { browserWaitElementVisible } from './waiters';
/**
 * This method helps to send string char by char to web element
 * @param webElement
 * @param value
 * @param sleepTime
 * @param tryCount
 
 */
export const typeByChar = async (
  webElement: ElementFinder,
  value:string,
  sleepTime = 1000
) => {
  for (let i = 0; i <await value.length; i++) {
    await webElement.sendKeys(value.charAt(i));
    await browser.sleep(sleepTime);
  }
};
/**
 * This method helps to send texts to web element
 * @param webElement
 * @param value
 * @param sleepTime
 * @param tryCount
 *
 * @example
 * const buttonElement=element(by.id('input[class='abc']'));
 * await p.typeValue(buttonElement,"hello");
 */
export const typeValue = async (
  webElement: ElementFinder,
  value: string,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<void | boolean> =>
  webElement.sendKeys(value).then(
    () => true,
    (error) => {
      // tslint:disable-next-line: no-console
      console.log(
        `re-trying sending text to Element ${webElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
      );
      if (tryCount > 0) {
        return browser.sleep(sleepTime).then(() => {
          return typeValue(webElement, value, 1000, tryCount - 1);
        });
      } else {
        throw error;
      }
    }
  );

/**
 * this method helps to type a date value in date input
 * @param dateInput
 * @param date
 */
export const typeDate = async (dateInput: ElementFinder, date: string) => {
  await dateInput.click();
  await dateInput.clear();
  return dateInput.sendKeys(date);
};

/**
 * This method helps to clear specific text box contents
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const clear = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
) => {
  await browserWaitElementVisible(webElement, timeoutInMilliseconds);
  await webElement.clear();
};

/**
 * this element helps to get the attribute value of an element
 * @param element
 * @param attrName
 */
export const getAttribute = async (
  htmlElement: ElementFinder,
  attributeName: string,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<string> =>
  htmlElement.getAttribute(attributeName).then(
    (text) => {
      if (text && text !== '') {
        return text;
      } else {
        console.log(
          `received attribute value as null, re-trying ${tryCount} times more`
        );
        if (tryCount > 0) {
          return browser.sleep(sleepTime).then(() => {
            return getAttribute(htmlElement, attributeName, 1000, tryCount - 1);
          });
        } else {
          return text;
        }
      }
    },
    (error) => {
      console.log(
        `re-trying fetching attribute from Element ${htmlElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
      );
      if (tryCount > 0) {
        return browser.sleep(sleepTime).then(() => {
          return getAttribute(htmlElement, attributeName, 1000, tryCount - 1);
        });
      } else {
        throw error;
      }
    }
  );
/**
 * this method helps to get the css value of an element
 * @param element
 * @param cssValue
 */
export const getCssValue = async (
  htmlElement: ElementFinder,
  cssValue: string,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<string> =>
  htmlElement.getCssValue(cssValue).then(
    (text) => {
      if (text && text !== '') {
        return text;
      } else {
        console.log(
          `received css value as null, re-trying ${tryCount} times more`
        );
        if (tryCount > 0) {
          return browser.sleep(sleepTime).then(() => {
            return getAttribute(htmlElement, cssValue, 1000, tryCount - 1);
          });
        } else {
          return text;
        }
      }
    },
    (error) => {
      console.log(
        `re-trying fetching css value from Element ${htmlElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
      );
      if (tryCount > 0) {
        return browser.sleep(sleepTime).then(() => {
          return getCssValue(htmlElement, cssValue, 1000, tryCount - 1);
        });
      } else {
        throw error;
      }
    }
  );

/**
 * this method helps to get the css value of an element
 * @param element
 * @param cssValue
 */
export const getText = async (
  htmlElement: ElementFinder,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<string> =>
  htmlElement.getText().then(
    (text) => {
      if (text && text !== '') {
        return text;
      } else {
        console.log(
          `received getText() as null, re-trying ${tryCount} times more`
        );
        if (tryCount > 0) {
          return browser.sleep(sleepTime).then(() => {
            return getText(htmlElement, 1000, tryCount - 1);
          });
        } else {
          return text;
        }
      }
    },
    (error) => {
      console.log(
        `re-trying fetching text from Element ${htmlElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
      );
      if (tryCount > 0) {
        return browser.sleep(sleepTime).then(() => {
          return getText(htmlElement, 1000, tryCount - 1);
        });
      } else {
        throw error;
      }
    }
  );
/**
 * This method helps to clear default texts in the web element
 * @param webElement
 * @param sleepTime
 * @param tryCount
 *
 * @example
 * const buttonElement=element(by.id('input[class='abc']'));
 * await p.deleteValue(buttonElement,"hello");
 */

export const deleteValue = async (
  webElement: ElementFinder,
  sleepTime = 1000,
  tryCount: number = (Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds) / sleepTime || 10
): Promise<void | boolean> =>
  webElement
    .sendKeys(
      protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE)
    )
    .then(
      () => true,
      (error) => {
        // tslint:disable-next-line: no-console
        console.log(
          `re-trying deleting text to Element ${webElement.parentElementArrayFinder.locator_}, try ${tryCount} times more`
        );
        if (tryCount > 0) {
          return browser.sleep(sleepTime).then(() => {
            return deleteValue(webElement, 1000, tryCount - 1);
          });
        } else {
          throw error;
        }
      }
    );
