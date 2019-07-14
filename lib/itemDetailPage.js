const Page = require("./searchPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const dropDownSelector = locator.dropDowntQuantityId;
const addToCartButton = locator.addToCartButtonId;

const resultItemsAddedSelector = locator.resultItemsAddedToCartCss;

let dropDown, selectQuantity, addToCart, addResult;

Page.prototype.clickOnTheFirstResultandAddTwoToTheCart = async function(searchTxt, quanityElement) {
    await this.submitKeywordAndSearch(searchTxt);

    dropDown = await this.findById(dropDownSelector);
    dropDown.click()

    selectQuantity = await this.findByCss(quanityElement);
    await selectQuantity.click();

    addToCart = await this.findById(addToCartButton);
    await addToCart.click();


    addResult = await this.findByCss(resultItemsAddedSelector);

    const result = await this.driver.wait(async function(){
      const addedSuccessResult = await addResult.getText();
      return addedSuccessResult;
    }, 5000);
    return result;

};
module.exports = Page;
