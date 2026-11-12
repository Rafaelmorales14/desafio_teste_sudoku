# Sudoku binário 6 × 6

## Especificação

Uma solução completa tem seis linhas de seis casas. Cada casa contém o número `0` ou `1`. Cada linha e coluna tem três zeros e três uns, sem três valores iguais consecutivos. Linhas completas precisam ser distintas entre si, assim como as colunas. A solução preserva as pistas. [Regras do Binairo](https://www.puzzle-binairo.com/faq.php)

## Contrato para a implementação

Em `src/jogo.js`, exporte a função síncrona `validarSolucao(grade, pistas)`. Os dois argumentos são matrizes 6 × 6 com linhas no primeiro índice. Na grade, cada casa deve ser o número `0` ou `1`. Nas pistas, `null` deixa a casa livre. Retorne `true` para uma solução válida e `false` quando qualquer regra falhar, inclusive quando as matrizes tiverem forma ou conteúdo inválidos.

## Casos de teste

- **S01** aceita uma solução válida com pistas fixas.
- **S02** rejeita uma matriz com cinco linhas ou com uma linha de cinco casas.
- **S03** rejeita o número `2`, a string `'1'` e uma casa com `null` na solução.
- **S04** rejeita uma solução válida para o tabuleiro sem pistas que altera as pistas dadas.
- **S05** rejeita três números iguais consecutivos na linha e, com a grade transposta, na coluna.
- **S06** rejeita uma linha sem três zeros e três uns e testa o equivalente na coluna.
- **S07** rejeita linhas duplicadas e testa o equivalente nas colunas.

## Execução

Com Node.js 24, rode `npm install` e `npm test` na raiz para executar os testes com Jest. Esta entrega mantém a etapa **Red** do TDD: sem `src/jogo.js`, a suíte falha por falta do módulo. Crie esse módulo com o contrato acima e repita `npm test` para executar as asserções.

## Colaborador

Rafael Blasques Morales ([Rafaelmorales14](https://github.com/Rafaelmorales14)).
