const { test } = require('@playwright/test');

const HomePage = require('../src/pages/HomePage');
const RegisterPage = require('../src/pages/RegisterPage');

const { createUser } = require('../src/utils/userFactory');

test.describe('Cadastro de Usuário', () => {

  test('Cadastrar novo usuário', async ({ page }) => {

    const home = new HomePage(page);
    const register = new RegisterPage(page);

    const user = createUser();

    await home.open();

    await home.goToLogin();

    await register.openRegisterForm();

    await register.fillForm(user);

    await register.submitRegistration();

    await register.validateConfirmationScreen(
      user.email
    );

  });

});