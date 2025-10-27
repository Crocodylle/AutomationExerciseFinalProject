/**
 * Test Cases de Login
 * TC002: Login User with correct email and password
 * TC003: Login User with incorrect email and password
 * TC004: Logout User
 */

import { HomePage } from '../../support/page-objects/HomePage';
import { LoginPage } from '../../support/page-objects/LoginPage';

describe('User Login Tests', () => {
  let homePage;
  let loginPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    homePage.visitHome();
  });

  it('TC002: Should login with correct credentials', () => {
    // Step 1-3: Navigate to home
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `testlogin.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      // Criar conta
      cy.registerNewUser(testUser, userData.address);

      // Fazer logout
      homePage.logout();

      // Fazer login com as credenciais corretas
      // Step 4-5: Click Signup/Login e verificar página
      homePage.clickSignupLogin();
      loginPage.verifyLoginPageVisible();

      // Step 6: Enter correct credentials
      loginPage.login(testUser.email, testUser.password);

      // Step 8: Verify logged in
      cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');

      // Step 9-10: Delete account
      cy.deleteAccount();
    });
  });

  it('TC003: Should show error with incorrect credentials', () => {
    // Step 1-3: Navigate to home
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      // Step 4: Click Signup/Login
      homePage.clickSignupLogin();

      // Step 5: Verify login page
      loginPage.verifyLoginPageVisible();

      // Step 6: Enter incorrect credentials
      loginPage.login(userData.invalidUser.email, userData.invalidUser.password);

      // Step 8: Verify error message
      cy.wait(1000);
      loginPage.verifyLoginError();
    });
  });

  it('TC004: Should logout user successfully', () => {
    // Step 1-3: Navigate to home
    homePage.verifyTextPresent('Full-Fledged practice website for Automation Engineers');

    cy.fixture('users.json').then((userData) => {
      const uniqueEmail = `testlogout.${Date.now()}@test.com`;
      const testUser = {
        ...userData.newUser,
        email: uniqueEmail
      };

      // Criar conta
      cy.registerNewUser(testUser, userData.address);
      
      // Step 8: Verify logged in (já verificado no registerNewUser)
      
      // Step 9: Click Logout
      homePage.logout();

      // Step 10: Verify redirected to login
      cy.url().should('include', '/login');
      loginPage.verifyLoginPageVisible();
    });
  });
});
