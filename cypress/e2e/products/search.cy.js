/**
 * Test Cases de Busca e Reviews
 * TC009: Search Product
 * TC021: Add review on product
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { ProductsPage } from '../../support/page-objects/ProductsPage';

describe('Search and Review Tests', () => {
  let homePage;
  let productsPage;

  beforeEach(() => {
    homePage = new HomePage();
    productsPage = new ProductsPage();
    homePage.visitHome();
  });

  it('TC009: Should search for products', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click Products
    homePage.clickProducts();

    // Step 5: Verify All Products page
    productsPage.verifyAllProductsPage();

    // Step 6: Search for product
    const searchTerm = 'Tshirt';
    productsPage.searchProduct(searchTerm);

    // Step 7: Verify searched products page
    productsPage.verifySearchedProductsPage();

    // Step 8: Verify search results
    cy.get('.features_items').should('be.visible');
    cy.get('.single-products').should('have.length.greaterThan', 0);
  });

  it('TC021: Should add review on product', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 3: Click Products
    homePage.clickProducts();

    // Step 5: Click View Product
    productsPage.clickViewProductFirst();

    // Step 6: Verify Write Your Review visible
    cy.contains('Write Your Review').should('be.visible');

    // Step 7: Enter review details
    const reviewerName = 'Test Reviewer';
    const reviewerEmail = `reviewer.${Date.now()}@test.com`;
    const reviewText = 'This is an excellent product! Highly recommended for everyone.';

    productsPage.addReview(reviewerName, reviewerEmail, reviewText);

    // Step 8: Submit review
    cy.wait(1000);

    // Step 9: Verify success message
    productsPage.verifyReviewSuccess();
  });
});
