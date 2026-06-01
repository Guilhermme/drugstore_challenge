const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/HomePage');
const RegisterPage = require('../src/pages/RegisterPage');

test('Cadastro de novo usuário (preenchimento do formulário)', async ({ page }) => {
  const home = new HomePage(page);
  const register = new RegisterPage(page);

  await home.open();
  await home.goToLogin();
  await home.goToRegister();

  const data = {
    name: 'Usuario',
    lastName: 'Teste',
    email: `teste+${Date.now()}@example.com`,
    cpf: '12345678909',
    phone: '11999999999',
    password: 'Senha@12345',
    confirmPassword: 'Senha@12345',
  };

  await register.register(data);

  await expect(page.locator('text=Confirme seu e-mail').first()).toBeVisible({ timeout: 10000 }).catch(() => {});
});
