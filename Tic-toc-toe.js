document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = true;
    
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    function createCell(index) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        return cell;
    }
    
    function handleClick(e) {
        const index = e.target.dataset.index;
        if (gameBoard[index] || !gameActive) return;
        
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell)) {
            status.textContent = "It's a Tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
    
    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }
    
    function resetGame() {
        gameBoard = Array(9).fill(null);
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = "Player X's Turn";
        Array.from(board.children).forEach(cell => cell.textContent = '');
    }
    
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            board.appendChild(createCell(i));
        }
    }
    
    resetButton.addEventListener("click", resetGame);
    initializeBoard();
});
