// Stubs de rede (cy.intercept). Devem ser registrados ANTES de abrir a página.

export function stubEstoque() {
  cy.intercept("GET", "**/api/estoque.json", { fixture: "estoque.json" }).as("estoque");
}

export function stubPedidosComSucesso() {
  cy.intercept("GET", "**/api/pedidos.json", { fixture: "pedidos.json" }).as("pedidos");
}

export function stubPedidosComFalha() {
  cy.intercept("GET", "**/api/pedidos.json", {
    statusCode: 500,
    fixture: "pedidos-erro.json",
  }).as("pedidos");
}
