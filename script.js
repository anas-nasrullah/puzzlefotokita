const puzzleContainer = document.getElementById('puzzle');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const winSound = document.getElementById('winSound');
const failSound = document.getElementById('failSound');

const imageURL = 'https://raw.githubusercontent.com/anas-nasrullah/images/refs/heads/main/anas-anis-300x300.jpg';
let pieces = [];
let selected = null;
let timeLeft = 30;
let timer = null;

function createPuzzle() {
  pieces = [];
  puzzleContainer.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const div = document.createElement('div');
    div.className = 'piece';
    div.style.backgroundImage = `url(${imageURL})`;
    div.style.backgroundSize = '300px 300px';
    div.style.backgroundPosition = `-${(i % 4) * 75}px -${Math.floor(i / 4) * 75}px`;
    div.dataset.correctPos = div.style.backgroundPosition;
    div.addEventListener('click', () => selectPiece(i));
    pieces.push(div);
    puzzleContainer.appendChild(div);
  }
}

function shufflePuzzle() {
  const positions = pieces.map(p => p.style.backgroundPosition);
  positions.sort(() => Math.random() - 0.5);
  pieces.forEach((p, i) => {
    p.style.backgroundPosition = positions[i];
  });
}

function selectPiece(index) {
  if (timer === null) return;
  if (selected === null) {
    selected = index;
    pieces[selected].style.border = '2px solid red';
  } else {
    swapPieces(selected, index);
    pieces[selected].style.border = '1px solid #ccc';
    selected = null;
    checkSolved();
  }
}

function swapPieces(i, j) {
  const temp = pieces[i].style.backgroundPosition;
  pieces[i].style.backgroundPosition = pieces[j].style.backgroundPosition;
  pieces[j].style.backgroundPosition = temp;
}

function startGame() {
  createPuzzle();
  shufflePuzzle();
  message.innerText = '';
  timeLeft = 30;
  timerDisplay.innerText = `Waktu: ${timeLeft}`;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Waktu: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      message.innerText = '⏰ Waktu habis! Kamu gagal, silakan coba lagi.';
      failSound.play();
    }
  }, 1000);
}

function checkSolved() {
  let solved = pieces.every(p => p.style.backgroundPosition === p.dataset.correctPos);
  if (solved) {
    clearInterval(timer);
    timer = null;
    message.innerText = '🎉 Selamat! Kamu berhasil menyelesaikan puzzlenya!';
    winSound.play();
  }
}

// Inisialisasi
createPuzzle();
