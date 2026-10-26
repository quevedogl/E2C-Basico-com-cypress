import LoginPage from "../support/pages/LoginPage";
import ContaPage from "../support/pages/ContaPage";
import { stubPedidosComSucesso } from "../support/stubs";

describe("Autenticação", () => {
  let usuarios;
  let mensagens;
  let pedidos;

  before(() => {
    cy.fixture("usuarios").then((dados) => (usuarios = dados));
    cy.fixture("mensagens").then((dados) => (mensagens = dados));
    cy.fixture("pedidos").then((dados) => (pedidos = dados.pedidos));
  });

  it("CT-01: login válido redireciona para perfil e pedidos", () => {
    stubPedidosComSucesso();
    cy.login(usuarios.valido.email, usuarios.valido.senha);
    cy.wait("@pedidos");
    cy.url().should("include", "/conta.html");
    ContaPage.titulo().should("contain", mensagens.tituloPedidos);
    ContaPage.email().should("have.text", usuarios.valido.email);
    ContaPage.pedidos().should("have.length", pedidos.length);
  });

  it("CT-02: login com senha inválida exibe erro", () => {
    cy.login(usuarios.senhaInvalida.email, usuarios.senhaInvalida.senha);
    LoginPage.erro().deveMostrarTexto(mensagens.loginInvalido);
    cy.url().should("not.include", "/conta.html");
  });
});
