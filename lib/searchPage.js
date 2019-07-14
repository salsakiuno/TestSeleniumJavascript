const Page = require("./basePage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelector = locator.searchButtonSelectorCss;
const resultFirstHatForMen = locator.resultFirstCss;
const resultFirstHatForWomen = locator.resultFirstHatForWomenCss;

let searchInput, searchButton, searchResult;

Page.prototype.findInputAndButton = async function () {
  searchInput = await this.findByName(searchInputSelectorName);
  searchButton = await this.findByCss(searchButtonSelector);

  const result = await this.driver.wait(async function () {
    const searchButtonText = await searchButton.getAttribute('value');
    const searchInputEnableFlag = await searchInput.isEnabled();

    return {
        inputEnabled: searchInputEnableFlag,
        buttonText: searchButtonText
    }
  }, 5000);
  return result;
};

Page.prototype.submitKeywordAndSearch = async function(searchTxt) {
    await this.findInputAndButton();
    await this.write(searchInput, searchTxt);
    await searchButton.click();

    searchResult = await this.findByCss(resultFirstHatForMen);

    const result = await this.driver.wait(async function(){
      const firstResultAtr =  await searchResult.getAttribute('data-index');
      return firstResultAtr;
    }, 5000);

    await searchResult.click();
    return result;
};

module.exports = Page;
