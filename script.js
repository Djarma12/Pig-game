'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let rolledNumber, activePlayer, current, score;

const initialParameters = function () {
  activePlayer = 0;
  current = 0;
  score = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  rollDice.disabled = false;
  hold.disabled = false;
};

const ifActivePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

initialParameters();
rollDice.addEventListener('click', function () {
  dice.classList.remove('hidden');
  rolledNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${rolledNumber}.png`;
  if (rolledNumber !== 1) {
    current += rolledNumber;
    document.querySelector(`#current--${activePlayer}`).textContent = current;
  } else {
    current = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = current;
    ifActivePlayer();
  }
});

hold.addEventListener('click', function () {
  let scorePlayer = Number(
    document.querySelector(`#score--${activePlayer}`).textContent
  );
  scorePlayer += current;
  document.querySelector(`#score--${activePlayer}`).textContent = scorePlayer;
  current = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = current;
  console.log(scorePlayer);
  if (scorePlayer < 20) {
    ifActivePlayer();
    score = 0;
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    rollDice.disabled = true;
    hold.disabled = true;
    dice.classList.add('hidden');
  }
});

newGame.addEventListener('click', initialParameters);
