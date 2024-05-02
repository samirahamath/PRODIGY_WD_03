// JavaScript (script.js)

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let winner = null;
let playerXWins = 0;
let playerOWins = 0;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle click on cell
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update board array and UI
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    // Check for winner
    checkForWinner();
}

// Function to check for winner
function checkForWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }

    if (winner) {
        endGame();
    } else if (!board.includes('')) {
        endGame('draw');
    } else {
        changePlayer();
    }
}

// Function to end the game
function endGame(outcome = 'win') {
    gameActive = false;
    const statusText = document.getElementById('status-text');
    if (outcome === 'win') {
        statusText.textContent = `${winner} wins!`;
        updateWinningPoints(winner);
    } else if (outcome === 'draw') {
        statusText.textContent = `It's a draw!`;
    }
}

// Function to change player
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const statusText = document.getElementById('status-text');
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    winner = null;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    const statusText = document.getElementById('status-text');
    statusText.textContent = `Player X's turn`;
}

// Function to update winning points
function updateWinningPoints(player) {
    if (player === 'X') {
        playerXWins++;
        document.getElementById('player-x-wins').textContent = `Player X Wins: ${playerXWins}`;
    } else if (player === 'O') {
        playerOWins++;
        document.getElementById('player-o-wins').textContent = `Player O Wins: ${playerOWins}`;
    }
}

// Event listener for cell clicks
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for reset button click
document.getElementById('reset-btn').addEventListener('click', resetGame);
