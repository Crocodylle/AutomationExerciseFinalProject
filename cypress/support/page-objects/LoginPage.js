import { BasePage } from './Base';

export class LoginPage extends BasePage {
  constructor() {
    super();
    // Login
    this.emailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[data-qa="login-password"]';
    this.loginBtn = 'button[data-qa="login-button"]';
    this.loginText = 'h2:contains("Login to your account")';
    
    // Signup
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupBtn = 'button[data-qa="signup-button"]';
    this.newUserSignupText = 'h2:contains("New User Signup!")';
    
    // Erro - seletor mais flexível
    this.errorMessage = 'p[style*="color: red"]';
  }

  /**
   * Visita a página de login
   */
  visitLogin() {
    this.navigate('/login');
  }

  /**
   * Verifica se página de login está visível
   */
  verifyLoginPageVisible() {
    this.verifyTextPresent('Login to your account');
  }

  /**
   * Verifica se página de signup está visível
   */
  verifySignupPageVisible() {
    this.verifyTextPresent('New User Signup!');
  }

  /**
   * Login com email e senha
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  login(email, password) {
    this.fill(this.emailInput, email);
    this.fill(this.passwordInput, password);
    this.click(this.loginBtn);
  }

  /**
   * Registra novo usuário (primeira etapa)
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   */
  signup(name, email) {
    this.fill(this.signupNameInput, name);
    this.fill(this.signupEmailInput, email);
    this.click(this.signupBtn);
  }

  /**
   * Verifica mensagem de erro de login
   */
  verifyLoginError() {
    cy.get(this.errorMessage)
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!');
  }

  /**
   * Verifica erro de email já registrado
   */
  verifyEmailExistsError() {
    cy.get(this.errorMessage)
      .should('be.visible')
      .should('contain', 'Email Address already exist!');
  }
}

export default LoginPage;
