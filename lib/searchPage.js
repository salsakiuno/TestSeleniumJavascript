const Page = require("./base_page");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelectorCss = locator.searchButtonSelectorCss;
const resultFirstHatForMen = locator.resultFirstHatForMenCss;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function () {
    searchInput = await this.findByName(searchInputSelectorName);
    searchButton = await this.findByCss(searchButtonSelectorCss);
    console.log('search button',searchButton);

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
    resultStat = await this.findByCss(resultFirstHatForMen);
    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
}; module.exports = Page;
