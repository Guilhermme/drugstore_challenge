# Automação Web - Drogaria São Paulo

Projeto de automação web desenvolvido com Playwright e JavaScript, utilizando o padrão Page Object Model (POM).

Site utilizado:

Drogaria São Paulo

https://www.drogariasaopaulo.com.br

---

## Tecnologias Utilizadas

- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)
- Playwright HTML Report

---

## Estrutura do Projeto

```text
.
├── src
│   └── pages
│       ├── BasePage.js
│       ├── HomePage.js
│       ├── LoginPage.js
│       ├── SearchPage.js
│       ├── ProductPage.js
│       └── CartPage.js
│
├── tests
│   ├── login.spec.js
│   └── cart.spec.js
│
├── auth.json
├── global-setup.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## Instalação

1. Instale dependências:

```bash
npm install
```

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
USER_EMAIL=seu_email
USER_PASSWORD=sua_senha
```

---

## Gerando a Sessão de Autenticação

Antes de executar cenários que dependem de login (exceto o proprio login), é necessário gerar o arquivo de autenticação.

Execute:

```bash
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm run auth:setup
```

Ao final da execução será criado o arquivo:

```text
auth.json
```

Esse arquivo armazena a sessão autenticada e será reutilizado pelos testes que exigem login.

---

2. Configure variáveis de ambiente locais:

- Crie um arquivo `.env` a partir do `.env.example`
- Não comite o `.env` no repositório

```bash
cp .env.example .env
```

3. Execute os testes:

### Executar Login

```bash
npm run test:login
```

### Executar Carrinho

```bash
npm run test:cart
```

---

## Relatório de Execução

Após a execução dos testes:

```bash
npx playwright show-report
```
