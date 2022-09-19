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
const housePick = document.querySelector('.house-pick');

let arr = Array.from(gameCircle);
let tempArr;
let playerPicked;
let housePicked;

function getRandomItem(list) {
  let randomIndex = Math.floor(Math.random() * list.length);

  let item = list[randomIndex];

  return item;
}

arr.forEach(div => {
  div.addEventListener('click', function () {
    gamePlay.classList.toggle('disable');
    playerPicked = div.outerHTML;
    playerPick.innerHTML = playerPicked;
    /* Non-Choosed items */
    tempArr = arr.filter(a => {
      return div.dataset.id !== a.dataset.id;
    });
    /* Getting random item from non-choosed item */
    housePicked = getRandomItem(tempArr);
    setTimeout(function () {
      housePick.innerHTML = housePicked.outerHTML;
      console.log(housePicked.dataset.id);
    }, 2000);
  });
});
