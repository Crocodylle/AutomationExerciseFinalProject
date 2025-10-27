import { BasePage } from './Base';

export class HomePage extends BasePage {
  constructor() {
    super();
    // Navegação
    this.signupLoginBtn = 'a[href="/login"]';
    this.productsBtn = 'a[href="/products"]';
    this.cartBtn = 'a[href="/view_cart"]';
    this.testCasesBtn = 'a[href="/test_cases"]';
    this.contactUsBtn = 'a[href="/contact_us"]';
    this.logoutBtn = 'a[href="/logout"]';
    this.loggedInAs = 'li:has(> a[href="/logout"])';
    
    // Conteúdo
    this.homePageTitle = 'h2:contains("Full-Fledged practice website")';
    this.subscriptionInput = 'input#susbscribe_email';
    this.subscriptionBtn = 'button#subscribe';
    this.subscriptionMessage = '.alert-success';
    
    // Produtos e seções
    this.productsList = '.features_items';
    this.productItem = '.product-image-wrapper';
    this.addToCartBtn = 'a.add-to-cart';
    this.viewProductBtn = 'a[href*="/product_details/"]';
    this.continueShoppingBtn = 'button:contains("Continue Shopping")';
    this.viewCartBtn = 'button:contains("View Cart")';
    
    // Recomendações
    this.recommendedItems = '.item';
    this.scrollUpBtn = '#scrollUp';
    
    // Categorias e Brands
    this.categoryList = '.list-group';
    this.brandList = '.brands_products > .nav';
  }

  /**
   * Visita a home page
   */
  visitHome() {
    this.navigate('/');
  }

  /**
   * Verifica se está logado
   */
  verifyLoggedIn(username) {
    cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');
  }

  /**
   * Clica no botão de Signup/Login
   */
  clickSignupLogin() {
    this.click(this.signupLoginBtn);
  }

  /**
   * Clica no botão Products
   */
  clickProducts() {
    this.click(this.productsBtn);
  }

  /**
   * Clica no botão Cart
   */
  clickCart() {
    cy.get(this.cartBtn).first().click();
  }

  /**
   * Clica no botão Test Cases
   */
  clickTestCases() {
    cy.get(this.testCasesBtn).first().click();
  }

  /**
   * Clica no botão Contact Us
   */
  clickContactUs() {
    this.click(this.contactUsBtn);
  }

  /**
   * Faz logout
   */
  logout() {
    this.click(this.logoutBtn);
  }

  /**
   * Subscreve para newsletter
   * @param {string} email - Email para subscrição
   */
  subscribe(email) {
    this.fill(this.subscriptionInput, email);
    this.click(this.subscriptionBtn);
    this.verifySuccessMessage('You have been successfully subscribed!');
  }

  /**
   * Verifica subscription no footer
   */
  verifySubscriptionVisible() {
    cy.get('footer').scrollIntoView();
    cy.wait(500);
    cy.contains('Subscription').should('be.visible');
  }

  /**
   * Adiciona produto ao carrinho (primeiro produto)
   */
  addFirstProductToCart() {
    cy.get(this.productItem).first().within(() => {
      this.hover(this.addToCartBtn);
      this.click(this.addToCartBtn);
    });
  }

  /**
   * Clica Continue Shopping
   */
  clickContinueShopping() {
    cy.contains('Continue Shopping').click();
  }

  /**
   * Clica View Cart
   */
  clickViewCart() {
    cy.contains('View Cart').click();
  }

  /**
   * Scroll até arrow e clica
   */
  scrollUpWithArrow() {
    this.scrollToBottom();
    this.wait(500);
    cy.get(this.scrollUpBtn).should('be.visible').click();
    this.wait(500);
  }

  /**
   * Verifica se hero section está visível após scroll
   */
  verifyHeroSectionVisible() {
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
  }
}

export default HomePage;
