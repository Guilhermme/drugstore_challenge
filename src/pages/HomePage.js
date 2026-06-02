const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.loginButton = 'a.rnk-link-login:not(.order-first)';
    this.registerLink = 'a[href="#rnk-comp-modal-login-cadastro"]';

    this.searchInput = 'input[placeholder="O que você precisa?"]';

    this.botaoAceitarCookies =
      'button.rnk-btn-aceitar-termos-e-condicoes';

    this.productCard =
      'a[href*="/p"]';
  }

  async open() {
    await this.goto('https://www.drogariasaopaulo.com.br/');
  }

  async goToLogin() {
    await this.page.locator(this.loginButton).click();

    await this.page.waitForSelector(
      '#rnk-comp-modal-login',
      {
        state: 'visible',
        timeout: 20000
      }
    );
  }
}

module.exports = HomePage;