const { describe, it, after, before } = require('mocha');
const Page = require('../lib/itemDetailPage');
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

            it ('Enter on first item result and add Two items in the cart', async () => {
              const result = await page.clickOnTheFirstResultandAddTwoToTheCart('hats for men', dropDownQuantityTwo);
              expect(result).to.equal('Added to Cart');
            });

          });
      } catch (ex) {
        console.log (new Error(ex.message));
      } finally {

      }
})();
