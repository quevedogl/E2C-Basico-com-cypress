# Refatoração da suíte (Atividade 2)

Ponto de partida: suíte da A1 (`atividade1.cy.js`, tag `atividade-1`), 5 testes CT-01 a CT-05.

## Diagnóstico de smells (problema → solução)

| # | Smell | Onde está | Por que é um problema | Solução |
|---|-------|-----------|-----------------------|---------|
| 1 | Seletores espalhados nos testes | helper `dc()` e `dc("login-email")`, `dc("carrinho-cep")`, etc. em todos os CTs | Se um `data-cy` mudar, é preciso caçar o seletor em vários testes; o teste mistura "o que" com "como" | Um Page Object por tela (`LoginPage`, `ContaPage`, `CarrinhoPage`); seletores só neles |
| 2 | Passo repetido: login pela interface | `login()` usado em CT-01, CT-02, CT-04 | Repetição; em CT-04 o login é só pré-condição e deixa o teste lento e dependente da tela de login | Comandos `cy.login` (via interface) e `cy.loginPorSessao` (pré-condição rápida) |
| 3 | Passo repetido: asserção "visível + contém texto" | CT-02, CT-03, CT-04, CT-05 | Mesma sequência copiada 6 vezes | Comando filho `.deveMostrarTexto()` |
| 4 | Dados dentro dos testes | e-mail, senhas, `"999"`, `"999999"`, `"abcdefgh"` e textos de erro nos CTs | Dado e lógica misturados; mudar um dado exige editar o teste | Fixtures (`usuarios`, `entradas`, `mensagens`) |
| 5 | Número mágico acoplado à aplicação | `"829"` em CT-03 | Se o estoque mudar, o teste quebra sem ter nada errado | Stub de `GET /api/estoque.json` + fixture `estoque`; o teste lê o valor da fixture |
| 6 | Dependência de dados reais / sem cenário de falha | `have.length 2` em CT-01; nenhum teste de erro de API | O resultado depende do backend; o caminho de falha não era coberto | Stub de `GET /api/pedidos.json` com fixture (sucesso, CT-01) e com erro 500 (falha, CT-06) |
| 7 | Tudo em um arquivo, IDs fora de ordem | `atividade1.cy.js` (CT-05 antes de CT-04) | Difícil de achar e de manter conforme cresce | Um arquivo de teste por tela em `cypress/e2e/` |
| 8 | Sem arquivo de suporte | `supportFile: false` | Não há onde registrar comandos customizados | `cypress/support/e2e.js` habilitado |
| 9 | Esperas fixas (`cy.wait(ms)`) | nenhuma encontrada na A1 | Risco ao introduzir chamadas assíncronas (stubs): a tentação é usar `cy.wait(1000)` | Esperas por alias (`cy.wait("@estoque")`) e asserções com retry; `npm test` falha se houver `cy.wait(<número>)` |

## O que mudou

- **Page Objects**: `cypress/support/pages/` (`LoginPage`, `ContaPage`, `CarrinhoPage`). Nenhum `data-cy` fora deles.
- **Comandos** (`cypress/support/commands.js`): `cy.login`, `cy.loginPorSessao`, `.deveMostrarTexto()`.
- **Fixtures** (`cypress/fixtures/`): `usuarios`, `entradas`, `mensagens`, `estoque`, `pedidos`, `pedidos-erro`.
- **Stubs** (`cypress/support/stubs.js`, `cy.intercept`): pedidos com sucesso (CT-01) e com falha 500 (CT-06, novo); estoque (CT-03). Para isso, a aplicação passou a ler pedidos e estoque de `app/api/*.json`.
- **Cobertura**: CT-01 a CT-05 mantidos, nenhum removido; CT-06 adicionado (cenário de falha).
- **Estabilidade**: sem `cy.wait(<número>)` (verificado por `npm run verificar:esperas`, que roda antes de `npm test`); esperas só por alias de rede e asserções com retry.

## Evidência de estabilidade

Comando: `npm run test:3x` (sobe a aplicação e roda `cypress run` 3 vezes seguidas).

| Execução | Resultado |
|----------|-----------|
| 1 | ___ passando / ___ total |
| 2 | ___ passando / ___ total |
| 3 | ___ passando / ___ total |
