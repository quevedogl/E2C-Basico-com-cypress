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

## Estrutura
- `app/` - páginas (login, conta, carrinho)
- `cypress/e2e/atividade1.cy.js` - os 5 testes
- `cypress.config.js` - configuração (baseUrl)
- `docs/casos-de-teste.md` - descrição dos casos
- `evidencias/` - print/vídeo da execução

Seletores: exclusivamente `data-cy`.

Usuário válido: `usuario@teste.com` / `teste123`
