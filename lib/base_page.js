require("chromedriver");
const {Builder, By, until} = require('selenium-webdriver');


class BasePage {
constructor() {
      this.driver = new Builder().forBrowser('chrome').build();
}

      async visit(url) {
        await this.driver.get(url);
      }

      async quit() {
        await this.driver.quit();
      }

      async find(el, waitTimeOut) {
        let result;
        await this.driver.wait(()=>
          this.driver.findElement(By.css(el))
            .then(
              (el) => {
                result = el;
                return true;
              }
            ).waitTimeOut);
      return result;
      }

      async write(el, txt) {
        await this.find(el, 20000).sendKeys(txt);
      }

      async click(el){
          await this.find(el, 20000).click();
      }

}
module.exports = BasePage;
