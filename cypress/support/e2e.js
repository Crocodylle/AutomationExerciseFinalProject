/**
 * Support file para testes E2E
 * Este arquivo é carregado uma vez antes de executar os testes
 */

import './commands';

// Opcional: Adicione hooks globais
beforeEach(() => {
  // Limpar dados do localStorage antes de cada teste
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

afterEach(() => {
  // Opcional: Limpar cookies após cada teste
  cy.clearCookies();
});
