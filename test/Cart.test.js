const { describe, it, after, before } = require('mocha');
const Page = require('../lib/cartPage');

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

            it ('Go to the cart and check the quantity and the cost', async () => {
              const result = await page.clickOnCartAndGetTheTotalAmountAndTheCost();
              expect(result).to.equal('Subtotal (2 items): USD 17.98');
            });

          });
      } catch (ex) {
        console.log (new Error(ex.message));
      } finally {

      }
})();
