# 🛠️ Tech Context - Stack Tecnológico

## Dependências Principais

### Runtime
- **Node.js**: 18.x ou superior
- **npm**: 9.x ou superior

### Testing Framework
```json
{
  "cypress": "^13.6.1",
  "mochawesome": "^7.1.3",
  "mochawesome-merge": "^4.3.0",
  "mochawesome-report-generator": "^6.2.0"
}
```

## Versões e Compatibilidade

| Componente | Versão | Compatibilidade |
|-----------|--------|-----------------|
| Cypress | 13.6.1 | Node 14+, Chrome/Firefox/Edge |
| Mochawesome | 7.1.3 | Cypress 8+ |
| Node.js | 18.x+ | Ubuntu 20.04+, Windows 10+, macOS 11+ |
| GitHub Actions | latest | Suporta Node 18 |

## Estrutura de Diretórios

```
ProjetoFinal/
├── cypress/
│   ├── e2e/                          # Testes E2E
│   │   ├── auth/
│   │   │   ├── register.cy.js       # TC001, TC005
│   │   │   └── login.cy.js          # TC002, TC003, TC004
│   │   ├── products/
│   │   │   ├── products.cy.js       # TC007, TC008, TC018, TC019
│   │   │   └── search.cy.js         # TC009, TC021
│   │   ├── cart/
│   │   │   └── cart.cy.js           # TC012, TC013, TC017, TC020, TC022
│   │   ├── checkout/
│   │   │   └── checkout.cy.js       # TC014, TC016, TC023, TC024
│   │   └── other/
│   │       ├── ui.cy.js             # TC010, TC011, TC025, TC026
│   │       └── contact.cy.js        # TC006
│   ├── fixtures/                     # Dados de teste
│   │   ├── users.json
│   │   └── checkout.json
│   ├── support/
│   │   ├── e2e.js                   # Hook global
│   │   ├── commands.js              # Custom commands
│   │   └── page-objects/
│   │       ├── Base.js
│   │       ├── HomePage.js
│   │       ├── LoginPage.js
│   │       ├── ProductsPage.js
│   │       ├── CartPage.js
│   │       └── CheckoutPage.js
│   ├── reports/                      # Relatórios (gerado)
│   │   └── mochawesome-report/
│   ├── screenshots/                  # Screenshots (falhas)
│   └── videos/                       # Vídeos (CI)
├── scripts/
│   └── generate-report.js            # Script pós-teste
├── .github/
│   └── workflows/
│       └── cypress-tests.yml         # CI/CD
├── cypress.config.js                 # Configuração Cypress
├── package.json                      # Dependências
├── .gitignore                        # Git ignore
├── README.md                         # Documentação
└── memory-bank/                      # Documentação de projeto
    ├── projectbrief.md
    ├── systemPatterns.md
    ├── techContext.md
    ├── activeContext.md
    └── progress.md
```

## Configuração do Cypress (cypress.config.js)

### Timeouts Configurados
```javascript
pageLoadTimeout: 30000        // Espera 30s para carregar página
defaultCommandTimeout: 10000  // 10s para comandos padrão
requestTimeout: 30000         // 30s para requisições
responseTimeout: 30000        // 30s para respostas
```

### Retentativas
```javascript
retries: {
  runMode: 1,      // 1 tentativa adicional em CI
  openMode: 0      // Sem retentativa em modo interativo
}
```

### ViewPort
```javascript
viewportWidth: 1280
viewportHeight: 720
```

### Relatórios
```javascript
reporter: 'mochawesome'
reporterOptions: {
  reportDir: 'cypress/reports/mochawesome-report',
  reportFilename: '[status]_[datetime]-[name]-report',
  html: true,
  json: true
}
```

## Scripts npm

```bash
npm run cy:open          # Abre Cypress interativo
npm run cy:run           # Roda testes headless
npm run cy:run:headed    # Roda com UI visível
npm run cy:run:chrome    # Roda em Chrome
npm run cy:run:firefox   # Roda em Firefox
npm run test             # Roda com relatório Mochawesome
npm run test:headed      # Roda com UI e relatório
```

## Configuração de CI/CD (GitHub Actions)

### Triggers
- Push na branch `main` ou `develop`
- Pull Request para `main`
- Agendado diariamente às 9 AM UTC

### Matriz de Browsers
- Chromium (padrão)
- Firefox

### Node Version
- 18.x (LTS)

### Artifacts Gerados
- Relatórios Mochawesome (30 dias)
- Screenshots em caso de falha
- Vídeos de execução

### GitHub Pages (Optional)
Relatórios podem ser publicados em GitHub Pages se configurado

## Ambiente de Desenvolvimento

### Requisitos Mínimos
- RAM: 4GB
- Espaço em disco: 2GB (incluindo node_modules)
- Internet: Conexão estável

### Desenvolvimento Local
```bash
# Instalação
git clone <repo>
cd ProjetoFinal
npm install

# Desenvolvimento
npm run cy:open         # Abrir Cypress
npm run test            # Executar todos os testes
npm run test:headed     # Com visualização

# Debug
npm run cy:run -- --debug  # Ativa debugger
```

## Ferramentas Recomendadas

### Editor/IDE
- **VS Code** (recomendado)
  - Extensão: Cypress Helper
  - Extensão: Thunder Client (para API testing)
  
### DevTools
- Cypress Studio (built-in)
- Chrome DevTools (F12)

### CI/CD
- GitHub (Actions nativo)
- Slack (notificações, opcional)

## Performance

### Tempo Médio de Execução
- Por teste: 10-30 segundos
- Suite completa (26 testes): ~10-15 minutos
- CI com 2 browsers: ~20-25 minutos

### Otimizações Implementadas
1. Retry automático para falsos negativos
2. Fixtures para dados reutilizáveis
3. Custom commands para operações comuns
4. Parallel execution em CI (browsers diferentes)

## Segurança

### Dados Sensíveis
- ❌ Nenhuma senha hardcoded
- ✅ Dados em fixtures (apenas testes, não produção)
- ✅ Variáveis de ambiente para CI

### Artefatos
- ❌ Nenhum upload de credenciais
- ✅ Apenas relatórios públicos em GitHub Pages

## Troubleshooting

### Problema: Testes falhando intermitentemente
**Solução**:
```javascript
// Aumentar timeout
cy.get(selector, { timeout: 15000 })

// Usar wait para elemento
cy.get(selector).should('be.visible')
```

### Problema: Elemento não encontrado
**Solução**:
- Verificar seletor com DevTools
- Usar cy.debug() para pausar
- Aumentar timeout

### Problema: Screenshot vazio
**Solução**:
```javascript
cy.wait(500)  // Aguardar antes de screenshot
cy.screenshot()
```

## Logs e Debug

### Modo Debug
```bash
npm run cy:run -- --debug
```

### Console Logs
```javascript
cy.log('Mensagem importante')
cy.debug()  // Pausa a execução
```

### Captura de Tela
```javascript
cy.screenshot('meu-teste', { overwrite: true })
```

---
**Última Atualização**: 2025-10-25  
**Versão do Stack**: 1.0.0
