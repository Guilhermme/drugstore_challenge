const { test } = require('@playwright/test');

const HomePage = require('../src/pages/HomePage');
const RegisterPage = require('../src/pages/RegisterPage');

test.describe('Cadastro de Usuário', () => {

  test('Cadastrar novo usuário', async ({ page }) => {

    const home = new HomePage(page);
    const register = new RegisterPage(page);

    const timestamp = Date.now();

    const user = {
      email: `qa-teste-hits${timestamp}@hotmail.com`,
      name: 'James',
      lastName: 'Bond',
      cpf: '10332628620',
      phone: '34992752783',
      password: 'QAjamesBond@21'
    };

    await home.open();

    await home.goToLogin();

    await register.openRegisterForm();

    await register.fillForm(user);

    await register.submitRegistration();

  });

});