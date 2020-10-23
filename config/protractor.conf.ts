/**
 * This file consists Multiple Browser configurations for Protractor.
 * This configuration should be used if same UI tests needs to be run in different browser in single shot.
 */
import { browser, Config } from 'protractor';

const { ConsoleReporter } = require('@serenity-js/console-reporter'),
  { ArtifactArchiver } = require('@serenity-js/core'),
  { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
  {
    Photographer,
    TakePhotosOfInteractions,
  } = require('@serenity-js/protractor');

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: `${process.cwd()}/.env`,
});

// set default browser
let browserValue = 'chrome';
const isHeadless: boolean = process.argv.includes('--headless');
const isIncognito: boolean = process.argv.includes('--incognito');

interface CapabilitiesObject {
  chrome: {};
  firefox: {};
  'internet explorer': {};
}

const config: Config = {
  params: {
    environment: 'QA',
  },

  framework: 'custom',
  frameworkPath: require.resolve('@serenity-js/protractor/adapter'),
  // frameworkPath: require.resolve('protractor-cucumber-framework'),

  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: process.env.APP_BASE_URL,
  allScriptsTimeout: Number(process.env.GLOBAL_TIMEOUT),

  specs: [`${process.cwd()}/features/**/*.feature`],

  serenity: {
    runner: 'cucumber',
    requirementsDirectory: `${process.cwd()}/features`,
    crew: [
      ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
      new SerenityBDDReporter(),
      ConsoleReporter.withDefaultColourSupport(),
      Photographer.whoWill(TakePhotosOfInteractions),
    ],
  },
  cucumberOpts: {
    format: ['pretty', 'json:target/cucumber_report.json'],
    require: [
      `${process.cwd()}/e2e/**/*.ts`,
      `${process.cwd()}/custom-libraries/**/*.ts`,
    ],
    'require-module': ['ts-node/register'],
    tags: ['~@manual', '~@ignore'],
    //tags: ['@Smoke', '@dummyTag'],
  },

  plugins: [
    {
      package: 'protractor-axe-html-report-plugin',
      displayHelpUrl: false, // Displays the aXe help URL along with the error. Defaults to true.
      displayContext: true, // Displays the HTML of interest. Defaults to true.
      displayPasses: true, // Display pass results. Defaults to true.
      displayViolations: true, // Display violations. Defaults to true.
      standardsToReport: [
        'wcaga',
        'wcag2a',
        'wcag211',
        'wcag21aa',
        'section508',
        'cat.semantics',
        'best-practice',
      ], // A list of standards to report on. If empty, reports on all standards.
      ignoreAxeFailures: false, // If true, aXe failures won't cause the whole test to fail. Defaults to false
      htmlReportPath: 'target/accessibility',
    },

    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        // automaticallyGenerateReport: true,
      },
    },

    {
      package: 'protractor-css-booster',
    },
    {
      package: 'protractor-react-selector',
    },
  ],
  localSeleniumStandaloneOpts: {
    jvmArgs: [
      '-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.150.1.exe',
    ],
  },

  onPrepare: () => {
    require('ts-node/register');
    require('tsconfig-paths/register');
    require('dotenv-safe').config({
      allowEmptyValues: true,
      example: `${process.cwd()}/.env`,
    });
    browser.waitForAngularEnabled(
      process.env.WAIT_FOR_ANGULAR === 'true' ? true : false
    );
    // browser
    //   .manage()
    //   .timeouts()
    //   .implicitlyWait(Number(process.env.IMPLICIT_WAIT));
  },

  onComplete() { },
};
const capabilitiesMap: CapabilitiesObject = {
  firefox: {
    browserName: 'firefox',
    marionette: true,
    acceptInsecureCerts: true,
    'moz:firefoxOptions': {
      w3c: false,
      args: [isHeadless ? '--headless' : '--test-type=browser'],
      prefs: {
        'browser.download.folderList': 2,
        'browser.download.dir':
          process.cwd() +
          `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\firefox`,
        'services.sync.prefs.sync.browser.download.useDownloadDir': true,
        'browser.download.useDownloadDir': true,
        'browser.download.manager.alertOnEXEOpen': false,
        'browser.download.manager.closeWhenDone': true,
        'browser.download.manager.focusWhenStarting': false,
        'browser.download.manager.showWhenStarting': true,
        'browser.helperApps.alwaysAsk.force': false,
        'browser.download.manager.showAlertOnComplete': false,
        'browser.download.manager.useWindow': false,
        'browser.helperApps.neverAsk.saveToDisk':
          'text/plain,text/csv,application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    },
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === 'true' ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
  chrome: {
    browserName: 'chrome',
    platform: 'ANY',
    version: 'ANY',
    'goog:chromeOptions': {
      w3c: false,
      useAutomationExtension: false,
      excludeSwitches: ['enable-automation'],
      args: [
        isHeadless ? '--headless' : '--test-type=browser',
        '--disable-gpu',
        '--test-type=browser',
        '--disable-extensions',
        '--no-sandbox',
        '--disable-infobars',
        '--window-size=1920,1080',
        '--proxy-bypass-list=http://localhost',
        isIncognito ? '--incognito' : '--test-type=browser',
      ],
      prefs: {
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false,
        },
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory:
            process.cwd() +
            `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\chrome`,
        },
      },
    },
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === 'true' ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
  'internet explorer': {
    browserName: 'internet explorer',
    ignoreProtectedModeSettings: true,
    platform: 'ANY',
    version: '11',
    args: [
      '--silent',
      '--no-sandbox',
      '--test-type=browser',
      '--lang=US',
      '--start-maximized',
    ], //,'--headless', '--disable-gpu',
    prefs: {
      download: {
        prompt_for_download: false,
        directory_upgrade: true,
        extensions_to_open: '',
        default_directory:
          process.cwd() +
          `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\ie`,
      },
    },
    ensureCleanSession: true,
    nativeEvents: false,
    allowBlockedContent: true,
    'allow-blocked-content': true,
    ignoreZoomSetting: true,
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === 'true' ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
};

// get browser name from the CLI and set capability accordingly
process.argv.slice(3).forEach((argument) => {
  if (argument.includes('browser')) {
    const value: string = argument.split('=')[1];
    if (Object.prototype.hasOwnProperty.call(capabilitiesMap, value)) {
      browserValue = value;
      return;
    }
  }
});

config.capabilities = capabilitiesMap[browserValue];
config.directConnect = browserValue.includes('explorer') ? false : true;

exports.config = config;
