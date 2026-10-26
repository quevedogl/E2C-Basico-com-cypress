import ContaPage from "../support/pages/ContaPage";
import { stubPedidosComFalha } from "../support/stubs";

describe("Minha Conta", () => {
  let usuarios;
  let entradas;
  let mensagens;

  before(() => {
    cy.fixture("usuarios").then((dados) => (usuarios = dados));
    cy.fixture("entradas").then((dados) => (entradas = dados));
    cy.fixture("mensagens").then((dados) => (mensagens = dados));
  });

  it("CT-04: nome numérico e telefone vazio são rejeitados", () => {
    cy.loginPorSessao(usuarios.valido.email);
    ContaPage.preencherNome(entradas.nomeNumerico);
    ContaPage.salvar().click();
    ContaPage.erroNome().deveMostrarTexto(mensagens.nomeInvalido);
    ContaPage.erroTelefone().deveMostrarTexto(mensagens.telefoneObrigatorio);
    ContaPage.sucesso().should("not.be.visible");
  });

  it("CT-06: falha na API de pedidos exibe erro e nenhum pedido", () => {
    stubPedidosComFalha();
    cy.loginPorSessao(usuarios.valido.email);
    cy.wait("@pedidos");
    ContaPage.erroPedidos().deveMostrarTexto(mensagens.pedidosErro);
    ContaPage.pedidos().should("not.exist");
  });
});
