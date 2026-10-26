import { stubEstoque } from "../stubs";

class CarrinhoPage {
  // Abre o carrinho e espera o estoque chegar (alias de rede, sem espera fixa),
  // porque o limite de quantidade só vale depois que o estoque é carregado.
  visitar() {
    stubEstoque();
    cy.visit("/carrinho.html");
    cy.wait("@estoque");
    this.estoque().should("not.have.text", "...");
  }

  estoque() {
    return cy.get('[data-cy="carrinho-estoque"]');
  }

  quantidade() {
    return cy.get('[data-cy="carrinho-quantidade"]');
  }

  aviso() {
    return cy.get('[data-cy="carrinho-aviso"]');
  }

  cep() {
    return cy.get('[data-cy="carrinho-cep"]');
  }

  erroCep() {
    return cy.get('[data-cy="carrinho-cep-erro"]');
  }

  finalizar() {
    return cy.get('[data-cy="carrinho-finalizar"]');
  }

  sucesso() {
    return cy.get('[data-cy="carrinho-sucesso"]');
  }

  digitarQuantidade(valor) {
    this.quantidade().clear().type(valor);
  }

  digitarCepEFinalizar(cep) {
    this.cep().type(cep);
    this.finalizar().click();
  }
}

export default new CarrinhoPage();
