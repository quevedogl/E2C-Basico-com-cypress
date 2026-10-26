class ContaPage {
  titulo() {
    return cy.get('[data-cy="perfil-titulo"]');
  }

  email() {
    return cy.get('[data-cy="perfil-email"]');
  }

  pedidos() {
    return cy.get('[data-cy="pedido-item"]');
  }

  erroPedidos() {
    return cy.get('[data-cy="pedidos-erro"]');
  }

  nome() {
    return cy.get('[data-cy="dados-nome"]');
  }

  telefone() {
    return cy.get('[data-cy="dados-telefone"]');
  }

  salvar() {
    return cy.get('[data-cy="dados-salvar"]');
  }

  erroNome() {
    return cy.get('[data-cy="dados-erro-nome"]');
  }

  erroTelefone() {
    return cy.get('[data-cy="dados-erro-telefone"]');
  }

  sucesso() {
    return cy.get('[data-cy="dados-sucesso"]');
  }

  preencherNome(nome) {
    this.nome().type(nome);
  }
}

export default new ContaPage();
