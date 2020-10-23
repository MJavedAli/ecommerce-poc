## Framework Guidelines:

#### Managing project configuration:

Framework library is intend to support test codes by providing various re-usable methods. These re-usable files are placed in the src folder.

- **support** : support folder contains framework plugin codes such as accessibility, visual comparison, assertions etc.
- **utils** : util folder contains framework helper files. Specifically, element.helper.ts file contains the logic for regular element operations by enhancing selenium native methods.

This support code is not meant to change in frequent basis. No test specific (page object model) codes should be placed inside the src folder.

#### Managing gherkin feature files:

The features should be written in **test/e2e/features** folder. Each feature (or group of similar features) should have its own sub-directory.

#### Managing Page Object Model:

The page object model should be placed **test/e2e/features** folder.

- **pageObjects**: _path_ - e2e/model/pageObjects
  - This folder should contain only page elements.
  - Only CSS selector should be used to identify the elements.
  - No driver initialization is needed, 'element' module from protractor automatically handles driver initialization.
  - Each application sub page should be mapped with a sub folder.
  - Each sub page should have it own element class.
  - This should have its own index.ts file to make the module globally available outside the folder.
  - Any common page objects should be placed inside the common folder.

* **stepFunctions**: _path_ - e2e/model/stepFunctions

  - This folder should contain only re-usable function specific to the page.
  - SubPage folder structure should be maintained.
  - Each function class file should use mapped element class object.
  - one function class should not have any method which is not related to the page.
  - Any common page function should be placed inside the common folder.
  - This should have its own index.ts file to make the module globally available outside the folder.

* **stepDefinitions**: _path_ - e2e/model/stepDefinitions

  - This folder should contain only glue codes between gherkin steps and re-usable functions.
  - The re-usable functions written in the previous stage should be grouped here to form a step definition.
  - One Definition class can import multiple function classes.
  - Sub page folder structure should be maintained as all the above stages.
  - Each page step definitions should only contain the glue codes related to the page.

#### General Guidelines:

- No browser.sleep() method should be used until and unless there is a dire need.
- Dynamic wait time should be handled by promises and Expected conditions.
- helper methods should not be placed inside page object model folder (test/e2e)
