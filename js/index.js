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
const gamePlay2 = document.querySelector('.game-play-s2');
const playerPick = document.querySelector('.player-pick');
const housePick = document.querySelector('.house-pick');
const scorePoints = document.querySelector('.score-points');

let arr = Array.from(gameCircle);
let tempArr;
let score = 0;

/* Sounds */
let playwin = new Audio('../sounds/mixkit-winning-notification-2018.wav');
let playLose = new Audio('../sounds/mixkit-losing-bleeps-2026.wav');
let pick = new Audio('../sounds/mixkit-game-ball-tap-2073.wav');
let bubble = new Audio('../sounds/mixkit-water-bubble-1317.wav');

function getRandomItem(list) {
  let randomIndex = Math.floor(Math.random() * list.length);

  let item = list[randomIndex];

  return item;
}

function update(p, h, s) {
  if ((p === 1 && h === 2) || (p === 2 && h === 3) || (p === 3 && h === 1)) {
    score = score + 1;
    s.textContent = `${score}`;
    playwin.play();
    document.querySelector('.result').innerHTML = 'YOU WIN';
  } else {
    score = score - 1;
    s.textContent = `${score}`;
    playLose.play();
    document.querySelector('.result').innerHTML = 'YOU LOSE';
  }
}

arr.forEach(div => {
  div.addEventListener('click', function () {
    pick.play();
    gamePlay.classList.add('disable');
    gamePlay2.classList.toggle('disable');

    let playerPicked = div;
    playerPick.innerHTML = playerPicked.outerHTML;
    /* Non-Choosed items */
    tempArr = arr.filter(a => {
      return div.dataset.id !== a.dataset.id;
    });
    /* Getting random item from non-choosed item */
    let housePicked = getRandomItem(tempArr);
    let pid = Number(playerPicked.dataset.id);
    let hid = Number(housePicked.dataset.id);

    setTimeout(function () {
      housePick.innerHTML = housePicked.outerHTML;
      bubble.play();
    }, 1000);

    setTimeout(() => {
      document.querySelector('.play-again').classList.toggle('disable');
      update(pid, hid, scorePoints);
    }, 2000);
  });
});

document.querySelector('.btn-play').addEventListener('click', function () {
  gamePlay.classList.remove('disable');
  gamePlay2.classList.toggle('disable');
  tempArr = [];
  housePick.innerHTML = '<div class="temp-circle"></div>';
  document.querySelector('.play-again').classList.toggle('disable');
  document.querySelector('.result').classList.remove('disable');
});
