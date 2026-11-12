import { test, expect } from '@jest/globals';
import { validarSolucao } from '../src/jogo.js';

const grade = (...linhas) => linhas.map(linha => [...linha].map(Number));
const transpor = matriz => matriz[0].map((_, coluna) => matriz.map(linha => linha[coluna]));

const solucao = grade('001101', '110010', '011001', '100110', '101100', '010011');
const pistas = [
    [0, null, null, 1, null, null],
    [null, 1, null, null, 1, null],
    [null, null, 1, null, null, 1],
    [1, null, null, null, 1, null],
    [null, 0, null, 1, null, null],
    [null, null, 0, null, null, 1],
];

test('S01 aceita solução completa que preserva as pistas', () => {
    expect(validarSolucao(solucao, pistas)).toBe(true);
});

test('S02 rejeita grade com cinco linhas ou com uma linha curta', () => {
    expect(validarSolucao(solucao.slice(0, 5), pistas)).toBe(false);

    const irregular = solucao.map((linha, i) => i === 0 ? linha.slice(0, 5) : linha);
    expect(validarSolucao(irregular, pistas)).toBe(false);
});

test('S03 rejeita número não binário, string e célula vazia na solução', () => {
    for (const valor of [2, '1', null]) {
        const tentativa = structuredClone(solucao);
        tentativa[0][1] = valor;
        expect(validarSolucao(tentativa, pistas)).toBe(false);
    }
});

test('S04 rejeita solução estruturalmente válida que contraria uma pista', () => {
    const invertida = solucao.map(linha => linha.map(valor => 1 - valor));
    expect(validarSolucao(invertida, pistas)).toBe(false);
});

const semPistas = Array.from({ length: 6 }, () => Array(6).fill(null));

const violacoes = [
    ['S05', 'trinca horizontal', grade('011100', '100011', '011010', '010101', '100101', '101010')],
    ['S06', 'linha com desequilíbrio entre zeros e uns', grade('101101', '010101', '001010', '110011', '001100', '110010')],
    ['S07', 'linhas idênticas', grade('100101', '011010', '101001', '010101', '011010', '100110')],
];

for (const [id, regra, tentativa] of violacoes) {
    test(`${id} rejeita ${regra} e a violação equivalente nas colunas`, () => {
        expect(validarSolucao(tentativa, semPistas)).toBe(false);
        expect(validarSolucao(transpor(tentativa), semPistas)).toBe(false);
    });
}
