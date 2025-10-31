# 🚀 Automação Web - Cypress Project

Projeto de automação web completo para **automationexercise.com** utilizando Cypress e JavaScript, com suporte a CI/CD via GitHub Actions e relatórios detalhados.

## 📋 Características

- ✅ **26 Test Cases** implementados de acordo com a documentação oficial
- 🏗️ **Page Object Model (POM)** para melhor manutenibilidade
- 📊 **Relatórios Mochawesome** com screenshots e vídeos
- 🔄 **CI/CD GitHub Actions** automático em cada push
- 🌐 **Multi-browser** suporte (Chrome, Firefox, Edge)
- 🔐 **Fixtures** com dados de teste
- 📝 **Boas práticas** de automação e padrões
- ⚡ **Retentativas automáticas** em caso de falhas

## 🛠️ Tecnologias

- **Cypress** 13.6.1
- **JavaScript** (ES6+)
- **Node.js** 20.x (LTS)
- **Mochawesome** (Reporter)
- **GitHub Actions** (CI/CD)

## 📦 Instalação

### Pré-requisitos

- Node.js 20+ instalado
- npm ou yarn

### Passos

```bash
# Clone ou navegue até o diretório do projeto
cd AutomationExerciseFinalProject

# Instale as dependências
npm install

# Abra o Cypress no modo interativo
npm run cy:open
```

## 🧪 Executando Testes

### Modo Interativo

```bash
npm run cy:open
```

### Modo Headless (CLI)

```bash
# Todos os testes
npm run test

# Com interface visual
npm run cy:run:headed

# Em browser específico
npm run cy:run:chrome
npm run cy:run:firefox
```

## 📁 Estrutura do Projeto

```
AutomationExerciseFinalProject/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml       # CI/CD pipeline (Node 20.x, multi-browser)
├── cypress/
│   ├── downloads/
│   │   └── invoice.txt
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── register.cy.js     # TC001, TC005
│   │   │   └── login.cy.js        # TC002, TC003, TC004
│   │   ├── cart/
│   │   │   └── cart.cy.js         # TC008, TC009, TC012, TC013, TC017, TC020
│   │   ├── checkout/
│   │   │   └── checkout.cy.js     # TC014, TC016, TC023, TC024
│   │   ├── other/
│   │   │   ├── contact.cy.js      # TC006
│   │   │   └── ui.cy.js           # TC010, TC025, TC026
│   │   └── products/
│   │       ├── products.cy.js     # TC007, TC018, TC019, TC021, TC022
│   │       └── search.cy.js       # TC009, TC011
│   ├── fixtures/
│   │   ├── checkout.json          # Dados de endereço e pagamento
│   │   └── users.json             # Dados de usuários de teste
│   ├── reports/
│   │   └── mochawesome-report/    # Relatórios HTML gerados
│   ├── screenshots/               # Screenshots de falhas
│   ├── support/
│   │   ├── commands.js            # Custom commands reutilizáveis
│   │   ├── e2e.js                 # Configurações globais
│   │   └── page-objects/
│   │       ├── Base.js            # Classe base com 20+ métodos comuns
│   │       ├── CartPage.js
│   │       ├── CheckoutPage.js
│   │       ├── HomePage.js
│   │       ├── LoginPage.js
│   │       └── ProductsPage.js
│   └── videos/                    # Vídeos de testes (CI)
├── memory-bank/                   # Documentação do projeto
│   ├── progress.md                # Status e progresso
│   ├── projectbrief.md            # Visão geral do projeto
│   ├── seletores-validados.md     # Seletores validados via Chrome DevTools
│   ├── systemPatterns.md          # Padrões de arquitetura
│   ├── techContext.md             # Contexto técnico
│   └── test-cases-detalhados.md   # Detalhamento dos test cases
├── scripts/
│   └── generate-report.js         # Geração de relatórios consolidados
├── cypress.config.js              # Configuração do Cypress
├── package.json                   # Dependências e scripts
└── README.md                      # Este arquivo
```

## 📊 Test Cases Implementados

### Autenticação (6 casos)
1. ✅ Register User
2. ✅ Login com credenciais corretas
3. ✅ Login com credenciais incorretas
4. ✅ Logout User
5. ✅ Register com email existente
6. ✅ Contact Us Form

### Produtos & Busca (5 casos)
7. ✅ Verify Test Cases Page
8. ✅ View All Products
9. ✅ Search Product
10. ✅ View Category Products
11. ✅ View & Cart Brand Products

### Carrinho & Checkout (8 casos)
12. ✅ Add Products in Cart
13. ✅ Verify Product Quantity in Cart
14. ✅ Remove Products From Cart
15. ✅ Place Order: Register while Checkout
16. ✅ Place Order: Login before Checkout
17. ✅ Download Invoice
18. ✅ Verify Address Details in Checkout
19. ✅ Cart Persistence After Login

### Funcionalidades Gerais (7 casos)
20. ✅ Subscription in Homepage
21. ✅ Subscription in Cart Page
22. ✅ Add Review on Product
23. ✅ Add to Cart from Recommended Items
24. ✅ Scroll Up com Arrow Button
25. ✅ Scroll Up sem Arrow Button

## ♻️ Reusabilidade e Manutenibilidade

### Page Object Model (POM)
O projeto utiliza o padrão Page Object Model para melhor organização e manutenibilidade:
- ✅ **Base.js** - Classe base com 20+ métodos comuns
- ✅ **6 Page Objects** especializados por funcionalidade
- ✅ **Seletores centralizados** e reutilizáveis
- ✅ **Métodos encapsulados** por responsabilidade

### Custom Commands
Comandos Cypress personalizados que encapsulam operações complexas:
- ✅ **Autenticação**: `cy.loginUser()`, `cy.registerNewUser()`, `cy.deleteAccount()`
- ✅ **Carrinho**: `cy.addProductsToCart()`, `cy.addProductAndViewCart()`
- ✅ **Checkout**: `cy.completeCheckout()`, `cy.downloadInvoice()`
- ✅ **Formulários**: `cy.fillSignupForm()`, `cy.fillAddressForm()`
- ✅ **Utilidades**: `cy.generateEmail()`, `cy.scrollToBottom()`

### Memory Bank
Documentação viva do projeto na pasta `memory-bank/`:
- 📄 **projectbrief.md** - Objetivos e escopo do projeto
- 📄 **progress.md** - Status atual e progresso dos test cases
- 📄 **systemPatterns.md** - Padrões arquiteturais e decisões técnicas
- 📄 **techContext.md** - Stack tecnológico e configurações
- 📄 **seletores-validados.md** - Seletores validados com Chrome DevTools MCP
- 📄 **test-cases-detalhados.md** - Especificação detalhada dos 26 test cases

## 🔍 Padrões e Boas Práticas

### Page Object Model
Cada página possui uma classe dedicada com seletores e métodos:

```javascript
class LoginPage {
  constructor() {
    this.emailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
  }

  login(email, password) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }
}
```

### Fixtures
Dados de teste centralizados:

```json
{
  "newUser": {
    "name": "Test User",
    "email": "test@example.com",
    "password": "SecurePass123"
  }
}
```

### Custom Commands
Comandos reutilizáveis para melhor reusabilidade:

```javascript
// Registro e autenticação
cy.registerNewUser(userData, addressData);  // Registro completo
cy.startSignup(name, email);                // Iniciar signup
cy.loginUser(email, password);              // Login
cy.logoutUser();                            // Logout
cy.deleteAccount();                         // Deletar conta

// Carrinho e produtos
cy.addProductAndViewCart(productIndex);     // Adicionar produto e ir ao carrinho
cy.addProductsToCart(quantity);             // Adicionar múltiplos produtos

// Checkout
cy.completeCheckout(comment);               // Completar pagamento e pedido
cy.downloadInvoice();                       // Baixar e verificar invoice

// Formulários
cy.fillSignupForm(userData);                // Preencher dados de conta
cy.fillAddressForm(addressData);            // Preencher endereço

// Utilidades
cy.generateEmail();                         // Gerar email único
cy.scrollToBottom();                        // Scroll até o fim
cy.scrollToTop();                           // Scroll até o topo
```

## 🔄 CI/CD - GitHub Actions

Os testes rodam automaticamente em múltiplos browsers com Node.js 20.x.

### Características do Pipeline
- ✅ **Node.js 20.x** (LTS atual)
- ✅ **Multi-browser**: Chromium e Firefox em paralelo
- ✅ **Artefatos**: Relatórios, screenshots e vídeos preservados
- ✅ **GitHub Pages**: Deploy automático dos relatórios
- ✅ **Retry Strategy**: 1 tentativa automática em caso de falha

### Disparadores
- 🔄 Push para `main` ou `develop`
- 🔀 Pull Requests para `main`

### Artefatos Gerados (30 dias de retenção)
- 📊 Relatórios HTML Mochawesome
- 📹 Vídeos de teste (modo headless)
- 📷 Screenshots em caso de falha

### Workflow Atualizado
O workflow foi modernizado com:
- ✅ `actions/checkout@v4`
- ✅ `actions/setup-node@v4`
- ✅ `actions/upload-artifact@v4`
- ✅ `peaceiris/actions-gh-pages@v4`
- ✅ Permissões adequadas para GitHub Pages

## 📊 Relatórios

Após executar os testes, abra o relatório:

```bash
open cypress/reports/mochawesome-report/index.html
```

Os relatórios incluem:
- ✅ Status de cada teste
- ⏱️ Tempo de execução
- 📷 Screenshots de falhas
- 📹 Vídeos completos (CI)
- 📝 Logs detalhados

## 🐛 Debugging

### Modo Debug Interativo

```bash
npm run cy:open
```

Use o Command Log do Cypress para inspecionar cada step.

### Usando debugger do Node

```javascript
cy.get('selector').debug(); // Pausa a execução
```

## ✨ Seletores Utilizados

- **data-qa**: Atributo preferencial para seletores
- **Class**: Para componentes genéricos
- **ID**: Quando disponível
- **XPath**: Último recurso (seletores robustos preferidos)

Exemplo de seletor robusto:
```javascript
cy.get('input[data-qa="login-email"]')
cy.contains('button', 'Login')
```

## 📝 Licença

MIT

---

**Repositório**: [AutomationExerciseFinalProject](https://github.com/Crocodylle/AutomationExerciseFinalProject)  
**Site Testado**: [automationexercise.com](https://automationexercise.com)  
**CI/CD Status**: [![Cypress Tests CI/CD](https://github.com/Crocodylle/AutomationExerciseFinalProject/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/Crocodylle/AutomationExerciseFinalProject/actions/workflows/cypress-tests.yml)  
**Última Atualização**: Outubro 2025
