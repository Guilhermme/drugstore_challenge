// Global setup para realizar login uma vez e salvar storageState em auth.json
const fs = require('fs');
const { chromium } = require('playwright');
const HomePage = require('./src/pages/HomePage');
const LoginPage = require('./src/pages/LoginPage');
require('dotenv').config();

module.exports = async () => {
  console.log('Iniciando global-setup para gerar auth.json (se necessário)');
  // Se já existe auth.json, pula a geração (útil para desenvolvimento local)
  if (fs.existsSync('auth.json')) {
    console.log('auth.json já existe — pulando geração (remova o arquivo para forçar nova geração)');
    return;
  }

  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  if (!email || !password) {
    console.warn('TEST_USER_EMAIL e TEST_USER_PASSWORD não definidos — pulando geração de auth.json');
    return;
  }

  try {
    console.log('Lançando browser...');
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const home = new HomePage(page);
    const login = new LoginPage(page);

    console.log('\n🔵 FASE 1: Aceitação de Cookies');
    await home.open();
    await home.gerenciarCookiesSeVisivel();
    
    console.log('\n🔵 FASE 2: Autenticação');
    await home.goToLogin();
    await login.login(email, password);

    // aguarda perfil estar disponível via requisição de backend
    try {
      await page.waitForResponse(response => response.url().includes('/no-cache/profileSystem/getProfile') && response.status() === 200, { timeout: 15000 });
      console.log('✓ Resposta getProfile recebida.');
    } catch (e) {
      console.warn('⚠ Não recebeu resposta esperada de getProfile:', e.message);
    }

    console.log('\n🔵 FASE 3: Capturando Storage State');
    await context.storageState({ path: 'auth.json' });
    await browser.close();
    
    console.log('\n✅ auth.json gerado com sucesso!');
    console.log('📦 Execute "node debug-cookies-check.js" para validar cookies capturados\n');
  } catch (err) {
    console.error('❌ Erro durante global-setup:', err && err.message ? err.message : err);
    throw err;
  }
};

// Permite executar diretamente: `node global-setup.js`
if (require.main === module) {
  module.exports().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
