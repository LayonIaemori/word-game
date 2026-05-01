// =============================================
// Word Game — Game Logic
// Author: Layon Iaemori
// Features: timer, hint, end-game modal, localStorage best score
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

const TOTAL_ROUNDS   = 10;
const ROUND_SECONDS  = 30;
const HINT_THRESHOLD = 15; // show hint when this many seconds remain
const LS_KEY         = 'wordgame_best';

// ---- State ----
let currentWord  = '';
let hits         = 0;
let misses       = 0;
let rounds       = 0;
let timeLeft     = ROUND_SECONDS;
let timerHandle  = null;
let roundActive  = false;
let usedWords    = [];

// ---- DOM refs ----
const shuffledWordEl  = document.getElementById('shuffled-word');
const guessInput      = document.getElementById('guess-input');
const feedbackEl      = document.getElementById('feedback');
const hitsEl          = document.getElementById('hits');
const missesEl        = document.getElementById('misses');
const roundsEl        = document.getElementById('rounds');
const timerFill       = document.getElementById('timer-fill');
const timerLabel      = document.getElementById('timer-label');
const hintEl          = document.getElementById('hint');
const bestDisplay     = document.getElementById('best-score-display');
const btnConfirm      = document.getElementById('btn-confirm');
const modalOverlay    = document.getElementById('modal-overlay');
const modalEmoji      = document.getElementById('modal-emoji');
const modalTitle      = document.getElementById('modal-title');
const modalSubtitle   = document.getElementById('modal-subtitle');
const modalHits       = document.getElementById('modal-hits');
const modalPct        = document.getElementById('modal-pct');
const modalBest       = document.getElementById('modal-best');

// ---- Helpers ----

/** Shuffle letters with Fisher-Yates, guarantee different result */
function shuffleWord(word) {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const shuffled = letters.join('');
  return shuffled === word && word.length > 1 ? shuffleWord(word) : shuffled;
}

/** Read best score from localStorage */
function getBest() {
  return parseInt(localStorage.getItem(LS_KEY) || '0', 10);
}

/** Save new best score if better */
function saveBest(score) {
  if (score > getBest()) localStorage.setItem(LS_KEY, score);
}

/** Update the best-score badge in the subtitle */
function refreshBestDisplay() {
  const best = getBest();
  bestDisplay.textContent = best > 0 ? `🏆 Recorde: ${best}/${TOTAL_ROUNDS}` : '';
}

/** Set feedback message and style */
function setFeedback(message, type) {
  feedbackEl.textContent = message;
  feedbackEl.className   = type;
}

/** Lock/unlock input and buttons during transition */
function setInputLocked(locked) {
  guessInput.disabled  = locked;
  btnConfirm.disabled  = locked;
}

/** Update the timer bar fill and label */
function updateTimerUI() {
  const pct = (timeLeft / ROUND_SECONDS) * 100;
  timerFill.style.width = pct + '%';
  timerLabel.textContent = timeLeft;

  timerFill.classList.remove('warning', 'danger');
  timerLabel.classList.remove('danger');

  if (timeLeft <= 5) {
    timerFill.classList.add('danger');
    timerLabel.classList.add('danger');
  } else if (timeLeft <= 10) {
    timerFill.classList.add('warning');
  }
}

/** Show hint: number of letters */
function showHint() {
  hintEl.textContent = `💡 Dica: a palavra tem ${currentWord.length} letras`;
}

// ---- Timer ----

function startTimer() {
  clearInterval(timerHandle);
  timeLeft = ROUND_SECONDS;
  updateTimerUI();
  hintEl.textContent = '';

  timerHandle = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft === HINT_THRESHOLD) showHint();

    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerHandle);
}

// ---- Game flow ----

function newRound() {
  if (rounds >= TOTAL_ROUNDS) {
    showEndGame();
    return;
  }

  // Pick a word not yet used this game
  const available = WORDS.filter(w => !usedWords.includes(w));
  const pool      = available.length > 0 ? available : WORDS;
  currentWord     = pool[Math.floor(Math.random() * pool.length)];
  usedWords.push(currentWord);

  shuffledWordEl.textContent = shuffleWord(currentWord);
  guessInput.value           = '';
  hintEl.textContent         = '';
  roundActive                = true;

  setFeedback('', '');
  setInputLocked(false);
  guessInput.focus();
  startTimer();
}

function handleTimeout() {
  roundActive = false;
  misses++;
  missesEl.textContent = misses;
  rounds++;
  roundsEl.textContent = `${rounds}/${TOTAL_ROUNDS}`;

  setFeedback(`⏱️ Tempo esgotado! A palavra era "${currentWord}".`, 'timeout');
  setInputLocked(true);

  setTimeout(() => {
    if (rounds >= TOTAL_ROUNDS) showEndGame();
    else newRound();
  }, 1800);
}

function checkGuess() {
  if (!roundActive) return;

  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) {
    setFeedback('Digite uma palavra antes de confirmar!', 'info');
    return;
  }

  stopTimer();
  roundActive = false;
  rounds++;
  roundsEl.textContent = `${rounds}/${TOTAL_ROUNDS}`;
  setInputLocked(true);

  if (guess === currentWord) {
    hits++;
    hitsEl.textContent = hits;
    setFeedback(`✅ Correto! A palavra era "${currentWord}".`, 'correct');
  } else {
    misses++;
    missesEl.textContent = misses;
    setFeedback(`❌ Errado! A palavra correta era "${currentWord}".`, 'wrong');
  }

  setTimeout(() => {
    if (rounds >= TOTAL_ROUNDS) showEndGame();
    else newRound();
  }, 1800);
}

function skipRound() {
  if (!roundActive) return;
  stopTimer();
  roundActive = false;
  misses++;
  missesEl.textContent = misses;
  rounds++;
  roundsEl.textContent = `${rounds}/${TOTAL_ROUNDS}`;
  setFeedback(`⏭️ Pulou! A palavra era "${currentWord}".`, 'wrong');
  setInputLocked(true);

  setTimeout(() => {
    if (rounds >= TOTAL_ROUNDS) showEndGame();
    else newRound();
  }, 1800);
}

// ---- End game ----

function showEndGame() {
  stopTimer();
  setInputLocked(true);

  const pct = Math.round((hits / TOTAL_ROUNDS) * 100);
  saveBest(hits);
  const best = getBest();
  refreshBestDisplay();

  let emoji, title, subtitle;
  if (pct === 100)    { emoji = '🏆'; title = 'Perfeito!';        subtitle = 'Você acertou todas as palavras!'; }
  else if (pct >= 80) { emoji = '🎉'; title = 'Muito bom!';       subtitle = 'Excelente desempenho!'; }
  else if (pct >= 60) { emoji = '😊'; title = 'Bom resultado!';   subtitle = 'Continue praticando!'; }
  else if (pct >= 40) { emoji = '🤔'; title = 'Pode melhorar!';   subtitle = 'Tente novamente para bater seu recorde!'; }
  else                { emoji = '😅'; title = 'Não foi dessa vez'; subtitle = 'Tente de novo — você consegue!'; }

  modalEmoji.textContent    = emoji;
  modalTitle.textContent    = title;
  modalSubtitle.textContent = subtitle;
  modalHits.textContent     = `${hits}/${TOTAL_ROUNDS}`;
  modalPct.textContent      = `${pct}%`;
  modalBest.textContent     = `${best}/${TOTAL_ROUNDS}`;

  modalOverlay.classList.remove('hidden');
}

function restartGame() {
  hits      = 0;
  misses    = 0;
  rounds    = 0;
  usedWords = [];

  hitsEl.textContent   = 0;
  missesEl.textContent = 0;
  roundsEl.textContent = `0/${TOTAL_ROUNDS}`;

  modalOverlay.classList.add('hidden');
  newRound();
}

// ---- Events ----

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});

// ---- Expose to HTML ----
window.checkGuess  = checkGuess;
window.newRound    = newRound;
window.skipRound   = skipRound;
window.restartGame = restartGame;

// ---- Init ----
refreshBestDisplay();
newRound();
