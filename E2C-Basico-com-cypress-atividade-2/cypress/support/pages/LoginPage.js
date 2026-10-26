class LoginPage {
  email() {
    return cy.get('[data-cy="login-email"]');
  }

  senha() {
    return cy.get('[data-cy="login-senha"]');
  }

  entrar() {
    return cy.get('[data-cy="login-entrar"]');
  }

  erro() {
    return cy.get('[data-cy="login-erro"]');
  }

  visitar() {
    cy.visit("/");
  }

  autenticar(email, senha) {
    this.visitar();
    this.email().type(email);
    this.senha().type(senha);
    this.entrar().click();
  }
}

export default new LoginPage();
