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
const result = document.querySelectorAll('.result');
const btnPlay = document.querySelectorAll('.btn-play');

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
  let pid = Number(p.dataset.id);
  let hid = Number(h.dataset.id);

  if (
    (pid === 1 && hid === 2) ||
    (pid === 2 && hid === 3) ||
    (pid === 3 && hid === 1)
  ) {
    score = score + 1;
    s.textContent = `${score}`;
    playwin.play();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    div1.classList.add('circle', 'circle-1');
    div2.classList.add('circle', 'circle-2');
    div3.classList.add('circle', 'circle-3');

    playerPick.insertBefore(div3, playerPick.children[0]);
    playerPick.insertBefore(div2, playerPick.children[0]);
    playerPick.insertBefore(div1, playerPick.children[0]);
    result.forEach(e => {
      e.innerHTML = 'YOU WIN';
    });
  } else {
    score = score - 1;
    s.textContent = `${score}`;
    playLose.play();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    div1.classList.add('circle', 'circle-1');
    div2.classList.add('circle', 'circle-2');
    div3.classList.add('circle', 'circle-3');

    housePick.insertBefore(div3, housePick.children[0]);
    housePick.insertBefore(div2, housePick.children[0]);
    housePick.insertBefore(div1, housePick.children[0]);
    result.forEach(e => {
      e.innerHTML = 'YOU LOSE';
    });
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

    setTimeout(function () {
      housePick.innerHTML = housePicked.outerHTML;
      bubble.play();
    }, 750);

    setTimeout(() => {
      document.querySelector('.play-again').classList.toggle('disable');
      document
        .querySelector('.play-again-mobile')
        .classList.toggle('mobile-disable');
      update(playerPicked, housePicked, scorePoints);
    }, 1500);
  });
});

btnPlay.forEach(play => {
  play.addEventListener('click', function () {
    gamePlay.classList.remove('disable');
    gamePlay2.classList.toggle('disable');
    tempArr = [];
    housePick.innerHTML =
      '<div class="temp-circle"><div class="temp-circle-small"></div></div>';
    document.querySelector('.play-again').classList.toggle('disable');
    document
      .querySelector('.play-again-mobile')
      .classList.toggle('mobile-disable');
  });
});
