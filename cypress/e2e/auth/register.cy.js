/**
 * Test Cases de Registro de Usuário
 * TC001: Register User
 * TC005: Register User with existing email
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { LoginPage } from '../../support/page-objects/LoginPage';

describe('User Registration Tests', () => {
  let homePage;
  let loginPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    homePage.visitHome();
  });

  it('TC001: Should register a new user successfully', () => {
    // Step 1-3: Navegação e verificação
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    // Step 4-16: Registro completo de usuário
    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `testuser.${Date.now()}@automationexercise.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      cy.registerNewUser(testUser, userData.address);

      // Step 17-18: Delete Account
      cy.deleteAccount();
    });
  });

  it('TC005: Should show error when registering with existing email', () => {
    // Step 1-3: Home page
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const testEmail = `existing.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: testEmail
      };
      
      // Criar conta primeiro
      cy.registerNewUser(testUser, userData.address);
      
      // Fazer logout
      homePage.logout();
      
      // Tentar registrar novamente com o mesmo email
      // Step 4-5: Click Signup/Login e verificar página
      homePage.clickSignupLogin();
      loginPage.verifySignupPageVisible();

      // Step 6: Enter name and existing email
      loginPage.signup(userData.newUser.name, testEmail);

      // Step 8: Verify error message
      loginPage.verifyEmailExistsError();
      
      // Cleanup: Login e deletar conta
      cy.get('input[data-qa="login-email"]').clear().type(testEmail);
      cy.get('input[data-qa="login-password"]').clear().type(userData.newUser.password);
      cy.get('button[data-qa="login-button"]').click();
      cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');
      cy.deleteAccount();
    });
  });
});
