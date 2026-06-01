const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = 'a.rnk-link-login:not(.order-first)';
    this.registerLink = 'a[href="#rnk-comp-modal-login-cadastro"]';
    this.searchInput = 'input[placeholder="O que você precisa?"]';
    this.botaoAceitarCookies = 'button.rnk-btn-aceitar-termos-e-condicoes';
  }

  async open() {
    await this.goto('https://www.drogariasaopaulo.com.br/');
  }

  async gerenciarCookiesSeVisivel() {
    try {
      // Espera curta: se o banner aparecer em até 3 segundos, interagimos com ele
      const botao = this.page.locator(this.botaoAceitarCookies);
      if (await botao.isVisible({ timeout: 3000 })) {
        await botao.scrollIntoViewIfNeeded();
        await botao.click({ force: true });
        // Garante que o modal sumiu completamente antes do próximo passo
        await botao.waitFor({ state: 'hidden', timeout: 3000 });
        console.log('Botão de cookies aceito com sucesso');
      }
    } catch (error) {
      // Banner não apareceu, já foi aceito, ou erro na espera
      console.log('Banner de cookies não apareceu ou já foi aceito');
    }
  }

  async goToLogin() {
    await this.page.locator(this.loginButton).click();
    await this.page.waitForSelector('#rnk-comp-modal-login', { state: 'visible', timeout: 20000 });
  }

  async goToRegister() {
    await this.click(this.registerLink);
    await this.page.waitForSelector('#rnk-comp-modal-login-form-cadastro', { state: 'visible', timeout: 20000 });
  }

  async searchProduct(name) {
    await this.fill(this.searchInput, name);
    await this.page.locator(this.searchInput).press('Enter');
    await this.page.waitForSelector('article, .product-card, .search-results', { timeout: 10000 }).catch(() => {});
  }
}

module.exports = HomePage;
