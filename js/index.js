/* Rules */
const rulesButton = document.querySelector('.btn');
const rulesContent = document.querySelector('.rules-content');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.close-icon');

function popup() {
  rulesContent.classList.toggle('popup-active');
  overlay.classList.toggle('overlay-active');
}
closeIcon.addEventListener('click', popup);

rulesButton.addEventListener('click', popup);

/* Game */
const gameCircle = document.querySelectorAll('.choose');
const gamePlay = document.querySelector('.game-play');
const playerPick = document.querySelector('.player-pick');

let arr = Array.from(gameCircle);
let playerPicked;

arr.forEach(div => {
  div.addEventListener('click', function () {
    gamePlay.classList.toggle('disable');
    playerPicked = div.outerHTML;
    playerPick.innerHTML = playerPicked;
  });
});
