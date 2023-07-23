let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== '')) {
    return 'draw';
  }

  return null;
}

function makeMove(cellIndex) {
  if (board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    const cell = document.getElementsByClassName('cell')[cellIndex];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    const winner = checkWinner();
    if (winner) {
      if (winner === 'draw') {
        showPopup("It's a draw!");
      } else {
        showPopup(`${winner} wins!`);
      }
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function resetGame() {
  board.fill('');
  currentPlayer = 'X';
  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
  }
}

function showPopup(message) {
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
  popupContent.innerText = message;

  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerText = 'Close';
  closeButton.onclick = () => {
    document.body.removeChild(popupContainer);
  };

  popupContent.appendChild(closeButton);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
}

resetGame();
