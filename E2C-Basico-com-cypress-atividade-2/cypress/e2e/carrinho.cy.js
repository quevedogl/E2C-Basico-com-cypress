import CarrinhoPage from "../support/pages/CarrinhoPage";

describe("Carrinho", () => {
  let entradas;
  let mensagens;
  let estoque;

  before(() => {
    cy.fixture("entradas").then((dados) => (entradas = dados));
    cy.fixture("mensagens").then((dados) => (mensagens = dados));
    cy.fixture("estoque").then((dados) => (estoque = dados.estoque));
  });

  beforeEach(() => CarrinhoPage.visitar());

  it("CT-03: quantidade acima do estoque é limitada ao máximo", () => {
    CarrinhoPage.digitarQuantidade(entradas.quantidadeAcimaDoEstoque);
    CarrinhoPage.quantidade().should("have.value", String(estoque));
    CarrinhoPage.aviso().deveMostrarTexto(String(estoque));
  });

  it("CT-05: CEP com letras é rejeitado", () => {
    CarrinhoPage.digitarCepEFinalizar(entradas.cepComLetras);
    CarrinhoPage.erroCep().deveMostrarTexto(mensagens.cepInvalido);
    CarrinhoPage.sucesso().should("not.be.visible");
  });
});
