const Page = require('../lib/searchPage');
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const dropDownSelector = locator.dropDowntQuantityName;
const dropDownSelectQuantitySelectos = locator.dropDownQuantityTwoId;
const addToCartButton = locator.addToCartButtonCss;
const resultItemsAddedSelector = locator.resultItemsAddedToCartCss;

let dropDown, selectQuantity, addToCart, addResult;

Page.prototype.clickOnTheFirstResultandAddTwoToTheCart = async function() {
    await this.submitKeywordAndGetResultforHatsForMen();
    console.log("trying it ==== ¡ OK !");
    console.log("this is Search Result:", Page.prototype.searchResult);
    await searchResult.click();

    dropDown = await this.findByName(dropDownSelector);
    selectQuantity = await this.findById(dropDownSelectQuantitySelectos);
    addToCart = await this.findByCss(addToCartButton);

    await dropdown.click();
    await selectQuantity.click();
    await addToCart.click();

    addResult = await this.findByCss(resultItemsAddedSelector);

    const result = await this.driver.wait(async function(){
      const addedSuccessResult =  await addResult.getText();
      return addedSuccessResult;
    }, 5000);
    return result;

}; module.exports = Page;
