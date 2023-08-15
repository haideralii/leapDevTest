# Requirements

  * node latest version installed
  * Playwright
  * Visual Studio or any other IDE

#### About Project I have used Playwright with JS for the assigned assignment, Project structure is as follows

```
    - fixtures
        - base.js
    - models
        - page-name.js
    - payloads
        - payload-of-controller.js
    - schemas
        - schema-of-controller.js
    - tests
        - tests-of-controller.js
    - utils
        - helper-methods
    - .env.dev 
    - global-setup.js
    - end-points.js
    - package.json
    - playwright.config.js
```

###### I have used page object model in my api automation framework, like for each controller we have different test file, model file, payload file, schema file


###### I'm creating unique id in my global setup file and then using in my apis

###### Then in tests file, before executing tests I'm creating specific data in beforeAll to keep our tests clean and consize and using afterAll to keep the DB clean

###### I have used different kind of data driven techniques, like used .env file to keep base_url there and there was nothing security related item so that's why didn't create env.example file and just pushed .env file, I have also used json as well faker node package manager to create data unique each time and to keep data readeable instead of using random numbers or uuid

## Install the required dependencies:

```
npm install
```

## To execute tests run following command

```
npm test
```

run following command to view HTML report

```
npx playwright show-report
```
