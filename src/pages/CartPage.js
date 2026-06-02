const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartIcon =
      '#rnk-comp-header-dropdown-dropdown-carrinho a.nav-link';

    this.cartTitle =
      'h2';
  }

  async openCart() {
    await this.page.waitForSelector(
      this.cartIcon,
      { timeout: 15000 }
    );

    await this.page.locator(this.cartIcon).click();
  }

  async validateProductAdded() {
    await expect(
      this.page.locator(this.cartTitle)
    ).toContainText(
      'Entrega 1 - Drogaria São Paulo - 1 item'
    );
  }
}

module.exports = CartPage;