import random  # Importa a biblioteca random para gerar números aleatórios.

def carregar_palavras():
    with open('words.txt', 'r') as arquivo:
        palavras = arquivo.read().splitlines()  # Lê as palavras do arquivo e cria uma lista com cada palavra em uma linha.
        return palavras
    
def selecionar_palavras(palavras):
    return random.choice(palavras)  # Seleciona uma palavra aleatória da lista de palavras.

def embaralhar_palavra(palavra):
    letras = list(palavra)  # Converte a palavra em uma lista de letras.
    random.shuffle(letras)  # Embaralha aleatoriamente as letras da palavra.
    return ''.join(letras)  # Junta as letras embaralhadas de volta em uma string.

def tentar_adivinhar():
    return input('Adivinhe a palavra: ')  # Solicita ao jogador que digite sua tentativa de adivinhar a palavra.

def verificar_palavra(adivinhacao, palavra):
    return adivinhacao == palavra  # Verifica se a palavra adivinhada pelo jogador é igual à palavra correta.

def jogar():
    palavras = carregar_palavras()  # Carrega as palavras do arquivo.
    palavra = selecionar_palavras(palavras)  # Seleciona uma palavra aleatória.
    palavra_embaralhada = embaralhar_palavra(palavra)  # Embaralha a palavra selecionada.

    print(f'Palavra embaralhada: {palavra_embaralhada}')  # Exibe a palavra embaralhada para o jogador.

    tentativa = tentar_adivinhar()  # Solicita a tentativa de adivinhar a palavra.

    if verificar_palavra(tentativa, palavra):  # Verifica se a tentativa do jogador é correta.
        print('Parabéns! Você adivinhou a palavra corretamente.')
    else:
        print(f'Infelizmente, a palavra correta era: {palavra}')  # Informa a palavra correta caso a tentativa esteja incorreta.

jogar()  # Inicia o jogo.
