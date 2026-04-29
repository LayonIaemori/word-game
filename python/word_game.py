"""Word Game — Terminal Version
Author: Layon Iaemori
Descricao: Jogo de adivinhar palavras embaralhadas no terminal.
"""

import random
import os

MAX_ATTEMPTS = 3
WORDS_FILE = os.path.join(os.path.dirname(__file__), 'words.txt')


def load_words(filepath: str) -> list[str]:
    """Load words from a text file, one word per line."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            words = [line.strip() for line in f if line.strip()]
        if not words:
            raise ValueError('O arquivo de palavras esta vazio.')
        return words
    except FileNotFoundError:
        print(f'[ERRO] Arquivo nao encontrado: {filepath}')
        raise SystemExit(1)
    except ValueError as e:
        print(f'[ERRO] {e}')
        raise SystemExit(1)


def shuffle_word(word: str) -> str:
    """Shuffle word letters ensuring the result differs from the original."""
    letters = list(word)
    random.shuffle(letters)
    shuffled = ''.join(letters)
    # Re-shuffle if result is identical to original (for short words)
    if shuffled == word and len(word) > 1:
        return shuffle_word(word)
    return shuffled


def play_round(word: str) -> bool:
    """Play a single round. Returns True if the player guesses correctly."""
    shuffled = shuffle_word(word)
    print(f'\nPalavra embaralhada: {shuffled.upper()}')
    print(f'(A palavra tem {len(word)} letras)')

    for attempt in range(1, MAX_ATTEMPTS + 1):
        guess = input(f'Tentativa {attempt}/{MAX_ATTEMPTS}: ').strip().lower()

        if guess == word:
            print('Parabens! Voce acertou! \U0001f389')
            return True

        remaining = MAX_ATTEMPTS - attempt
        if remaining > 0:
            print(f'Errou! Ainda tem {remaining} tentativa(s).')

    print(f'Que pena! A palavra correta era: {word.upper()}')
    return False


def play_game():
    """Main game loop."""
    print('=' * 40)
    print('       WORD GAME — Jogo de Palavras')
    print('=' * 40)

    words = load_words(WORDS_FILE)
    hits = 0
    rounds = 0

    while True:
        word = random.choice(words)
        rounds += 1
        print(f'\n--- Rodada {rounds} ---')

        if play_round(word):
            hits += 1

        again = input('\nJogar novamente? (s/n): ').strip().lower()
        if again != 's':
            break

    print('\n' + '=' * 40)
    print(f' Resultado final: {hits}/{rounds} acertos')
    accuracy = (hits / rounds * 100) if rounds > 0 else 0
    print(f' Aproveitamento: {accuracy:.1f}%')
    print('=' * 40)
    print('Obrigado por jogar!')


if __name__ == '__main__':
    play_game()
