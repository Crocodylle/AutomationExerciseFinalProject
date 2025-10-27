/**
 * Custom Commands para Cypress
 * Comandos reutilizáveis em todos os testes
 */

// Comando para completar registro
Cypress.Commands.add('fillSignupForm', (signupData) => {
  // Title usa ID, não data-qa
  cy.get('input#id_gender1').check(); // Mr
  
  cy.get('input[data-qa="name"]').clear().type(signupData.name);
  cy.get('input[data-qa="email"]').should('be.disabled'); // Email já preenchido
  cy.get('input[data-qa="password"]').clear().type(signupData.password);
  cy.get('select[data-qa="days"]').select(signupData.birthDay);
  cy.get('select[data-qa="months"]').select(signupData.birthMonth);
  cy.get('select[data-qa="years"]').select(signupData.birthYear);
  // Newsletter e Optin usam ID, não data-qa
  cy.get('input#newsletter').check();
  cy.get('input#optin').check();
});

// Comando para preencher endereço
Cypress.Commands.add('fillAddressForm', (addressData) => {
  cy.get('input[data-qa="first_name"]').clear().type(addressData.firstName);
  cy.get('input[data-qa="last_name"]').clear().type(addressData.lastName);
  cy.get('input[data-qa="company"]').clear().type(addressData.company);
  cy.get('input[data-qa="address"]').clear().type(addressData.address);
  cy.get('input[data-qa="address2"]').clear().type(addressData.address2);
  cy.get('select[data-qa="country"]').select(addressData.country);
  cy.get('input[data-qa="state"]').clear().type(addressData.state);
  cy.get('input[data-qa="city"]').clear().type(addressData.city);
  cy.get('input[data-qa="zipcode"]').clear().type(addressData.zipcode);
  cy.get('input[data-qa="mobile_number"]').clear().type(addressData.mobileNumber);
});

// Comando para criar conta completa
Cypress.Commands.add('createAccount', (user, addressData) => {
  cy.fillSignupForm(user);
  cy.fillAddressForm(addressData);
  cy.get('button[data-qa="create-account"]').click();
  cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
  cy.contains('Logged in as').should('be.visible');
});

// Comando para deletar conta
Cypress.Commands.add('deleteAccount', () => {
  cy.get('a[href="/delete_account"]').click();
  cy.contains('Account Deleted!', { timeout: 10000 }).should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
});

// Comando para adicionar produtos ao carrinho
Cypress.Commands.add('addProductsToCart', (quantity = 2) => {
  for (let i = 0; i < quantity; i++) {
    cy.get('.single-products').eq(i).within(() => {
      cy.get('a.add-to-cart').first().click({ force: true });
    });
    cy.contains('Continue Shopping').should('be.visible').click();
  }
});

// Comando para fazer login
Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/login');
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
  cy.contains('Logged in as').should('be.visible');
});

// Comando para fazer logout
Cypress.Commands.add('logoutUser', () => {
  cy.get('a[href="/logout"]').click();
  cy.url().should('include', '/login');
});

// Comando para gerar email aleatório
Cypress.Commands.add('generateEmail', () => {
  const timestamp = Date.now();
  return `test.user.${timestamp}@automationexercise.com`;
});

// Comando para verificar elemento com retry
Cypress.Commands.add('verifyElementWithRetry', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('exist').and('be.visible');
});

// Comando para aguardar elemento desaparecer
Cypress.Commands.add('waitForElementToDisappear', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('not.exist');
});

// Comando para tomar screenshot
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { overwrite: true });
});

// Comando para fazer upload de arquivo
Cypress.Commands.add('uploadFile', (inputSelector, filePath) => {
  cy.get(inputSelector).selectFile(filePath);
});

// Comando para interceptar requisições
Cypress.Commands.add('mockApiCall', (method, url, response) => {
  cy.intercept(method, url, { statusCode: 200, body: response }).as('apiCall');
});

// Comando para realizar scroll
Cypress.Commands.add('scrollToBottom', () => {
  cy.scrollTo('bottom', { ensureScrollable: false });
});

Cypress.Commands.add('scrollToTop', () => {
  cy.scrollTo('top', { ensureScrollable: false });
});

// Comando para fechar alert
Cypress.Commands.add('dismissAlert', () => {
  cy.window().then(win => {
    cy.stub(win, 'alert').returns(true);
  });
});

// Comando para registro completo desde a home page
Cypress.Commands.add('registerNewUser', (userData, addressData) => {
  cy.visit('/');
  cy.get('a[href="/login"]').click();
  cy.get('input[data-qa="signup-name"]').type(userData.name);
  cy.get('input[data-qa="signup-email"]').type(userData.email);
  cy.get('button[data-qa="signup-button"]').click();
  cy.contains('Enter Account Information').should('be.visible');
  cy.fillSignupForm(userData);
  cy.fillAddressForm(addressData);
  cy.get('button[data-qa="create-account"]').click();
  cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
  cy.contains('Logged in as').should('be.visible');
});

// Comando para processo de signup (não completa, apenas até a página de signup)
Cypress.Commands.add('startSignup', (name, email) => {
  cy.visit('/');
  cy.get('a[href="/login"]').click();
  cy.get('input[data-qa="signup-name"]').type(name);
  cy.get('input[data-qa="signup-email"]').type(email);
  cy.get('button[data-qa="signup-button"]').click();
});

// Comando para completar checkout com pagamento
Cypress.Commands.add('completeCheckout', (comment = 'Test order') => {
  cy.get('textarea[name="message"]').should('be.visible').type(comment);
  cy.contains('Place Order').click();
  
  cy.fixture('checkout.json').then((checkoutData) => {
    cy.get('input[data-qa="name-on-card"]').type(checkoutData.paymentData.nameOnCard);
    cy.get('input[data-qa="card-number"]').type(checkoutData.paymentData.cardNumber);
    cy.get('input[data-qa="cvc"]').type(checkoutData.paymentData.cvc);
    cy.get('input[data-qa="expiry-month"]').type(checkoutData.paymentData.expiryMonth);
    cy.get('input[data-qa="expiry-year"]').type(checkoutData.paymentData.expiryYear);
  });
  
  cy.get('button[data-qa="pay-button"]').click();
  cy.contains('Congratulations! Your order has been confirmed!', { timeout: 15000 }).should('be.visible');
});

// Comando para adicionar produto e ir para carrinho
Cypress.Commands.add('addProductAndViewCart', (productIndex = 0) => {
  cy.get('.single-products').eq(productIndex).within(() => {
    cy.get('a.add-to-cart').first().click({ force: true });
  });
  cy.contains('View Cart').should('be.visible').click();
  cy.url().should('include', '/view_cart');
});

// Comando para baixar e verificar invoice
Cypress.Commands.add('downloadInvoice', () => {
  // O href contém ID dinâmico: /download_invoice/{order_id}
  // Usando classe e texto para seleção mais robusta
  cy.contains('a.btn.check_out', 'Download Invoice').should('be.visible').click();
  cy.wait(2000); // Aguardar download
  // Nota: O arquivo é salvo em cypress/downloads/
  // Verificação do arquivo pode variar dependendo do formato (txt, pdf, etc)
  cy.readFile('cypress/downloads/invoice.txt', { timeout: 10000 }).should('exist');
});