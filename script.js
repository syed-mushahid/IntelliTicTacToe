var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const possibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var currentPlayer = 1;
var playerScore = 0;
var computerScore = 0;
var gameResultElement = document.getElementById("result");
var playerScoreElement = document.getElementById("playerScore");
var computerScoreElement = document.getElementById("computerScore");

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    cell.textContent = board[i] === 1 ? "X" : board[i] === 2 ? "O" : "";
    boardElement.appendChild(cell);
  }
}

function handleCellClick(event, index = null) {
  const clickedIndex = index ? index : event?.target?.dataset?.index;

  if (board[clickedIndex] === 0) {
    board[clickedIndex] = currentPlayer;
    if (checkWinner()) {
      gameResultElement.textContent = `Player ${currentPlayer} wins!`;
      updateScores();
      disableCellClick();
    } else if (board.indexOf(0) === -1) {
      // Check for a draw
      gameResultElement.textContent = "It's a draw!";
      disableCellClick();
    } else {
      currentPlayer = 2; // Switch player

      if (currentPlayer == 2) {
        handleRobotClick();
      }
    }
  }
}

function handleRobotClick() {
  //Check if there is any winning posibility
  let winningIndex = -1;
  for (const possibility of possibilities) {
    const [a, b, c] = possibility;
    if (board[a] == 2 && board[b] == 2 && board[c] == 0) {
      winningIndex = c;
      break;
    } else if (board[b] == 2 && board[c] == 2 && board[a] == 0) {
      winningIndex = a;
      break;
    } else if (board[a] == 2 && board[c] == 2 && board[b] == 0) {
      winningIndex = b;
      break;
    } else {
      if (board[4] == 0) {
        winningIndex = 4;
      }
    }
  }

  if (winningIndex !== -1) {
    board[winningIndex] = 2;
  } else {
    // Check if the user (Player One) is about to win
    let blockingIndex = -1;

    for (const possibility of possibilities) {
      const [a, b, c] = possibility;

      if (board[a] == 1 && board[b] == 1 && board[c] == 0) {
        blockingIndex = c;
        break;
      } else if (board[b] == 1 && board[c] == 1 && board[a] == 0) {
        blockingIndex = a;
        break;
      } else if (board[a] == 1 && board[c] == 1 && board[b] == 0) {
        blockingIndex = b;
        break;
      } else {
        if (board[4] == 0) {
          blockingIndex = 4;
        }
      }
    }

    if (blockingIndex !== -1) {
      board[blockingIndex] = 2;
    } else {
      // If no immediate threat, make a random move
      for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
          board[i] = 2;
          break;
        }
      }
    }
  }
  if (checkWinner()) {
    gameResultElement.textContent = `Player ${currentPlayer} wins!`;
    updateScores();
    disableCellClick();
  } else if (board.indexOf(0) === -1) {
    // Check for a draw
    gameResultElement.textContent = "It's a draw!";
    disableCellClick();
  } else {
    currentPlayer = 1;
  }
}

function checkWinner() {
  renderBoard();
  for (const possibility of possibilities) {
    const [a, b, c] = possibility;
    if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

function disableCellClick() {
  // Disable cell click after game over
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

function restartGame() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  currentPlayer = 1;
  gameResultElement.textContent = "";
  enableCellClick();
  renderBoard();
}

function enableCellClick() {
  // Enable cell click for a new game
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

function updateScores() {
  if (currentPlayer === 1) {
    playerScore++;
    playerScoreElement.textContent = playerScore;
  } else if (currentPlayer === 2) {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }
}

renderBoard();
