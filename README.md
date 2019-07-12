# TestSeleniumJavascript
Selenium WebDriver using node, mocha and chia

# How to install 
clone the repo

# Install libraries 
`npm install`

# How to run 
`npm test test/amazon.test.js`

# Project structure

    ├── ...
    │
    ├── lib                         # Helper methods
    │   ├── base_Page.js             # Generic functionality for tests
    │   └── searchPage.js            # Search page testing functionality
    │
    ├── test                        # Test suite
    │   └── homePage.test.js        # Testing in Amazon search
    │
    ├── utils                       # Utility files for testing
    │   └── locator.js              # HTML and CSS identifier for elements to test
    │
    ├── ...
