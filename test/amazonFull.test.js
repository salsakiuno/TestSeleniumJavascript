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

(async function TestSuite() {
    try {
        describe ('Amazon Test', async function () {
            this.timeout(50000);
            let page;

            beforeEach (async () => {
                page = new Page();
                // 1. Go to https://www.amazon.com
                await page.visit('https://amazon.com');
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('Find search box and search button', async () => {
              let result = await page.findInputAndButton();
              expect(result.inputEnabled).to.equal(true);
              expect(result.buttonText).to.include('Go');

              // 2. Search for "hats for men"
              result = await page.submitKeywordAndSearch('hats for men');
              expect(result).to.equal('0');

              // 3. Add first hat to Cart with quantity 2
              result = await page.clickOnTheFirstResultandAddItToTheCart(dropDownQuantityTwo);
              expect(result).to.equal('Added to Cart');

              // 4. Open cart and assert total price and quantity are correct
              result = await page.clickOnCartAndGetTheTotalAmountAndTheCost(dropDownQuantityTwo);
              const menHatsTotal = result.pItem*2;
              const menPricePerHat = result.pItem;
              expect(result.result.quantity).to.equal('2');
              expect(result.result.totalPrice).to.equal(menHatsTotal);

              // 5. Search for "hats for women"
              result = await page.submitKeywordAndSearch('hats for women');
              expect(result).to.equal('0');

              // 6. Add first hat to Cart with quantity 1
              result = await page.clickOnTheFirstResultandAddItToTheCart(dropDownQuantityOne);
              expect(result).to.equal('Added to Cart');

              // 7. Open cart and assert total price and quantity are correct
              result = await page.clickOnCartAndGetTheTotalAmountAndTheCost(dropDownQuantityOne);
              const womanPricePerHat = result.pItem;
              const womenAndMenTotalPrice = Number((menHatsTotal + womanPricePerHat).toFixed(2));
              expect(result.result.quantity).to.equal('1');
              expect(result.result.totalPrice).to.equal(womenAndMenTotalPrice);

              // 8. Change the quantity for item selected at step 3 from 2 to 1 item in Cart
              // 9. Assert total price and quantity are changed correctly
              result = await page.changeQuantityOfItemsOnTheCart();
              expect(result.quantity).to.equal('Subtotal (2 items):');
              expect(result.totalPrice).to.equal(Number((menPricePerHat + womanPricePerHat).toFixed(2)));

            });

          });
      } catch (ex) {
        console.log (new Error(ex.message));
      } finally {

      }
})();
