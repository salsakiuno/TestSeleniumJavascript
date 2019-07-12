const Page = require("./searchPage");
const locator = require('../utils/locator');
const {Builder, By, until} = require('selenium-webdriver');

const dropDownSelector = locator.dropDowntQuantityId;
const dropDownSelectQuantitySelector = locator.dropDownQuantityTwoCss;
const addToCartButton = locator.addToCartButtonId;
const resultItemsAddedSelector = locator.resultItemsAddedToCartCss;

let dropDown, selectQuantity, addToCart, addResult;

Page.prototype.clickOnTheFirstResultandAddTwoToTheCart = async function() {
    await this.submitKeywordAndGetResultforHatsForMen();

    dropDown = await this.findById(dropDownSelector);
    dropDown.click()
    //this.driver.executeScript("document.getElementByClassName('a-dropdown-prompt').setAttribute('value', '2')");
    selectQuantity = await this.findByCss(dropDownSelectQuantitySelector);
    await selectQuantity.click();

//    There is a bug on the amazon Website when I press the quantity on the drop down
    // const actions = this.driver.actions({bridge: true});
    // var elem=await this.driver.findElement(By.id("nav-link-accountList"));
    // await actions.move({duration:5000,origin:elem,x:1800,y:500}).perform();

    addToCart = await this.findById(addToCartButton);
    console.log(addToCart);
    await addToCart.click();


    addResult = await this.findByCss(resultItemsAddedSelector);

    const result = await this.driver.wait(async function(){
      const addedSuccessResult =  await addResult.getText();
      return addedSuccessResult;
    }, 5000);
    return result;

};
module.exports = Page;
