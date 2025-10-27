import { BasePage } from './Base';

export class CartPage extends BasePage {
  constructor() {
    super();
    // Carrinho
    this.cartTable = '.table-responsive';
    this.cartRows = 'table tbody tr';
    this.productNameInCart = 'a[href*="/product_details/"]';
    this.productPriceInCart = 'tr td:nth-child(3)';
    this.productQuantityInCart = 'input[type="number"]';
    this.productTotalInCart = 'tr td:nth-child(5)';
    this.removeProductBtn = 'a[data-product-id]';
    
    // Checkout
    this.proceedToCheckoutBtn = 'a[href="/checkout"]';
    this.emptyCartMessage = 'b:contains("Cart is Empty")';
    
    // Subscription
    this.subscriptionInput = 'input#susbscribe_email';
    this.subscriptionBtn = 'button#subscribe';
  }

  /**
   * Visita a página do carrinho
   */
  visitCart() {
    this.navigate('/view_cart');
  }

  /**
   * Verifica se carrinho tem produtos
   */
  verifyProductsInCart() {
    cy.get(this.cartRows).should('have.length.greaterThan', 0);
  }

  /**
   * Obtém quantidade de itens no carrinho
   */
  getCartItemCount() {
    return cy.get(this.cartRows).its('length');
  }

  /**
   * Remove produto do carrinho
   * @param {number} index - Índice do produto
   */
  removeProductByIndex(index) {
    cy.get(this.removeProductBtn).eq(index).click();
  }

  /**
   * Verifica se carrinho está vazio
   */
  verifyCartEmpty() {
    this.verifyTextPresent('Cart is empty!');
  }

  /**
   * Verifica preço do produto no carrinho
   * @param {number} index - Índice do produto
   * @param {string} price - Preço esperado
   */
  verifyProductPrice(index, price) {
    cy.get(this.productPriceInCart).eq(index).should('contain', price);
  }

  /**
   * Verifica quantidade do produto no carrinho
   * @param {number} index - Índice do produto
   * @param {string} quantity - Quantidade esperada
   */
  verifyProductQuantity(index, quantity) {
    cy.get(this.productQuantityInCart)
      .eq(index)
      .should('have.value', quantity);
  }

  /**
   * Clica em Proceed to Checkout
   */
  clickProceedToCheckout() {
    cy.contains('Proceed To Checkout').click();
  }

  /**
   * Subscreve para newsletter
   * @param {string} email - Email
   */
  subscribe(email) {
    this.scrollToBottom();
    this.fill(this.subscriptionInput, email);
    this.click(this.subscriptionBtn);
    this.verifySuccessMessage('You have been successfully subscribed!');
  }

  /**
   * Conta quantidade de produtos no carrinho
   */
  countProductsInCart() {
    return cy.get(this.cartRows).then(($rows) => $rows.length);
  }

  /**
   * Verifica se produto específico está no carrinho
   * @param {string} productName - Nome do produto
   */
  verifyProductInCart(productName) {
    cy.contains(this.productNameInCart, productName).should('be.visible');
  }
}

export default CartPage;
