const Page = require("./itemDetailPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const goToTheCart = locator.goToCartButtonCss;
const subTotalAmountOfItems = locator.subTotalOfTwoHatsForMenItemsCss;
const subtotalAmountOfMoney = locator.subTotalAmountForHatsForMenCss;

let cartButton, itemsAmount, costAmount, pricePerItem;

Page.prototype.clickOnCartAndGetTheTotalAmountAndTheCost = async function(searchtxt, quanityElement) {
    await this.clickOnTheFirstResultandAddTwoToTheCart(searchtxt, quanityElement);

    const pItem = this.priceAtr;

    console.log(pricePerItem);
    cartButton = await this.findByCss(goToTheCart);

    cartButton.click()

    itemsAmount = await this.findByCss(subTotalAmountOfItems);
    costAmount = await this.findByCss(subtotalAmountOfMoney);

    const result = await this.driver.wait(async function(){
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
    console.log(result,pItem);
    return { result: result, pItem:pItem
    };
};
module.exports = Page;
