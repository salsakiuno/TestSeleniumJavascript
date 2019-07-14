const Page = require("./searchPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const dropDownSelector = locator.dropDowntQuantityId;
const addToCartButton = locator.addToCartButtonId;
const resultItemsAddedSelector = locator.resultItemsAddedToCartCss;
const pricePerItem = locator.pricePerItemId;

let dropDown, selectQuantity, addToCart, addResult, priceResult;

Page.prototype.priceAtr;

Page.prototype.clickOnTheFirstResultandAddItToTheCart = async function(quanityElement) {
    //await this.submitKeywordAndSearch(searchTxt);

    pricePerItemGetPrice = await this.findById(pricePerItem);
    const iprice = await pricePerItemGetPrice.getText();
    const regex = /\d*\.?\d/g;
    const pricePerItemTotal = iprice.match(regex);
    this.priceAtr = parseFloat(pricePerItemTotal.join(''));

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
