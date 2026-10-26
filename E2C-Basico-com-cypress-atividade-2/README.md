# Balaroti - Testes E2E com Cypress

Aplicação simples (HTML estático) + 5 testes automatizados com Cypress.

## Pré-requisitos
- Node.js 18+

## Instalação
```bash
npm install
```

## Execução

**Modo interativo (open)** - sobe a aplicação e abre o Cypress:
```bash
npm run test:open
```

**Modo headless (run)** - sobe a aplicação e roda todos os testes:
```bash
npm test
```

Alternativa manual (dois terminais):
```bash
npm start          # terminal 1: aplicação em http://localhost:3000
npx cypress open   # terminal 2 (ou: npx cypress run)
```

**Estabilidade (3 execuções seguidas)**:
```bash
npm run test:3x
```

## Estrutura
- `app/` - páginas (login, conta, carrinho) e `app/api/*.json` (dados de pedidos e estoque)
- `cypress/e2e/` - testes, um arquivo por tela (`autenticacao`, `carrinho`, `conta`)
- `cypress/support/pages/` - Page Objects (seletores `data-cy` ficam só aqui)
- `cypress/support/commands.js` - comandos: `cy.login`, `cy.loginPorSessao`, `.deveMostrarTexto`
- `cypress/support/stubs.js` - stubs de rede (`cy.intercept`)
- `cypress/fixtures/` - dados e mensagens esperadas
- `scripts/verificar-esperas.js` - falha se houver `cy.wait(<número>)`
- `cypress.config.js` - configuração (baseUrl, supportFile)
- `docs/casos-de-teste.md` - descrição dos casos
- `REFATORACAO.md` - smells encontrados e soluções (Atividade 2)
- `evidencias/` - print/vídeo da execução

Seletores: exclusivamente `data-cy`.

Usuário válido: `usuario@teste.com` / `teste123`
