const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    this.buyButton =
      'a.buy-button.buy-button-ref';
  }

  async buyProduct() {
    await this.page.waitForSelector(
      this.buyButton,
      { timeout: 15000 }
    );

    await this.page
      .locator(this.buyButton)
      .first()
      .click();
  }
}

module.exports = ProductPage;