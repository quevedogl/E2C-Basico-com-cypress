const dc = (nome) => cy.get(`[data-cy="${nome}"]`);

const login = (email, senha) => {
  cy.visit("/");
  dc("login-email").type(email);
  dc("login-senha").type(senha);
  dc("login-entrar").click();
};

describe("Autenticação", () => {
  it("CT-01: login válido redireciona para perfil e pedidos", () => {
    login("usuario@teste.com", "teste123");
    cy.url().should("include", "/conta.html");
    dc("perfil-titulo").should("contain", "Meus pedidos");
    dc("perfil-email").should("have.text", "usuario@teste.com");
    dc("pedido-item").should("have.length", 2);
  });

  it("CT-02: login com senha inválida exibe erro", () => {
    login("usuario@teste.com", "senhaErrada");
    dc("login-erro").should("be.visible").and("contain", "incorretos");
    cy.url().should("not.include", "/conta.html");
  });
});

describe("Carrinho", () => {
  beforeEach(() => cy.visit("/carrinho.html"));

  it("CT-03: quantidade acima do estoque é limitada ao máximo", () => {
    dc("carrinho-quantidade").clear().type("999");
    dc("carrinho-quantidade").should("have.value", "829");
    dc("carrinho-aviso").should("be.visible").and("contain", "829");
  });

  it("CT-05: CEP com letras é rejeitado", () => {
    dc("carrinho-cep").type("abcdefgh");
    dc("carrinho-finalizar").click();
    dc("carrinho-cep-erro").should("be.visible").and("contain", "apenas números");
    dc("carrinho-sucesso").should("not.be.visible");
  });
});

describe("Minha Conta", () => {
  it("CT-04: nome numérico e telefone vazio são rejeitados", () => {
    login("usuario@teste.com", "teste123");
    dc("dados-nome").type("999999");
    dc("dados-salvar").click();
    dc("dados-erro-nome").should("be.visible").and("contain", "apenas letras");
    dc("dados-erro-telefone").should("be.visible").and("contain", "obrigatório");
    dc("dados-sucesso").should("not.be.visible");
  });
});
