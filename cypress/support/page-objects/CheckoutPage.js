import { BasePage } from './Base';

export class CheckoutPage extends BasePage {
  constructor() {
    super();
    // Registro/Login durante checkout
    this.registerLoginBtn = 'a[href="/login"]';
    
    // Informações de entrega
    this.deliveryAddressSection = '.checkout-info > :nth-child(1)';
    this.billingAddressSection = '.checkout-info > :nth-child(2)';
    
    // Revisão do pedido
    this.reviewOrderSection = '.table-responsive';
    this.commentTextArea = 'textarea[name="message"]';
    
    // Pagamento
    this.nameOnCardInput = 'input[data-qa="name-on-card"]';
    this.cardNumberInput = 'input[data-qa="card-number"]';
    this.cvcInput = 'input[data-qa="cvc"]';
    this.expiryMonthInput = 'input[data-qa="expiry-month"]';
    this.expiryYearInput = 'input[data-qa="expiry-year"]';
    this.payBtn = 'button[data-qa="pay-button"]';
    this.confirmOrderBtn = 'button[data-qa="confirm-order"]';
    
    // Mensagens
    this.orderSuccessMessage = '.alert-success';
    this.downloadInvoiceBtn = 'a[href*="/download_invoice/"]';
    this.continueBtn = 'a[href="/"]';
  }

  /**
   * Clica em Register/Login durante checkout
   */
  clickRegisterLogin() {
    cy.contains('Register / Login').first().click();
  }

  /**
   * Verifica se endereço de entrega está visível
   */
  verifyDeliveryAddressVisible() {
    this.verifyElementVisible(this.deliveryAddressSection);
  }

  /**
   * Verifica se endereço de cobrança está visível
   */
  verifyBillingAddressVisible() {
    this.verifyElementVisible(this.billingAddressSection);
  }

  /**
   * Verifica se a revisão do pedido está visível
   */
  verifyReviewOrderVisible() {
    this.verifyElementVisible(this.reviewOrderSection);
  }

  /**
   * Adiciona comentário ao pedido
   * @param {string} comment - Comentário
   */
  addComment(comment) {
    this.fill(this.commentTextArea, comment);
  }

  /**
   * Preenche dados de pagamento
   * @param {object} paymentData - Dados do pagamento
   */
  fillPaymentData(paymentData) {
    this.fill(this.nameOnCardInput, paymentData.nameOnCard);
    this.fill(this.cardNumberInput, paymentData.cardNumber);
    this.fill(this.cvcInput, paymentData.cvc);
    this.fill(this.expiryMonthInput, paymentData.expiryMonth);
    this.fill(this.expiryYearInput, paymentData.expiryYear);
  }

  /**
   * Clica em Pay and Confirm Order
   */
  clickPayAndConfirmOrder() {
    this.click(this.payBtn);
  }

  /**
   * Verifica mensagem de sucesso do pedido
   */
  verifyOrderSuccessMessage() {
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  }

  /**
   * Clica em Download Invoice
   */
  clickDownloadInvoice() {
    this.click(this.downloadInvoiceBtn);
  }

  /**
   * Clica em Continue (após sucesso)
   */
  clickContinue() {
    this.click(this.continueBtn);
  }

  /**
   * Verifica conteúdo do endereço de entrega
   * @param {string} expectedText - Texto esperado
   */
  verifyDeliveryAddressContent(expectedText) {
    cy.get(this.deliveryAddressSection).should('contain', expectedText);
  }

  /**
   * Verifica conteúdo do endereço de cobrança
   * @param {string} expectedText - Texto esperado
   */
  verifyBillingAddressContent(expectedText) {
    cy.get(this.billingAddressSection).should('contain', expectedText);
  }
}

export default CheckoutPage;
