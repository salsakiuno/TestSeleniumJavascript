const Page = require("./itemDetailPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const goToTheCart = locator.goToCartButtonCss;
const subTotalAmountOfItems = locator.subTotalOfTwoHatsForMenItemsCss;
const subtotalAmountOfMoney = locator.subTotalAmountForHatsForMenCss;
const dropDownForMenHat = locator.dropDownHatsForMenSelectorCss;
const dropDownSelectorOne = locator.dropDownQuantityforHatsforMenCss;
const totalElementsInTheCart = locator.subTotaleElementsCss;

let cartButton, itemsAmount, costAmount, pricePerItem, dropDown, dropDownSelector, itemsAmountTotal;

Page.prototype.clickOnCartAndGetTheTotalAmountAndTheCost = async function(quanityElement) {
  //await this.clickOnTheFirstResultandAddTwoToTheCart(searchtxt, quanityElement);

  const pItem = this.priceAtr;

  cartButton = await this.findByCss(goToTheCart);

  cartButton.click()

  itemsAmount = await this.findByCss(subTotalAmountOfItems);
  costAmount = await this.findByCss(subtotalAmountOfMoney);

  const result = await this.driver.wait(async function() {
    const itemQuantityResult = await itemsAmount.getText();
    const itemPriceResult =  await costAmount.getText();

    const regex = /\d*\.?\d/g;
    const priceTotal = itemPriceResult.match(regex);
    const priceTotalFloat = parseFloat(priceTotal.join(''));

    return {
      quantity: itemQuantityResult,
      totalPrice: priceTotalFloat
    }
  }, 5000);

  return {
    result: result,
    pItem:pItem
  };
}

Page.prototype.changeQuantity = async function() {
  const dropDown =await this.findByCss(dropDownForMenHat);
  dropDown.click();

  const dropDownSelector =await this.findByCss(dropDownSelectorOne);
  dropDownSelector.click();
  await this.driver.sleep(1000);


  itemsAmountTotal = await this.findByCss(totalElementsInTheCart);
  costAmount = await this.findByCss(subtotalAmountOfMoney);



  const result = await this.driver.wait(async function() {
    const itemQuantityResult = await itemsAmountTotal.getText();
    const itemPriceResult =  await costAmount.getText();

    const regex = /\d*\.?\d/g;
    const priceTotal = itemPriceResult.match(regex);
    const priceTotalFloat = parseFloat(priceTotal.join(''));

    return {
      quantity: itemQuantityResult,
      totalPrice: priceTotalFloat
    };
  }, 5000);

  return result;
};

module.exports = Page;
