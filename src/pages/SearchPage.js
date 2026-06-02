const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput =
      '#rnk-comp-header-form-busca-chaordic fieldset div input';

    this.productCard =
      'div.card.rnk-comp-card-shelf';

    this.productLink =
      'a.collection-image-link';
  }

  async searchBySku(sku) {
    await this.page.waitForSelector(this.searchInput);

    await this.page.fill(this.searchInput, sku);

    await this.page.keyboard.press('Enter');
  }

  async openProduct() {
    await this.page.waitForLoadState('networkidle');

    const product = this.page.locator(this.productLink).first();

    await product.waitFor();

    await product.click();
  }
}

module.exports = SearchPage;