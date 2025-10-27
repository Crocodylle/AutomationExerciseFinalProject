/**
 * Classe Base para Page Objects
 * Contém métodos comuns reutilizáveis por todas as pages
 */
export class BasePage {
  constructor() {
    this.pageTitle = 'h2';
    this.successMessage = '.alert-success';
    this.errorMessage = '.alert-danger';
  }

  /**
   * Navega para uma URL específica
   * @param {string} path - Caminho relativo da URL
   */
  navigate(path = '') {
    cy.visit(path);
  }

  /**
   * Aguarda um elemento estar visível
   * @param {string} selector - Seletor do elemento
   * @param {number} timeout - Timeout em ms
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
  }

  /**
   * Clica em um elemento
   * @param {string} selector - Seletor do elemento
   */
  click(selector) {
    cy.get(selector).should('be.visible').click();
  }

  /**
   * Preenche um input
   * @param {string} selector - Seletor do elemento
   * @param {string} value - Valor a ser digitado
   */
  fill(selector, value) {
    cy.get(selector).should('be.visible').clear().type(value);
  }

  /**
   * Preenche um input sem limpar (para casos específicos)
   * @param {string} selector - Seletor do elemento
   * @param {string} value - Valor a ser digitado
   */
  fillAppend(selector, value) {
    cy.get(selector).should('be.visible').type(value);
  }

  /**
   * Seleciona uma opção de dropdown
   * @param {string} selector - Seletor do select
   * @param {string} value - Valor da opção
   */
  selectDropdown(selector, value) {
    cy.get(selector).select(value);
  }

  /**
   * Verifica se um texto está presente na página
   * @param {string} text - Texto a procurar
   */
  verifyTextPresent(text) {
    cy.contains(text).should('be.visible');
  }

  /**
   * Verifica se um elemento está visível
   * @param {string} selector - Seletor do elemento
   */
  verifyElementVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  /**
   * Verifica se um elemento não está visível
   * @param {string} selector - Seletor do elemento
   */
  verifyElementNotVisible(selector) {
    cy.get(selector).should('not.be.visible');
  }

  /**
   * Verifica mensagem de sucesso
   * @param {string} expectedText - Texto esperado
   */
  verifySuccessMessage(expectedText) {
    cy.get(this.successMessage)
      .should('be.visible')
      .should('contain', expectedText);
  }

  /**
   * Verifica mensagem de erro
   * @param {string} expectedText - Texto esperado
   */
  verifyErrorMessage(expectedText) {
    cy.get(this.errorMessage)
      .should('be.visible')
      .should('contain', expectedText);
  }

  /**
   * Scroll até um elemento
   * @param {string} selector - Seletor do elemento
   */
  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
  }

  /**
   * Scroll até o topo da página
   */
  scrollToTop() {
    cy.scrollTo('top', { ensureScrollable: false, duration: 500 });
  }

  /**
   * Scroll até o bottom da página
   */
  scrollToBottom() {
    cy.scrollTo('bottom', { ensureScrollable: false, duration: 500 });
  }

  /**
   * Aguarda um determinado tempo (usar com moderação)
   * @param {number} ms - Milissegundos
   */
  wait(ms = 1000) {
    cy.wait(ms);
  }

  /**
   * Obtém o valor de um elemento
   * @param {string} selector - Seletor do elemento
   * @returns {Cypress.Chainable}
   */
  getValue(selector) {
    return cy.get(selector).invoke('val');
  }

  /**
   * Obtém o texto de um elemento
   * @param {string} selector - Seletor do elemento
   * @returns {Cypress.Chainable}
   */
  getText(selector) {
    return cy.get(selector).invoke('text');
  }

  /**
   * Faz upload de arquivo
   * @param {string} selector - Seletor do input file
   * @param {string} filePath - Caminho do arquivo
   */
  uploadFile(selector, filePath) {
    cy.get(selector).selectFile(filePath);
  }

  /**
   * Aguarda URL conter um texto
   * @param {string} text - Texto esperado na URL
   */
  waitForUrlContains(text) {
    cy.url().should('include', text);
  }

  /**
   * Verifica se um atributo contém um valor
   * @param {string} selector - Seletor do elemento
   * @param {string} attribute - Nome do atributo
   * @param {string} value - Valor esperado
   */
  verifyAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  /**
   * Faz hover em um elemento
   * @param {string} selector - Seletor do elemento
   */
  hover(selector) {
    cy.get(selector).trigger('mouseover');
  }

  /**
   * Clica com força (force click)
   * @param {string} selector - Seletor do elemento
   */
  forceClick(selector) {
    cy.get(selector).click({ force: true });
  }
}

export default BasePage;
