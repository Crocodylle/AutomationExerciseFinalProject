/**
 * Test Cases de Checkout
 * TC014: Place Order: Register while Checkout
 * TC015: Place Order: Login before Checkout (duplicate of TC016)
 * TC016: Place Order: Login before Checkout
 * TC023: Verify address details in checkout page
 * TC024: Download Invoice after purchase order
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { LoginPage } from '../../support/page-objects/LoginPage';
import { CartPage } from '../../support/page-objects/CartPage';
import { CheckoutPage } from '../../support/page-objects/CheckoutPage';

describe('Checkout and Order Tests', () => {
  let homePage;
  let loginPage;
  let cartPage;
  let checkoutPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    homePage.visitHome();
  });

  it('TC014: Should place order registering during checkout', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4-5: Add product and view cart
    cy.addProductAndViewCart();

    // Step 6: Click Proceed to Checkout
    cy.contains('Proceed To Checkout').click();

    // Step 7: Verify modal and click Register/Login
    cy.contains('Register / Login account to proceed on checkout').should('be.visible');
    cy.contains('a', 'Register / Login').click();

    // Step 8-11: Register new user
    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `checkout.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      loginPage.signup(testUser.name, testUser.email);
      cy.contains('Enter Account Information').should('be.visible');
      
      cy.fillSignupForm(testUser);
      cy.fillAddressForm(userData.address);
      cy.get('button[data-qa="create-account"]').click();
      cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
      cy.get('a[data-qa="continue-button"]').click();
      cy.contains('Logged in as').should('be.visible');

      // Step 12: Click Cart again
      homePage.clickCart();

      // Step 13-19: Proceed to checkout and complete order
      cy.contains('Proceed To Checkout').click();
      cy.completeCheckout('Please deliver carefully');

      // Cleanup
      cy.deleteAccount();
    });
  });

  it('TC016: Should place order with pre-login', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `prelogin.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      // Step 4-10: Register and create account
      cy.registerNewUser(testUser, userData.address);

      // Step 11-12: Add product and view cart
      cy.addProductAndViewCart();

      // Step 13-19: Proceed to checkout and complete order
      cy.contains('Proceed To Checkout').click();
      cy.completeCheckout('Test order with pre-login');

      // Step 20: Delete account
      cy.deleteAccount();
    });
  });

  it('TC023: Should verify address details in checkout', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `address.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      // Step 4-11: Register and fill account details
      cy.registerNewUser(testUser, userData.address);

      // Step 12-13: Add product and view cart
      cy.addProductAndViewCart();

      // Step 14: Click Proceed to Checkout
      cy.contains('Proceed To Checkout').click();

      // Step 15-17: Verify delivery and billing addresses
      cy.get('#address_delivery').should('be.visible').within(() => {
        cy.contains(userData.address.firstName).should('be.visible');
        cy.contains(userData.address.address).should('be.visible');
        cy.contains(userData.address.city).should('be.visible');
      });

      cy.get('#address_invoice').should('be.visible').within(() => {
        cy.contains(userData.address.firstName).should('be.visible');
        cy.contains(userData.address.address).should('be.visible');
        cy.contains(userData.address.city).should('be.visible');
      });

      // Cleanup
      cy.deleteAccount();
    });
  });

  it('TC024: Should download invoice after purchase', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `invoice.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      // Step 4-5: Add product and view cart
      cy.addProductAndViewCart();

      // Step 6: Click Proceed to Checkout
      cy.contains('Proceed To Checkout').click();

      // Step 7: Click Register/Login
      cy.contains('a', 'Register / Login').click();

      // Step 8-13: Register new user
      loginPage.signup(testUser.name, testUser.email);
      cy.contains('Enter Account Information').should('be.visible');
      
      cy.fillSignupForm(testUser);
      cy.fillAddressForm(userData.address);
      cy.get('button[data-qa="create-account"]').click();
      cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
      cy.get('a[data-qa="continue-button"]').click();
      cy.contains('Logged in as').should('be.visible');

      // Step 14: Click Cart
      homePage.clickCart();

      // Step 15-21: Proceed to checkout and complete order
      cy.contains('Proceed To Checkout').click();
      cy.completeCheckout('Invoice test order');

      // Step 22: Verify reached payment done page
      cy.url().should('include', '/payment_done');

      // Step 23-24: Download and verify invoice
      cy.downloadInvoice();

      // Step 25: Delete account
      cy.deleteAccount();
    });
  });
});
