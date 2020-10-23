# XYLEM Interview Test Automation Framework

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Table of Contents

- [Get Started](#get-started)
  - [Pre-requisites](#pre-requisites)
  - [Recommended IDE](#recommended-ide)
  - [Install VSCode Extensions](#install-vscode-extensions)
- [Setup Scripts](#setup-scripts)
  - [Install the dependencies:](#install-the-dependencies-)
  - [One Time Setup](#one-time-setup)
  - [Setup Test Environment](#setup-test-environment)
  - [Run Tests](#run-tests)
- [Multi-Browser Testing](#multi-browser-testing)
- [Lint Automation Code](#lint-automation-code)
- [Test Reports](#test-reports)
- [Serenity Dashboard](#serenity-dashboard)
- [Code-Documentation](https://gecgithub01.walmart.com/pages/GD-CCPA-DataEnablement/GD_CCPA_QA_Automation/docs/)

## Get Started

#### Pre-requisites

1. NodeJS installed globally in the system.Download the MSI [for windows] here- https://nodejs.org

2. Install JRE (1.8.x)

> JAVA_HOME should be properly set. Do not include the /bin directory when setting JAVA_HOME

3. Browser version :

> Chrome >= 74

> Firefox >= 69

> IE >= 11

#### Recommended IDE

VSCode

#### Install VSCode Extensions


#### Install the dependencies:

```
// run the command inside the root
npm install
```

#### One Time Setup

> The below script will download the driver binaries.

```
npm run setup
```

#### Setup Test Environment

> Test environment can be configured in the **.env** file in project root directory as well as custom directory

```js
# App Configuration
# Test Configuration
WAIT_FOR_ANGULAR=false // set true, if testing angular apps
RUN_TEST_PARALLEL=false // set true, if you want to run features in parallel
MAX_BROWSER_INSTANCE=1 // if parallel is set to true, specify how many browser instances you need
GLOBAL_TIMEOUT=11000 // global timeout in milliseconds
IMPLICIT_WAIT=6000 // implicit timeout in milliseconds
TEST_REPORT_DIRECTORY=target // specify the folder name where you want to generate all reports
```
</details>

#### Run Tests

Different run configurations can be set in package.json file.

````ts
// to run all tests. By-default tests will be executed in chrome.
npm run e2e

#### Generate Reports

To generate Serenity Report, you need to run below command:

```ts
// to generate serenity report
npm run report

// to generate jenkins friendly xml report
npm run report:jenkins
````

Reports will be available in target > site > serenity > index.html

## Multi-Browser Testing

You can execute tests in your favorite browser just passing some extra flags from CLI.
By default , all tests executes on **_Chrome_** browser

```ts
// by default it executes on Chrome
npm run e2e

// Run tests on Firefox
npm run e2e -- --browser=firefox

//Run tests on Internet Explorer
npm run e2e -- --browser="internet explorer"

// to run in chrome headless
npm run e2e -- --headless

// to run in firefox headless
npm run e2e -- --browser=firefox --headless

```

## Lint Automation Code

```
//lint your code
npm run lint

// fix the linting issues automatically
npm run lint:fix
```

#### Test Reports

If **target** folder is configured as your base reporting directory in **.env** file, then execution reports would be available in **target** folder.

> Accessibility reports --> target/accessibility

> Serenity reports --> target/site/serenity/index.html

