/**
 * This file contains Accessibility step definitions.
 * Protractor-Axe-Plugin scans the target webpage and validates the page against WAG standards
 * The Axe validation rules are configured in chrome.config.ts "plugin" section
 */
import { Given } from 'cucumber';
import { runAxeTest } from 'protractor-axe-html-report-plugin';

import { expect } from '../assert/expect';

interface AxeResponse {
  violations: string[];
}

Given(
  /^user check the accessibility for element "(.*)" in page "(.*)"$/,
  async (element: string, pageName: string) => {
    let violationCount = 0;
    const result: AxeResponse = await runAxeTest(
      `Accessibility check for Page: ${pageName}`,
      element
    );
    violationCount = result.violations.length;
    await expect(
      violationCount,
      `Accessibility Error Count: ${violationCount} with violations as ${JSON.stringify(
        result.violations,
        null,
        '\t'
      )} . \nCheck accessibility report (target > accessibility ) for details.`
    ).to.be.equal(0);
  }
);

Given(
  /^user run accessability test on the current page named as "(.*)"$/,
  async (pageName: string) => {
    let violationCount = 0;
    const result: AxeResponse = await runAxeTest(
      `Accessibility check for Page: ${pageName}`
    );
    violationCount = result.violations.length;
    await expect(
      violationCount,
      `Accessibility Error Count: ${violationCount} . Check accessibility report (target > accessibility ) for details.`
    ).to.be.equal(0);
  }
);
