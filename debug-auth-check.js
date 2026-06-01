const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('auth.json')) {
    console.error('auth.json não encontrado, gere com `npm run auth:setup`');
    process.exit(1);
  }

  const executable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || '/usr/bin/google-chrome';
  const browser = await chromium.launch({ headless: false, executablePath: executable, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();
  await page.goto('https://www.drogariasaopaulo.com.br/pesquisa?q=dipirona', { waitUntil: 'networkidle' });

  // tira screenshot do header
  await page.locator('header').screenshot({ path: 'header-check.png' }).catch(async () => {
    // fallback: screenshot full page
    await page.screenshot({ path: 'header-check-full.png', fullPage: false });
  });

  // verifica se existe texto de boas-vindas
  const welcome = await page.locator('text=Bem Vindo').first().isVisible().catch(() => false);
  console.log('Bem Vindo visível:', welcome);

  // espera um pouco para inspeção manual quando headed
  await page.waitForTimeout(3000);
  await browser.close();
  process.exit(0);
})();
