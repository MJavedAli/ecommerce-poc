/**
 * cucumber-js (1.x) hooks helps to run specific functions before and after scenarios
 * find more about cucumber 1.x hooks: https://github.com/cucumber/cucumber-js/blob/1.x/docs/support_files/hooks.md
 */
import { Check, equals } from '@serenity-js/assertions';
import { actorCalled, engage } from '@serenity-js/core';
import { TakeScreenshot } from '@serenity-js/protractor';
import { After, Before, BeforeAll } from 'cucumber';
import { browser } from 'protractor';
import { Actors } from '../serenity/actors';
/**
 * Maximize the browser
 */
BeforeAll(async () => {

  await browser.manage().window().maximize();
});

/**
 * As per Serenity Js guidelines, attach an Actor before each test to add capability to take picture at the end of the test
 */
Before(() => {
  engage(new Actors());
});

/**
 * Configure serenity to take screenshot if any scenario failed
 */
After((scenario) =>
  actorCalled('Inspector').attemptsTo(
    Check.whether(scenario.result.status, equals('failed')).andIfSo(
      TakeScreenshot.of(scenario.pickle.name)
    )
  )
);
