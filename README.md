# drograriasaopaulo-automation

Projeto de automação POM com Playwright e JavaScript para alguns fluxos em https://www.drogariasaopaulo.com.br/

Estrutura:

- `src/pages/` - Page Objects (BasePage, HomePage, LoginPage, RegisterPage, CartPage)
- `tests/` - Specs de teste usando `@playwright/test`

Como executar:

1. Instale dependências:

```bash
npm install
```

> Se estiver em Ubuntu 26.04, o Playwright pode não suportar a instalação de browsers automaticamente.
> Nesse caso use o Chrome do sistema em vez de `npx playwright install`.
>
> Exemplo:
> ```bash
> PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm run auth:setup
> ```
>
> Ou rode normalmente os testes com a configuração já feita em `playwright.config.js`:
> ```bash
> PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npx playwright test --project=chromium tests/cart.spec.js --headed
> ```

2. Configure variáveis de ambiente locais:

- Crie um arquivo `.env` a partir do `.env.example`
- Não comite o `.env` no repositório

```bash
cp .env.example .env
```

3. Execute os testes:

```bash
npx playwright test
```

4. Para rodar o login com credenciais definidas em ambiente ou `.env`:

```bash
TEST_USER_EMAIL=seu-email-de-teste@example.com TEST_USER_PASSWORD=SuaSenhaSegura123 PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npx playwright test --project=chromium tests/login.spec.js --headed
```

Notas:
- Alguns fluxos (cadastro) podem exigir captcha ou validações anti-bot. Os testes preenchem até o ponto possível e verificam elementos esperados.
- Variáveis sensíveis devem ficar fora do repositório: use `.env` local ou variáveis do CI.
