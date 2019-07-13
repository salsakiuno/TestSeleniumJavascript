const Page = require("./itemDetailPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const goToTheCart = locator.goToCartButtonCss;
const subTotalAmountOfItems = locator.subTotalOfTwoHatsForMenItemsCss;
const subtotalAmountOfMoney = locator.subTotalAmountForHatsForMenCss;

let cartButton, itemsAmount, costAmount;

Page.prototype.clickOnCartAndGetTheTotalAmountAndTheCost = async function() {
    await this.clickOnTheFirstResultandAddTwoToTheCart();

    cartButton = await this.findByCss(goToTheCart);

    cartButton.click()

    itemsAmount = await this.findByCss(subTotalAmountOfItems);
    costAmount = await this.findByCss(subtotalAmountOfMoney);


    const result = await this.driver.wait(async function(){
      const itemResult = await itemsAmount.getText();
      return itemResult;
    }, 5000);
    return result;
};
module.exports = Page;
