/**
 * This file contains the validation messages for p [protractor helper library]
 */

import { ElementFinder } from 'protractor';

import { elementHelperGlobalConstants } from './element-helper-constants';

export const getDefaultCurrentUrlContainsTheString = (message: string) => {
  return `current URL contains the string '${message}'.`;
};

export const getDefaultCurrentUrlDoesNotContainStringMessage = (
  message: string
) => {
  return `current URL does not contains the string '${message}'.`;
};

export const getDefaultCurrentUrlIsDifferentThanExpectedUrlMessage = (
  expectedUrl: string
) => {
  return `current URL is different than expected URL: '${expectedUrl}'.`;
};

export const getDefaultCurrentUrlIsEqualToExpectedUrlMessage = (
  expectedUrl: string
) => {
  return `current URL is equal to expected URL: '${expectedUrl}'.`;
};

export const getDefaultIsNotClickableMessage = (htmlElement: ElementFinder) => {
  // tslint:disable-next-line: max-line-length
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_NOT_CLICKABLE_MESSAGE}. ${elementHelperGlobalConstants.POSSIBLE_IT_IS_NOT_PRESENT_OR_VISIBLE_MESSAGE}, ${elementHelperGlobalConstants.OR_IT_MAY_BE_DISABLED_MESSAGE}.`;
};

export const getDefaultIsNotPresentMessage = (htmlElement: ElementFinder) => {
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_NOT_PRESENT_MESSAGE}.`;
};

export const getDefaultIsNotVisibleMessage = (htmlElement: ElementFinder) => {
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_NOT_VISIBLE_MESSAGE}.`;
};

export const getDefaultIsStillPresentMessage = (htmlElement: ElementFinder) => {
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_STILL_PRESENT_MESSAGE}.`;
};

export const getDefaultIsNotTappableMessage = (htmlElement: ElementFinder) => {
  // tslint:disable-next-line: max-line-length
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_NOT_TAPPABLE_MESSAGE}. ${elementHelperGlobalConstants.POSSIBLE_IT_IS_NOT_PRESENT_OR_VISIBLE_MESSAGE}, ${elementHelperGlobalConstants.OR_IT_MAY_BE_DISABLED_MESSAGE}.`;
};

export const getDefaultIsStillVisibleMessage = (htmlElement: ElementFinder) => {
  return `${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}' ${elementHelperGlobalConstants.IS_STILL_VISIBLE_MESSAGE}.`;
};

export const getDeafultTextTextIsStillPresentOnElementMessage = (
  htmlElement: ElementFinder,
  text: string
) => {
  return `text '${text}' is still present on ${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}'.`;
};

export const getDefaultTextTextNotPresentOnElementMessage = (
  htmlElement: ElementFinder,
  text: string
) => {
  return `text '${text}' not present on ${elementHelperGlobalConstants.ELEMENT_WITH_LOCATOR_MESSAGE} '${htmlElement.parentElementArrayFinder.locator_}'.`;
};
