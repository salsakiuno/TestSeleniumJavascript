const Page = require("./base_page");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelectorCss = locator.searchButtonSelectorCss;
const resultFirstHatForMen = locator.resultFirstHatForMenCss;

let searchInput, searchButton, resultStat, searchresult;

Page.prototype.findInputAndButton = async function () {
    searchInput = await this.findByName(searchInputSelectorName);
    searchButton = await this.findByCss(searchButtonSelectorCss);

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

    Page.prototype.submitKeywordAndGetResult = async function() {
    await this.findInputAndButton();
    await this.write(searchInput, 'hats for men');
    await searchButton.click();

    searchresult = await this.findByCss(resultFirstHatForMen)

    const result = await this.driver.wait(async function(){
      const firstResultText =  await searchresult.getText();
      return firstResultText;
    }, 5000);
    return result;

}; module.exports = Page;
