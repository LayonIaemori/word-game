// =============================================
// Word Game — Game Logic
// Author: Layon Iaemori
// =============================================

const WORDS = [
  // Animais
  'cachorro', 'elefante', 'girafa', 'borboleta', 'tartaruga',
  'crocodilo', 'papagaio', 'esquilo', 'leopardo', 'hamster',
  // Frutas
  'banana', 'abacaxi', 'morango', 'melancia', 'maracuja',
  'framboesa', 'carambola', 'pitanga', 'goiaba', 'caqui',
  // Objetos
  'computador', 'bicicleta', 'guitarra', 'mochila', 'caderno',
  'telescopio', 'microfone', 'lampada', 'geladeira', 'martelo',
  // Lugares
  'biblioteca', 'aeroporto', 'restaurante', 'hospital', 'mercado',
  'laboratorio', 'planetario', 'aquario', 'estadio', 'museu',
  // Natureza
  'montanha', 'cachoeira', 'floresta', 'vulcao', 'oceano',
  'tempestade', 'arco-iris', 'avalanche', 'peninsula', 'mangue'
];

let currentWord = '';
let hits = 0;
let misses = 0;
let rounds = 0;

const shuffledWordEl = document.getElementById('shuffled-word');
const guessInput     = document.getElementById('guess-input');
const feedbackEl     = document.getElementById('feedback');
const hitsEl         = document.getElementById('hits');
const missesEl       = document.getElementById('misses');
const roundsEl       = document.getElementById('rounds');

/** Shuffle the letters of a word using Fisher-Yates algorithm */
function shuffleWord(word) {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  // Make sure the shuffled version is actually different
  const shuffled = letters.join('');
  return shuffled === word && word.length > 1 ? shuffleWord(word) : shuffled;
}

/** Pick a random word and display it shuffled */
function newRound() {
  currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  shuffledWordEl.textContent = shuffleWord(currentWord);
  guessInput.value = '';
  guessInput.focus();
  setFeedback('', '');
}

/** Set the feedback message and style */
function setFeedback(message, type) {
  feedbackEl.textContent = message;
  feedbackEl.className = type;
}

/** Handle the player's guess */
function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();

  if (!guess) {
    setFeedback('Digite uma palavra antes de confirmar!', 'info');
    return;
  }

  rounds++;
  roundsEl.textContent = rounds;

  if (guess === currentWord) {
    hits++;
    hitsEl.textContent = hits;
    setFeedback(`✅ Correto! A palavra era "${currentWord}".`, 'correct');
  } else {
    misses++;
    missesEl.textContent = misses;
    setFeedback(`❌ Errado! A palavra correta era "${currentWord}".`, 'wrong');
  }

  // Automatically start next round after a short delay
  setTimeout(newRound, 1800);
}

/** Allow pressing Enter to confirm guess */
guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});

// Expose functions used in HTML
window.checkGuess = checkGuess;
window.newRound   = newRound;

// Start the first round on page load
newRound();
