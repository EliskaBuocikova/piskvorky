import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const playerIcon = document.querySelector('img');

if (currentPlayer === 'circle') {
  playerIcon.src = 'circle.svg';
}

const buttons = document.querySelectorAll('button');

const playedOut = (event) => {
  const move = event.target.classList;
  event.target.disabled = 'true';
  if (currentPlayer === 'circle') {
    move.value = 'board__field--circle';
    currentPlayer = 'cross';
    playerIcon.src = 'cross.svg';
  } else {
    currentPlayer === 'cross';
    move.value = 'board__field--cross';
    currentPlayer = 'circle';
    playerIcon.src = 'circle.svg';
  }
  const convertedSquare = Array.from(buttons);
  const squareForFindWinner = convertedSquare.map((button) => {
    if (button.classList.contains('board__field--circle')) {
      return 'o';
    } else if (button.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });
  const winner = findWinner(squareForFindWinner);
  if (winner === 'o') {
    alert('Tuto hru vyhrál hráč se symbolem 🔴!🏅');
  } else if (winner === 'x') {
    alert('Tuto hru vyhrál hráč se symbolem ❌!🏅');
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', playedOut);
});

const navigationFieldBlue = document.querySelector('.navigation__field--blue');

const verification = (event) => {
  const restart = confirm('Opravdu chceš začít novou hru?');
  if (!restart) {
    event.preventDefault();
  }
};

navigationFieldBlue.addEventListener('click', verification);
