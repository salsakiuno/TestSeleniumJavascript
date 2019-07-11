const {Builder, By, until} = require('selenium-webdriver');

const BasePage = require("../lib/base_page");
var assert = require('assert');

const basePage = new BasePage;
basePage.visit('https://www.amazon.com/');


describe('search on amazon a receive a result', async () => {
  it("search", async () => {
    basePage.click("#nav-search > form > div.nav-fill > div.nav-search-field > input")
    basePage.write("#nav-search > form > div.nav-fill > div.nav-search-field > input", "hats for men")
    basePage.click("#nav-search > form > div.nav-right > div > input")
    const hatText = basePage.find(
      "#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div.a-section.a-spacing-none.a-spacing-top-small > h2 > a > span"
    ).then((value)=>{
      assert.equal(value, "Top Level Structured Classic Plain Baseball Cap Unisex Hat Adjustable Velcro Max Comfort");
    });
  });
});


//basePage.quit();
