const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/HomePage');
const LoginPage = require('../src/pages/LoginPage');

test.describe('Fluxos de autenticação', () => {
  test('Login de usuário válido', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Defina TEST_USER_EMAIL e TEST_USER_PASSWORD para executar o teste de login');

    await home.open();
    await home.goToLogin();

    const profileResponsePromise = page.waitForResponse(
      response => response.url().includes('/no-cache/profileSystem/getProfile') && response.request().method() === 'GET',
      { timeout: 15000 }
    );

    await login.login(email, password);

    const profileResponse = await profileResponsePromise;
    expect(profileResponse.ok()).toBeTruthy();

    const profileBody = await profileResponse.json();
    await expect(JSON.stringify(profileBody)).toMatch(/GUILHERME/i);

    // Verifica se o modal de login foi fechado
    await expect(page.locator('#rnk-comp-modal-login')).toBeHidden({ timeout: 10000 });

  });
});
