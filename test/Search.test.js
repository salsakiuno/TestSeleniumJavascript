
const { describe, it, after, before } = require('mocha');
const Page = require('../lib/searchPage');

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
              const result = await page.findInputAndButton();
              expect(result.inputEnabled).to.equal(true);
              expect(result.buttonText).to.include('Go');
            });

            it ('Enter text and search first result', async () => {
              const result = await page.submitKeywordAndGetResultforHatsForMen();
              expect(result).to.equal('Top Level Structured Classic Plain Baseball Cap Unisex Hat Adjustable Velcro Max Comfort');
            });

          });
      } catch (ex) {
        console.log (new Error(ex.message));
      } finally {

      }
})();
