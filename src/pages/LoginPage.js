const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = '#rnk-comp-modal-login-input-email';
    this.passwordInput = '#rnk-comp-modal-login-input-senha';
    this.submitButton = '#rnk-comp-modal-login .modal-footer.d-block .d-grid button[type="submit"][form="rnk-comp-modal-login-form"]';
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.page.waitForSelector(this.submitButton, { state: 'visible', timeout: 10000 });
    await this.click(this.submitButton);
  }
}

module.exports = LoginPage;
