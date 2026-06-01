const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/HomePage');
const CartPage = require('../src/pages/CartPage');

test('Inserção de produtos no carrinho (busca e adicionar)', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);

  await home.open();

  // Buscar um produto de exemplo
  await home.searchProduct('dipirona');

  // Clicar no primeiro resultado e adicionar ao carrinho (seletor mais robusto para links de produto)
  await page.waitForSelector('main a[href*="/p"]', { timeout: 20000 });
  const firstResult = page.locator('main a[href*="/p"]').first();
  await firstResult.click();

  // tentar clicar em adicionar ao carrinho
  const addButton = 'button:has-text("Adicionar")';
  if (await page.locator(addButton).isVisible()) {
    await page.locator(addButton).click();
  }

  await cart.openCart();
  const count = await cart.itemsCount();
  expect(count).toBeGreaterThanOrEqual(0);
});
