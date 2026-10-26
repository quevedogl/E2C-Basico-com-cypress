import LoginPage from "./pages/LoginPage";

// Passo 1: login pela interface (usado quando o login É o que está sendo testado).
Cypress.Commands.add("login", (email, senha) => {
  LoginPage.autenticar(email, senha);
});

// Passo 2: login rápido, como pré-condição. Marca a sessão antes da página
// carregar e abre a tela de conta já autenticado (sem passar pela tela de login).
Cypress.Commands.add("loginPorSessao", (email) => {
  cy.visit("/conta.html", {
    onBeforeLoad(win) {
      win.sessionStorage.setItem("logado", email);
    },
  });
});

// Passo 3: asserção repetida "elemento visível e com o texto esperado".
Cypress.Commands.add(
  "deveMostrarTexto",
  { prevSubject: "element" },
  (subject, texto) => {
    cy.wrap(subject).should("be.visible").and("contain", texto);
  }
);
