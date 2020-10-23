/**
 * Global timeout set for cucumber steps
 */
import { setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';

setDefaultTimeout(browser.allScriptsTimeout);
