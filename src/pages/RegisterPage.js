const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameInput = '#rnk-comp-modal-login-cadastro-input-nome';
    this.lastNameInput = '#rnk-comp-modal-login-cadastro-input-sobrenome';
    this.emailInput = '#rnk-comp-modal-login-cadastro-input-email';
    this.cpfInput = '#rnk-comp-modal-login-cadastro-input-cpf';
    this.phoneInput = '#rnk-comp-modal-login-cadastro-input-telefone';
    this.passwordInput = '#rnk-comp-modal-login-cadastro-input-senha';
    this.confirmPasswordInput = '#rnk-comp-modal-login-cadastro-input-confirmar-senha';
    this.submitButton = 'button.rnk-btn-cadastrar';
  }

  async register(data = {}) {
    const { name, lastName, email, cpf, phone, password, confirmPassword } = data;
    if (name) await this.fill(this.nameInput, name);
    if (lastName) await this.fill(this.lastNameInput, lastName);
    if (email) await this.fill(this.emailInput, email);
    if (cpf) await this.fill(this.cpfInput, cpf);
    if (phone) await this.fill(this.phoneInput, phone);
    if (password) await this.fill(this.passwordInput, password);
    if (confirmPassword) await this.fill(this.confirmPasswordInput, confirmPassword);
    await this.click(this.submitButton);
  }
}

module.exports = RegisterPage;
