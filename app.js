let randomNumber = Math.floor(Math.random() * 20) + 1;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guess');
const remaining = document.querySelector('.lastresult');
const lowOrHi = document.querySelector('.loworhi');
const startOver = document.querySelector('.resultparas');
const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1 || guess > 20) {
    alert('Please enter a number between 1 and 20');
  } else {
    prevGuess.push(guess);
    if (numGuess === 5) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('Congratulations! You guessed it right');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Number is too low');
  } else if (guess > randomNumber) {
    displayMessage('Number is too high');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.textContent += `${guess}, `;
  numGuess++;
  remaining.textContent = `${5 - numGuess + 1}`;
}

function displayMessage(message) {
  lowOrHi.textContent = message;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<button id="newGame">Start New Game</button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = Math.floor(Math.random() * 20) + 1;
    prevGuess = [];
    numGuess = 1;
    guessSlot.textContent = '';
    remaining.textContent = `${5 - numGuess + 1}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
    lowOrHi.textContent = '';
  });
}
