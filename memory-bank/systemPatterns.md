# 🏗️ System Patterns - Arquitetura e Padrões

## Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────┐
│                     Cypress Test Suite                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Test Specs (.cy.js)                      │  │
│  │  ├─ auth/register.cy.js                              │  │
│  │  ├─ auth/login.cy.js                                 │  │
│  │  ├─ products/products.cy.js                          │  │
│  │  ├─ products/search.cy.js                            │  │
│  │  ├─ cart/cart.cy.js                                  │  │
│  │  ├─ checkout/checkout.cy.js                          │  │
│  │  └─ other/ui.cy.js & contact.cy.js                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Page Object Model (POM)                       │  │
│  │  ├─ BasePage (métodos comuns)                        │  │
│  │  ├─ HomePage                                         │  │
│  │  ├─ LoginPage                                        │  │
│  │  ├─ ProductsPage                                     │  │
│  │  ├─ CartPage                                         │  │
│  │  └─ CheckoutPage                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      Custom Commands & Fixtures                       │  │
│  │  ├─ commands.js (cy.fillSignupForm, etc)            │  │
│  │  ├─ users.json (dados de teste)                     │  │
│  │  └─ checkout.json (dados de pagamento)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Browser Automation (Cypress)                 │  │
│  │      ▼ automationexercise.com ▼                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Design Patterns Utilizados

### 1. Page Object Model (POM)
**Objetivo**: Centralizar seletores e ações das páginas

**Implementação**:
```javascript
class HomePage extends BasePage {
  constructor() {
    this.signupLoginBtn = 'a[href="/login"]';
    this.productsBtn = 'a[href="/products"]';
  }
  
  clickSignupLogin() {
    this.click(this.signupLoginBtn);
  }
}
```

**Benefícios**:
- ✅ Manutenção fácil de seletores
- ✅ Reutilização de código
- ✅ Legibilidade dos testes
- ✅ Reduz duplicação

### 2. Fixture Pattern
**Objetivo**: Centralizar dados de teste

**Estrutura**:
```json
{
  "newUser": { ... },
  "address": { ... },
  "paymentData": { ... }
}
```

**Uso nos Testes**:
```javascript
cy.fixture('users.json').then((userData) => {
  // Usar dados
});
```

### 3. Custom Commands Pattern
**Objetivo**: Encapsular operações complexas e reutilizáveis

**Exemplos**:
- `cy.fillSignupForm()` - 5+ steps em 1 comando
- `cy.createAccount()` - Signup + Address + Account creation
- `cy.deleteAccount()` - Limpeza pós-teste

### 4. Data-Driven Testing
**Objetivo**: Reutilizar testes com diferentes dados

**Implementação**:
```javascript
const testUsers = [
  { email: 'user1@test.com', password: 'pass1' },
  { email: 'user2@test.com', password: 'pass2' }
];

testUsers.forEach(user => {
  it(`Login with ${user.email}`, () => {
    cy.login(user.email, user.password);
  });
});
```

## Seletores - Hierarquia de Prioridade

1. **data-qa** (PREFERENCIAL)
   ```javascript
   'input[data-qa="login-email"]'
   ```

2. **Class + Type**
   ```javascript
   'a.add-to-cart'
   'button[type="submit"]'
   ```

3. **ID**
   ```javascript
   'input#search_product'
   ```

4. **Contains (para texto)**
   ```javascript
   cy.contains('button', 'Login')
   ```

5. **XPath** (ÚLTIMO RECURSO)
   ```javascript
   cy.xpath('//button[@class="btn"]')
   ```

## Timeouts e Waits

### Configuração Global (cypress.config.js)
```javascript
pageLoadTimeout: 30000      // Carregamento de página
defaultCommandTimeout: 10000 // Comandos gerais
requestTimeout: 30000       // Requisições HTTP
responseTimeout: 30000      // Respostas HTTP
```

### Waits Explícitos (quando necessário)
```javascript
cy.get(selector, { timeout: 15000 }) // Aumenta timeout
cy.wait(1000)                         // Aguarda tempo fixo
cy.intercept('GET', '/api').as('api')
cy.wait('@api')
```

## Estratégia de Retry

### No cypress.config.js
```javascript
retries: {
  runMode: 1,    // 1 retry em modo headless
  openMode: 0    // Sem retry em modo interativo
}
```

**Por que**:
- Evita falsos negativos por timings instáveis
- Acelera desenvolvimento (sem retry interativo)
- Melhora estabilidade em CI

## Organizacao de Testes

### Por Funcionalidade (Recomendado)
```
e2e/
├── auth/          (Login, Signup, Logout)
├── products/      (Busca, Categorias)
├── cart/          (Carrinho, Quantidade)
├── checkout/      (Pagamento, Endereço)
└── other/         (UI, Contact, Reviews)
```

### Dentro de um Arquivo
```javascript
describe('Feature Name', () => {
  beforeEach(() => { /* setup */ })
  
  it('TC001: Should do something', () => { /* test */ })
  it('TC002: Should do another thing', () => { /* test */ })
})
```

## Boas Práticas Implementadas

### 1. Validação de Elementos Antes de Ação
```javascript
// ❌ Errado - pode falhar intermitentemente
cy.get(selector).click()

// ✅ Correto
cy.get(selector).should('be.visible').click()
```

### 2. Usar `.within()` para Contexto
```javascript
// ✅ Bom - evita seletores frágeis
cy.get('.product-item').first().within(() => {
  cy.get('button.add-to-cart').click()
})
```

### 3. Evitar Hard Waits
```javascript
// ❌ Errado
cy.wait(5000)

// ✅ Correto
cy.get(selector).should('be.visible')
```

### 4. Usar Fixture para Dados Comuns
```javascript
// ✅ Melhor manutenção
cy.fixture('users.json').then(data => {
  cy.login(data.user.email, data.user.password)
})
```

### 5. Cleanup Após Testes
```javascript
afterEach(() => {
  cy.deleteAccount()     // Remove dados criados
  cy.clearCookies()      // Limpa autenticação
})
```

## Tratamento de Erros

### AlertsJavaScript
```javascript
cy.on('window:alert', (str) => {
  expect(str).to.include('Success')
})
```

### Elementos Dinâmicos
```javascript
// Espera elemento aparecer
cy.get(selector, { timeout: 15000 }).should('exist')

// Espera elemento desaparecer
cy.get(selector).should('not.exist')
```

### Requisições Lentas
```javascript
cy.intercept('POST', '/api/checkout', { delay: 2000 })
```

## Versionamento e Atualizações

### Quando Atualizar Seletores
- Mudanças no HTML da página
- Reorganização de elementos
- Alteração de atributos data-qa

**Como**:
1. Atualizar em page-objects/
2. Buscar todos os usos de `.grep`
3. Testar todas as dependências
4. Documentar mudança em .cursorrules

## CI/CD Pipeline

```
Git Push
   ▼
GitHub Actions Triggered
   ▼
Install Dependencies (npm ci)
   ▼
Run Tests (múltiplos browsers)
   ▼
Generate Reports (Mochawesome)
   ▼
Upload Artifacts
   ▼
Deploy to GitHub Pages (optional)
```

---
**Última Atualização**: 2025-10-25
