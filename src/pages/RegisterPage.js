const BasePage = require('./BasePage');

class RegisterPage extends BasePage {

  constructor(page) {
    super(page);

    this.registerLink = page.getByRole('link', {
      name: 'Não possui uma conta?'
    });

    this.emailInput = page
      .getByRole('group', {
        name: 'Preencha o formulário abaixo para criar sua conta:'
      })
      .getByPlaceholder('Email');

    this.nameInput = page
      .getByRole('group', {
        name: 'Preencha o formulário abaixo para criar sua conta:'
      })
      .getByPlaceholder('Nome', {
        exact: true
      });

    this.lastNameInput = page.getByRole('textbox', {
      name: 'Sobrenome'
    });

    this.cpfInput = page.getByRole('textbox', {
      name: 'CPF'
    });

    this.phoneInput = page.getByRole('textbox', {
      name: 'Telefone'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Senha',
      exact: true
    });

    this.confirmPasswordInput = page.getByRole('textbox', {
      name: 'Confirme sua Senha'
    });

    this.registerButton = page.getByRole('button', {
      name: 'Cadastrar conta'
    });
  }

  async openRegisterForm() {
    await this.registerLink.click();
  }

  async fillForm(user) {

    await this.emailInput.fill(user.email);

    await this.nameInput.fill(user.name);

    await this.lastNameInput.fill(user.lastName);

    await this.cpfInput.fill(user.cpf);

    await this.phoneInput.fill(user.phone);

    await this.passwordInput.fill(user.password);

    await this.confirmPasswordInput.fill(user.password);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }
}

module.exports = RegisterPage;