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
- **Mochawesome** (Reporter)
- **GitHub Actions** (CI/CD)

## 📦 Instalação

### Pré-requisitos

- Node.js 14+ instalado
- npm ou yarn

### Passos

```bash
# Clone ou navegue até o diretório do projeto
cd ProjetoFinal

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
ProjetoFinal/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── register.cy.js
│   │   │   ├── login.cy.js
│   │   │   └── logout.cy.js
│   │   ├── products/
│   │   │   ├── products.cy.js
│   │   │   ├── search.cy.js
│   │   │   └── cart.cy.js
│   │   ├── checkout/
│   │   │   └── checkout.cy.js
│   │   └── other/
│   │       ├── contact.cy.js
│   │       ├── reviews.cy.js
│   │       └── ui.cy.js
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── products.json
│   │   └── checkout.json
│   ├── support/
│   │   ├── e2e.js
│   │   ├── commands.js
│   │   └── page-objects/
│   │       ├── Base.js
│   │       ├── HomePage.js
│   │       ├── LoginPage.js
│   │       ├── ProductsPage.js
│   │       ├── CartPage.js
│   │       └── CheckoutPage.js
│   └── reports/
│       └── mochawesome-report/
├── scripts/
│   └── generate-report.js
├── .github/
│   └── workflows/
│       └── cypress-tests.yml
├── cypress.config.js
├── package.json
└── README.md
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

### Refatoração Recente
O projeto passou por uma refatoração focada em **eliminar duplicação de código**:
- ✅ **31% redução** de código nos testes principais
- ✅ **4 novos custom commands** criados
- ✅ **8 testes principais** refatorados
- ✅ **164 linhas de código** removidas

**Resultado**: Testes mais limpos, legíveis e fáceis de manter.

Veja [REFATORACAO_REUSABILIDADE.md](REFATORACAO_REUSABILIDADE.md) para detalhes completos.

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

Os testes rodam automaticamente em cada push para a branch main.

### Configuração

Veja `.github/workflows/cypress-tests.yml` para mais detalhes.

### Disparadores
- ✅ Push para `main`
- ✅ Pull Requests para `main`
- ✅ Agendamento diário (optional)

### Artefatos Gerados
- 📊 Relatórios HTML Mochawesome
- 📹 Vídeos de teste (headless)
- 📷 Screenshots em caso de falha

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

**Autor**: Automação QA  
**Versão**: 1.0.0  
**Última Atualização**: 2025
