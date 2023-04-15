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
