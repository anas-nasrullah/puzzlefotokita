const puzzleContainer = document.getElementById('puzzle');
const message = document.getElementById('message');
const imageURL = 'https://raw.githubusercontent.com/anas-nasrullah/images/refs/heads/main/anas-anis-300x300.jpg'; // Ganti dengan foto pacar / teman
let pieces = [];

function createPuzzle() {
  pieces = [];
  puzzleContainer.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.className = 'piece';
    div.style.backgroundImage = `url(${imageURL})`;
    div.style.backgroundSize = '300px 300px';
    div.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
    div.dataset.index = i;
    div.addEventListener('click', () => selectPiece(i));
    pieces.push(div);
    puzzleContainer.appendChild(div);
  }
}

let selected = null;

function selectPiece(index) {
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
  const tempBG = pieces[i].style.backgroundPosition;
  pieces[i].style.backgroundPosition = pieces[j].style.backgroundPosition;
  pieces[j].style.backgroundPosition = tempBG;
}

function shufflePuzzle() {
  const positions = pieces.map(p => p.style.backgroundPosition);
  positions.sort(() => Math.random() - 0.5);
  pieces.forEach((p, i) => {
    p.style.backgroundPosition = positions[i];
  });
  message.innerText = '';
}

function checkSolved() {
  let solved = true;
  for (let i = 0; i < 9; i++) {
    const correctPos = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
    if (pieces[i].style.backgroundPosition !== correctPos) {
      solved = false;
      break;
    }
  }
  if (solved) {
    message.innerText = '🎉 Selamat! Puzzle selesai!';
  }
}

createPuzzle();
shufflePuzzle();
