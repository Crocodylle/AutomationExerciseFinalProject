import { BasePage } from './Base';

export class ProductsPage extends BasePage {
  constructor() {
    super();
    // Produtos
    this.allProductsTitle = 'h2:contains("All Products")';
    this.productList = '.features_items';
    this.productItem = '.single-products';
    this.productName = '.product-overlay > .overlay-content > p';
    this.viewProductBtn = 'a[href*="/product_details/"]';
    this.addToCartBtn = '.add-to-cart'; // Botão Add to Cart (usa class, não data-qa)
    
    // Busca
    this.searchInput = 'input#search_product';
    this.searchBtn = 'button#submit_search';
    this.searchedProductsTitle = 'h2:contains("Searched Products")';
    
    // Filtros
    this.categorySection = '.left-sidebar';
    this.brandSection = '.brands_products';
    this.categoryItem = '.list-group-item';
    this.brandItem = '.brands_products a';
    
    // Detalhes do produto
    this.productDetailName = '.product-information h2';
    this.productCategory = '.product-information p:contains("Category")';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:contains("Availability")';
    this.productCondition = '.product-information p:contains("Condition")';
    this.productBrand = '.product-information p:contains("Brand")';
    this.quantityInput = 'input#quantity';
    this.writeReviewButton = 'a[href="#reviews"]';
    
    // Review
    this.reviewerNameInput = 'input#name';
    this.reviewerEmailInput = 'input#email';
    this.reviewTextArea = 'textarea#review';
    this.submitReviewBtn = 'button#button-review';
    this.reviewSuccessMessage = '.alert-success';
  }

  /**
   * Visita a página de produtos
   */
  visitProducts() {
    this.navigate('/products');
  }

  /**
   * Verifica se está na página All Products
   */
  verifyAllProductsPage() {
    this.verifyTextPresent('All Products');
  }

  /**
   * Clica em View Product do primeiro item
   */
  clickViewProductFirst() {
    cy.get(this.viewProductBtn).first().click();
  }

  /**
   * Clica em View Product por índice
   * @param {number} index - Índice do produto
   */
  clickViewProductByIndex(index) {
    cy.get(this.viewProductBtn).eq(index).click();
  }

  /**
   * Busca um produto
   * @param {string} productName - Nome do produto
   */
  searchProduct(productName) {
    this.fill(this.searchInput, productName);
    this.click(this.searchBtn);
  }

  /**
   * Verifica página de produtos buscados
   */
  verifySearchedProductsPage() {
    this.verifyTextPresent('Searched Products');
  }

  /**
   * Verifica detalhes do produto
   */
  verifyProductDetailsVisible() {
    this.verifyElementVisible(this.productDetailName);
    this.verifyElementVisible(this.productPrice);
    this.verifyElementVisible(this.productAvailability);
    this.verifyElementVisible(this.productBrand);
  }

  /**
   * Aumenta quantidade do produto
   * @param {number} quantity - Quantidade
   */
  setProductQuantity(quantity) {
    cy.get(this.quantityInput).clear().type(quantity.toString());
  }

  /**
   * Clica em Add to Cart na página de detalhes
   */
  clickAddToCart() {
    // Na página de detalhes, o botão é button.cart
    cy.get('button.cart').click({ force: true });
  }

  /**
   * Clica categoria
   * @param {string} categoryName - Nome da categoria
   */
  clickCategory(categoryName) {
    cy.contains(this.categoryItem, categoryName).click();
  }

  /**
   * Clica brand
   * @param {string} brandName - Nome da marca
   */
  clickBrand(brandName) {
    cy.get(this.brandSection).contains('a', brandName).click();
  }

  /**
   * Adiciona review
   * @param {string} name - Nome do revisor
   * @param {string} email - Email do revisor
   * @param {string} review - Texto da review
   */
  addReview(name, email, review) {
    this.fill(this.reviewerNameInput, name);
    this.fill(this.reviewerEmailInput, email);
    this.fill(this.reviewTextArea, review);
    this.click(this.submitReviewBtn);
  }

  /**
   * Verifica mensagem de sucesso da review
   */
  verifyReviewSuccess() {
    cy.contains('Thank you for your review.').should('be.visible');
  }

  /**
   * Clica em "Write Your Review"
   */
  clickWriteReview() {
    cy.get(this.writeReviewButton).scrollIntoView().click();
  }
}

export default ProductsPage;
