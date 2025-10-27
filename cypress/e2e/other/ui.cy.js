/**
 * Test Cases de UI e Funcionalidades Gerais
 * TC010: Verify Subscription in home page
 * TC011: Verify Subscription in Cart page
 * TC025: Verify Scroll Up using 'Arrow' button
 * TC026: Verify Scroll Up without 'Arrow' button
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { CartPage } from '../../support/page-objects/CartPage';

describe('UI and General Functionality Tests', () => {
  let homePage;
  let cartPage;

  beforeEach(() => {
    homePage = new HomePage();
    cartPage = new CartPage();
  });

  it('TC010: Should verify subscription in home page', () => {
    // Step 1-3: Navigate to home
    homePage.visitHome();
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4-5: Scroll and verify subscription
    homePage.verifySubscriptionVisible();

    // Step 6-7: Enter email and subscribe
    const email = `subscriber.${Date.now()}@test.com`;
    homePage.subscribe(email);
  });

  it('TC011: Should verify subscription in cart page', () => {
    // Step 1-3: Navigate to home
    homePage.visitHome();
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click Cart
    homePage.clickCart();

    // Step 5-6: Scroll and verify subscription
    cartPage.scrollToBottom();
    cy.contains('Subscription').should('be.visible');

    // Step 7-8: Enter email and subscribe
    const email = `subscriber.${Date.now()}@test.com`;
    cartPage.subscribe(email);
  });

  it('TC025: Should verify scroll up with arrow button', () => {
    // Step 1-3: Navigate to home
    homePage.visitHome();
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Scroll down to footer
    homePage.scrollToBottom();

    // Step 5: Verify subscription visible
    cy.contains('Subscription').should('be.visible');

    // Step 6: Click arrow to scroll up
    homePage.scrollUpWithArrow();

    // Step 7: Verify hero section visible
    homePage.verifyHeroSectionVisible();
  });

  it('TC026: Should verify scroll up without arrow button', () => {
    // Step 1-3: Navigate to home
    homePage.visitHome();
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Scroll down
    homePage.scrollToBottom();

    // Step 5: Verify subscription visible
    cy.contains('Subscription').should('be.visible');

    // Step 6: Scroll up without arrow
    homePage.scrollToTop();

    // Step 7: Verify hero section visible
    homePage.verifyHeroSectionVisible();
  });
});
