const { test } = require('@playwright/test');

const HomePage = require('../src/pages/HomePage');
const SearchPage = require('../src/pages/SearchPage');
const ProductPage = require('../src/pages/ProductPage');
const CartPage = require('../src/pages/CartPage');

test.describe('Carrinho de Compras', () => {

  test.use({
    storageState: 'auth.json'
  });

  test('Adicionar produto ao carrinho', async ({ page }) => {

    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.open();

    await search.searchBySku('900702');

    await search.openProduct();

    await product.buyProduct();

    await cart.openCart();

    await cart.validateProductAdded();

  });

});