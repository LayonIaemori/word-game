# 🎮 Word Game — Jogo de Palavras

> Descubra a palavra embaralhada antes de errar 3 vezes!

[![Demo](https://img.shields.io/badge/▶%20Jogar%20Agora-GitHub%20Pages-e94560?style=for-the-badge&logo=github&logoColor=white)](https://layoniaemori.github.io/word-game/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)]()

---

## 📸 Preview

| Tela do jogo |
|---|
| Palavra embaralhada em destaque, placar de acertos/erros/rodadas e feedback colorido em tempo real |

---

## 🕹️ Como jogar

1. Acesse o jogo pelo botão **Jogar Agora** acima
2. Uma palavra embaralhada aparece na tela
3. Digite sua resposta e pressione **Confirmar** (ou Enter)
4. Acertou ✅ — próxima palavra começa automaticamente
5. Errou ❌ — a resposta correta é revelada e o jogo avança
6. Acompanhe seu placar de acertos e erros!

---

## ✨ Funcionalidades

- 🔀 Embaralhamento real com algoritmo Fisher-Yates
- 🏆 Placar de acertos, erros e rodadas por sessão
- ✅ Feedback visual colorido (verde = acerto, vermelho = erro)
- ⏩ Avanço automático para a próxima palavra
- ⏭️ Botão de "Pular" palavra
- ⌨️ Suporte ao Enter para confirmar resposta
- 📱 Layout responsivo (mobile e desktop)
- 🐍 Versão para terminal em Python com 3 tentativas por palavra

---

## 🗂️ Estrutura do projeto

```
word-game/
├── index.html          # Entrada principal — GitHub Pages
├── css/
│   └── style.css       # Estilos visuais do jogo
├── js/
│   └── game.js         # Lógica JavaScript (Fisher-Yates, placar, feedback)
├── python/
│   ├── word_game.py    # Versão para terminal com 3 tentativas
│   └── words.txt       # Banco de 50 palavras organizadas por categoria
└── README.md
```

---

## 🚀 Como rodar localmente

### Versão Web
```bash
# Clone o repositório
git clone https://github.com/LayonIaemori/word-game.git
cd word-game

# Abra no navegador
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Versão Python (terminal)
```bash
cd python
python word_game.py
```
> Requer Python 3.10 ou superior.

---

## 📦 Banco de palavras

50 palavras organizadas em 5 categorias:

| Categoria | Exemplos |
|---|---|
| 🐾 Animais | cachorro, elefante, borboleta... |
| 🍎 Frutas | banana, abacaxi, maracujá... |
| 💃 Objetos | computador, guitarra, telescópio... |
| 🏙️ Lugares | biblioteca, aerøporto, planetário... |
| 🌲 Natureza | montanha, cachoeira, tempestade... |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML5 | — | Estrutura da página |
| CSS3 | — | Layout responsivo e visual |
| JavaScript (ES6+) | — | Lógica do jogo no navegador |
| Python | 3.10+ | Versão terminal |

---

## 🔮 Próximas melhorias

- [ ] Temporizador regressivo por rodada
- [ ] Recordes salvos com `localStorage`
- [ ] Seleção de categoria de palavras
- [ ] Animações de acerto/erro
- [ ] Modo multiplayer local

---

## 👤 Autor

**Layon Iaemori**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/layoniaemori/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/LayonIaemori)

---

<div align="center">
  <sub>Feito com ❤️ por Layon Iaemori</sub>
</div>
