# TestSeleniumJavascript
Selenium WebDriver using Javascript, mocha and chia

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

    
