# 🚀 Project Brief - Automação Web Cypress

## Visão Geral
Projeto de automação web completo para o site **automationexercise.com** utilizando **Cypress 13.6.1** e **JavaScript** (ES6+). O projeto implementa todos os 26 test cases oficiais do site com suporte a CI/CD via **GitHub Actions** e geração automática de relatórios.

## Objetivos Principais
1. ✅ Implementar todos os 26 test cases do site automationexercise.com
2. ✅ Usar Page Object Model (POM) para melhor manutenibilidade
3. ✅ Configurar CI/CD automático via GitHub Actions
4. ✅ Gerar relatórios detalhados com Mochawesome
5. ✅ Seguir boas práticas de automação
6. ✅ Garantir execução sem quebras intermitentes

## Escopo do Projeto

### Test Cases Implementados (26 total)
- **Autenticação (4)**: Register, Login, Logout, Email duplicado
- **Contact (1)**: Contact us form
- **Produtos (4)**: All products, Search, Categories, Brands
- **Carrinho (5)**: Add products, Quantity, Remove, Cart persistence
- **Checkout (4)**: Register during checkout, Login before checkout, Endereços, Invoice
- **UI/UX (6)**: Subscription (home + cart), Scroll up (arrow + sem arrow)
- **Reviews (1)**: Add review on product
- **Recomendações (1)**: Add to cart from recommended items

### Tecnologias Utilizadas
- **Cypress 13.6.1** - Framework de automação
- **JavaScript (ES6+)** - Linguagem principal
- **Mochawesome 7.1.3** - Reporter de testes
- **GitHub Actions** - CI/CD automation
- **Node.js 18+** - Runtime

## Estrutura Arquitetural

### Page Object Model (POM)
```
cypress/support/page-objects/
├── Base.js          (Classe base com métodos comuns)
├── HomePage.js      (Home page)
├── LoginPage.js     (Login/Signup)
├── ProductsPage.js  (Produtos e busca)
├── CartPage.js      (Carrinho)
└── CheckoutPage.js  (Checkout)
```

### Custom Commands
- `cy.fillSignupForm()` - Preenche formulário de signup
- `cy.fillAddressForm()` - Preenche endereço
- `cy.createAccount()` - Cria conta completa
- `cy.deleteAccount()` - Deleta conta
- `cy.addProductsToCart()` - Adiciona múltiplos produtos
- `cy.loginUser()` - Faz login
- `cy.logoutUser()` - Faz logout
- `cy.generateEmail()` - Email aleatório

### Fixtures (Dados de Teste)
- `users.json` - Dados de usuários e endereços
- `checkout.json` - Dados de pagamento

## Sucesso Criterios

### Funcionalidade
- ✅ Todos os 26 testes devem passar
- ✅ Testes devem rodar sem quebras intermitentes
- ✅ Timeouts adequados para elementos dinâmicos
- ✅ Retry automático em caso de falha

### Código
- ✅ Seletores robustos (data-qa prioritário)
- ✅ Page Object Model bem estruturado
- ✅ Fixtures para dados reutilizáveis
- ✅ Custom commands para operações comuns
- ✅ Comentários em português nos testes

### CI/CD
- ✅ Testes rodam em múltiplos browsers (Chrome, Firefox)
- ✅ Relatórios HTML gerados automaticamente
- ✅ Screenshots e vídeos em caso de falha
- ✅ Testes agendados diariamente

### Relatórios
- ✅ Mochawesome HTML com detalhes de execução
- ✅ Tempo de execução de cada teste
- ✅ Screenshots de falhas
- ✅ Vídeos completos (CI)
- ✅ Logs detalhados

## Restrições e Limitações

1. **Site público**: O site automationexercise.com está sempre disponível
2. **Dados compartilhados**: Necessário usar emails únicos para testes
3. **Elementos dinâmicos**: Alguns elementos requerem waits explícitos
4. **Alerts**: Alguns fluxos disparam alerts JavaScript
5. **Downloads**: Download de invoice pode não funcionar em CI

## Próximas Etapas (Future)

1. Implementar API testing (complementar ao UI)
2. Adicionar performance testing
3. Integrar com Slack/Email para notificações
4. Implementar data-driven testing
5. Adicionar testes de acessibilidade (a11y)

## Documentação Relacionada
- `productContext.md` - Por que o projeto existe
- `systemPatterns.md` - Arquitetura e padrões técnicos
- `techContext.md` - Stack tecnológico
- `activeContext.md` - Status atual e próximos passos
- `progress.md` - O que foi completo e o que falta

---
**Data de Criação**: 2025-10-25  
**Status**: ✅ Completo  
**Versão**: 1.0.0
