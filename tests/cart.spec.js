const { test } = require('@playwright/test');

const HomePage = require('../src/pages/HomePage');
const SearchPage = require('../src/pages/SearchPage');
const ProductPage = require('../src/pages/ProductPage');
const CartPage = require('../src/pages/CartPage');

test.describe('Carrinho de compras', () => {

  test.use({
    storageState: 'auth.json'
  });

  test('Adicionar Dipirona ao carrinho', async ({ page }) => {

    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.open();

    // SKU Dipirona
    await search.searchBySku('900702');

    // abre detalhe do produto
    await search.openProduct();

    // comprar
    await product.buyProduct();

    // abrir carrinho
    await cart.openCart();

    // validação
    await cart.validateProductAdded();
  });

});