# TestSeleniumJavascript
Selenium WebDriver using Javascript, mocha and chai and chai as promised

# How to install
`git clone git@github.com:salsakiuno/TestSeleniumJavascript.git`

# Install libraries
`npm install`

# How to run
`npm test test/amazonFull.test.js`

# Project structure

    ├── ...
    │
    ├── lib                         # Helper methods
    │   ├── base_Page.js            # Generic functionality for tests
    │   └── cartPage.js             # Cart page testing functionality
    │   └── ItemDetailPage.js       # Item detail page testing functionality
    │   └── searchPage.js           # Search page testing functionality

    │
    ├── test                        # Test suite
    │   └── amazonFull.test.js      # Amazon test suit
    │
    ├── utils                       # Utility files for testing
    │   └── locator.js              # HTML and CSS identifier for elements to test
    │
    ├── ...


# Bonus point
I didn't have enough time to do the reporting bonus point
but I investigated and "mochawesome-report" would be a nice option to do.
