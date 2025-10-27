/**
 * Test Cases de Produtos
 * TC007: Verify Test Cases Page
 * TC008: Verify All Products and product detail page
 * TC018: View Category Products
 * TC019: View & Cart Brand Products
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { ProductsPage } from '../../support/page-objects/ProductsPage';

describe('Products Tests', () => {
  let homePage;
  let productsPage;

  beforeEach(() => {
    homePage = new HomePage();
    productsPage = new ProductsPage();
    homePage.visitHome();
  });

  it('TC007: Should navigate to Test Cases page', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click on Test Cases button
    homePage.clickTestCases();

    // Step 5: Verify Test Cases page
    cy.contains('h2', 'Test Cases').should('be.visible');
  });

  it('TC008: Should view all products and product details', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click Products
    homePage.clickProducts();

    // Step 5: Verify All Products page
    productsPage.verifyAllProductsPage();

    // Step 6: Verify products list visible
    cy.get('.features_items').should('be.visible');

    // Step 7: Click View Product
    productsPage.clickViewProductFirst();

    // Step 8: Verify on product detail page
    cy.url().should('include', '/product_details/');

    // Step 9: Verify product details visible
    productsPage.verifyProductDetailsVisible();
  });

  it('TC018: Should view category products', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 2-3: Verify categories visible on left sidebar
    homePage.clickProducts();
    cy.get('.left-sidebar').should('be.visible');

    // Step 4: Click on Women category
    cy.contains('Women').parent().parent().find('a').first().click();

    // Step 5: Click on a subcategory
    cy.get('.category-products').first().then(($category) => {
      if ($category.length) {
        cy.contains('a', 'Dress').click();
      }
    });

    // Step 6: Verify category page with products
    cy.contains('Women').should('be.visible');
  });

  it('TC019: Should view and cart brand products', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 3: Click Products
    homePage.clickProducts();

    // Step 4: Verify brands visible
    cy.get('.brands_products').should('be.visible');

    // Step 5: Click on first brand
    cy.get('.brands_products a').first().click();

    // Step 6: Verify brand page and products visible
    cy.get('.features_items').should('be.visible');

    // Step 7: Click on another brand
    cy.get('.brands_products a').eq(1).click();

    // Step 8: Verify new brand page
    cy.get('.features_items').should('be.visible');
  });
});
