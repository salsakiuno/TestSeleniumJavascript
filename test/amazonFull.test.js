const { describe, it, after, before } = require('mocha');
const Page = require('../lib/cartPage');
const locator = require('../utils/locator');

const dropDownQuantityTwo = locator.dropDownQuantityTwoCss;
const dropDownQuantityOne = locator.dropDownQuantityOneCss;

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Amazon automated testing', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://amazon.com');
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('Find search box and search button', async () => {
              let result = await page.findInputAndButton();
              expect(result.inputEnabled).to.equal(true);
              expect(result.buttonText).to.include('Go');

              result = await page.submitKeywordAndSearch('hats for men');
              expect(result).to.equal('0');

              result = await page.clickOnTheFirstResultandAddItToTheCart(dropDownQuantityTwo);
              expect(result).to.equal('Added to Cart');

              result = await page.clickOnCartAndGetTheTotalAmountAndTheCost(dropDownQuantityTwo);
              expect(result.result.quantity).to.equal('2');
              expect(result.result.totalPrice).to.equal(result.pItem*2);
              const menHatsTotal = result.pItem*2;
              const menPricePerHat = result.pItem;

              result = await page.submitKeywordAndSearch('hats for women');
              expect(result).to.equal('0');

              result = await page.clickOnTheFirstResultandAddItToTheCart(dropDownQuantityOne);
              expect(result).to.equal('Added to Cart');

              result = await page.clickOnCartAndGetTheTotalAmountAndTheCost(dropDownQuantityOne);
              expect(result.result.quantity).to.equal('1');
              expect(result.result.totalPrice).to.equal(Number((menHatsTotal + result.pItem).toFixed(2)));
              const womenAndMenTotalPrice = Number((menHatsTotal + result.pItem).toFixed(2));
              const womanPricePerHat = result.pItem;

              result = await page.changeQuantityOfItemsOnTheCart()
              expect(result.quantity).to.equal('Subtotal (2 items):');
              expect(result.totalPrice).to.equal(Number((menPricePerHat + womanPricePerHat).toFixed(2)));

            });

          });
      } catch (ex) {
        console.log (new Error(ex.message));
      } finally {

      }
})();
