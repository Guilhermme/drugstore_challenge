const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = 'a.rnk-comp-header-dropdown-trigger-carrinho';
    this.cartItems = '.cart-items, .cart-item, .rnk-item-carrinho';
  }

  async openCart() {
    await this.click(this.cartIcon);
  }

  async itemsCount() {
    const elems = await this.page.locator(this.cartItems).count();
    return elems;
  }
}

module.exports = CartPage;
