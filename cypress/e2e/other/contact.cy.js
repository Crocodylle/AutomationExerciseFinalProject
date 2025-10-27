/**
 * Test Case de Contato
 * TC006: Contact Us Form
 */

import { HomePage } from '../../support/page-objects/HomePage';

describe('Contact Us Tests', () => {
  let homePage;

  beforeEach(() => {
    homePage = new HomePage();
    homePage.visitHome();
  });

  it('TC006: Should submit contact us form', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4: Click Contact Us
    homePage.clickContactUs();

    // Step 5: Verify GET IN TOUCH
    cy.contains('Get In Touch').should('be.visible');

    // Step 6: Enter contact details
    cy.get('input[data-qa="name"]').type('Test User');
    cy.get('input[data-qa="email"]').type(`contact.${Date.now()}@test.com`);
    cy.get('input[data-qa="subject"]').type('Test Subject');
    cy.get('textarea[data-qa="message"]').type('This is a test message for automation');

    // Step 7: Upload file (criar arquivo inline)
    const fileContent = 'Test file content for contact form';
    const fileName = 'test-contact.txt';
    cy.get('input[name="upload_file"]').then(input => {
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const file = new File([blob], fileName, { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input[0].files = dataTransfer.files;
      input[0].dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Step 8: Click Submit
    cy.get('input[data-qa="submit-button"]').click();

    // Step 9: Handle alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('OK');
      return true;
    });

    // Step 10: Verify success message
    cy.contains('Success! Your details have been submitted successfully.', { timeout: 10000 }).should('be.visible');

    // Step 11: Click Home
    cy.get('.btn.btn-success').contains('Home').click();

    // Step 12: Verify home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');
  });
});
