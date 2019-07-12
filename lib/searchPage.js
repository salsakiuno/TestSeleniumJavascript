const Page = require("./base_page");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelector = locator.searchButtonSelectorCss;
const resultFirstHatForMen = locator.resultFirstHatForMenCss;

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

Page.prototype.submitKeywordAndGetResultforHatsForMen = async function() {
    await this.findInputAndButton();
    await this.write(searchInput, 'hats for men');
    await searchButton.click();

    searchResult = await this.findByCss(resultFirstHatForMen)

    const result = await this.driver.wait(async function(){
      const firstResultText =  await searchResult.getText();
      return firstResultText;
    }, 5000);

    await searchResult.click();
    return result;
};
module.exports = Page;
