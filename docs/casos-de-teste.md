# Casos de Teste - Atividade 1 (Cypress)

Casos derivados do roteiro manual do 1º bimestre (TC-01, TC-02, TC-03), reescritos para a aplicação atual.

| ID | Origem | Área | Pré-condição | Passos | Dados | Resultado esperado | Asserções |
|----|--------|------|--------------|--------|-------|--------------------|-----------|
| CT-01 | TC-01 | Autenticação | Página de login carregada | Preencher e-mail e senha; clicar em "Entrar" | usuario@teste.com / teste123 | Redireciona para perfil com pedidos | URL contém /conta.html; título "Meus pedidos"; e-mail exibido; 2 pedidos listados |
| CT-02 | TC-01 (variação negativa) | Autenticação | Página de login carregada | Preencher e-mail e senha inválida; clicar em "Entrar" | usuario@teste.com / senhaErrada | Mensagem de erro e permanece no login | Erro visível com "incorretos"; URL não contém /conta.html |
| CT-03 | TC-02 | Carrinho | Página do carrinho carregada | Digitar quantidade acima do estoque | 999 | Quantidade limitada a 829 com aviso | Campo com valor 829; aviso visível com "829" |
| CT-04 | TC-03 | Minha Conta | Usuário logado | Nome numérico, telefone vazio; clicar em "Salvar" | Nome: 999999; Telefone: vazio | Erros de nome e telefone; nada é salvo | Erro de nome ("apenas letras"); erro de telefone ("obrigatório"); sucesso não visível |
| CT-05 | TC-02 (CEP, não executado no 1º bimestre) | Carrinho | Página do carrinho carregada | Digitar CEP com letras; clicar em "Finalizar compra" | abcdefgh | Mensagem de CEP inválido; compra não finaliza | Erro visível com "apenas números"; sucesso não visível |

Arquivo dos testes: `cypress/e2e/atividade1.cy.js`
