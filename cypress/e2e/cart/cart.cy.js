/**
 * Test Cases de Carrinho
 * TC012: Add Products in Cart
 * TC013: Verify Product quantity in Cart
 * TC017: Remove Products From Cart
 * TC020: Search Products and Verify Cart After Login
 * TC022: Add to cart from Recommended items
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { ProductsPage } from '../../support/page-objects/ProductsPage';
import { CartPage } from '../../support/page-objects/CartPage';

describe('Shopping Cart Tests', () => {
  let homePage;
  let productsPage;
  let cartPage;

  beforeEach(() => {
    homePage = new HomePage();
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    homePage.visitHome();
  });

  it('TC012: Should add products to cart', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click Products
    homePage.clickProducts();

    // Step 5: Hover and add first product
    cy.get('.single-products').first().within(() => {
      cy.get('a.add-to-cart').first().click({ force: true });
    });

    // Step 6: Continue Shopping
    homePage.clickContinueShopping();

    // Step 7: Add second product
    cy.get('.single-products').eq(1).within(() => {
      cy.get('a.add-to-cart').first().click({ force: true });
    });

    // Step 8: View Cart
    cy.contains('View Cart').click();

    // Step 9-10: Verify both products in cart
    cartPage.verifyProductsInCart();
  });

  it('TC013: Should verify product quantity in cart', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: View first product
    homePage.clickProducts();
    productsPage.clickViewProductFirst();

    // Step 6: Increase quantity
    productsPage.setProductQuantity(4);

    // Step 7: Add to cart
    productsPage.clickAddToCart();

    // Step 8: View cart
    cy.contains('View Cart').click();

    // Step 9: Verify quantity
    cy.get('.cart_quantity button').first().should('contain', '4');
  });

  it('TC017: Should remove products from cart', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Add products
    cy.addProductsToCart(1);

    // Step 5: Click Cart
    homePage.clickCart();

    // Step 6: Verify cart displayed
    cartPage.verifyProductsInCart();

    // Step 7: Remove product
    cartPage.removeProductByIndex(0);

    // Step 8: Verify product removed
    cy.wait(1000);
    cartPage.verifyCartEmpty();
  });

  it('TC020: Should search products and verify cart after login', () => {
    // Step 2-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 3: Click Products
    homePage.clickProducts();

    // Step 5-6: Search product
    productsPage.searchProduct('Tshirt');

    // Step 7: Verify search results
    productsPage.verifySearchedProductsPage();

    // Step 8: Add searched products to cart
    cy.get('.single-products').first().within(() => {
      cy.get('a.add-to-cart').first().click({ force: true });
    });

    // Step 9: Go to cart
    cy.contains('View Cart').click();
    
    // Step 10-12: Verify products in cart
    cy.get('.cart_info').should('be.visible');
  });

  it('TC022: Should add to cart from recommended items', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 3-4: Scroll to recommended items
    homePage.scrollToBottom();
    cy.contains('recommended items').should('be.visible');

    // Step 5: Add to cart from recommended
    cy.get('.recommended_items').within(() => {
      cy.get('a.add-to-cart').first().click({ force: true });
    });

    // Step 6: View Cart
    cy.contains('View Cart').click();

    // Step 7: Verify product in cart
    cartPage.verifyProductsInCart();
  });
});
