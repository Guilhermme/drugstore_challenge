const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {

  constructor(page) {
    super(page);

    this.cartIcon =
      '#rnk-comp-header-dropdown-dropdown-carrinho a.nav-link';
  }

  async openCart() {

    await this.page.locator(this.cartIcon).click();

    await this.page.waitForLoadState('networkidle');
  }

  async validateProductAdded() {

    await expect(
      this.page.getByRole('heading', {
        name: /Entrega 1 - Drogaria São Paulo/i
      })
    ).toBeVisible();

  }
}

module.exports = CartPage;