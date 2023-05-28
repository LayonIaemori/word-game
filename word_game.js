function shuffleWords() {
    var wordList = document.getElementById("word-list");
    for (var i = wordList.children.length; i >= 0; i--) {
        wordList.appendChild(wordList.children[Math.random() * i | 0]);
    }
}

function guessWord() {
    var wordList = document.getElementById("word-list");
    var firstWord = wordList.children[0].textContent;
    var guess = prompt("Adivinhe a palavra:");
    if (guess === firstWord) {
        alert("Parabéns! Você adivinhou a palavra corretamente.");
    } else {
        alert("Infelizmente, você errou. A palavra correta era: " + firstWord);
    }
}
