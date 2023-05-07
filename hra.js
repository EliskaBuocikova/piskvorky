import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

//nastavení výchozího stavu hry:
let currentPlayer = 'circle';

const playerIcon = document.querySelector('img');

if (currentPlayer === 'circle') {
  playerIcon.src = 'circle.svg';
}

const buttons = document.querySelectorAll('button');

// znepřístupnění již odehraných políček, přidávání koleček a křížků na odehraná políčka, předávání tahu druhému hráči a měnění zobrazení hráče, který je na tahu:
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

  // vytvoření pole:
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

  // znepřístupnění políček v průběhu čekání na odehrání tahu umělou inteligencí:
  buttons.forEach((button) => {
    button.disabled = true;
  });

  // funkce pro zpřístupnění prázdných políček:
  const makeEmptyButtonsAvailable = () => {
    buttons.forEach((button) => {
      if (
        !button.classList.contains('board__field--circle') &&
        !button.classList.contains('board__field--cross')
      ) {
        button.disabled = false;
      }
    });
  };

  // přidání umělé inteligence k odehrání tahu za hráče s křížkem:
  fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      board: squareForFindWinner,
      player: 'x',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      makeEmptyButtonsAvailable(); // volání funkce pro zpřístupnění prázdných políček
      if (currentPlayer === 'cross') {
        const { x, y } = data.position;
        const button = buttons[x + y * 10];
        button.click(); // simulace kliknutí myší na políčko
      }
    });

  // informace o vítězovi hry:
  const winner = findWinner(squareForFindWinner);
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner} !🍾🏅🎉..`);
      location.reload();
    }, 220);
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert('Tahle hra je nerozhodně! 🤷..');
      location.reload();
    }, 220);
  }
};

// spuštění funkce playedOut na kliknutí:
buttons.forEach((button) => {
  button.addEventListener('click', playedOut);
});

// ověření, zda chce uživatel restartovat hru:
const navigationFieldBlue = document.querySelector('.navigation__field--blue');

const verification = (event) => {
  const restart = confirm('Opravdu chceš začít novou hru?');
  if (!restart) {
    event.preventDefault();
  }
};

navigationFieldBlue.addEventListener('click', verification);
