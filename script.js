class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.statusDisplay = document.getElementById('status');
        this.cells = document.querySelectorAll('.cell');
        this.restartButton = document.getElementById('restart');
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e), { once: true });
        });

        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.updateCell(cell, index);
        this.checkGameStatus();
    }

    updateCell(cell, index) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }

    checkGameStatus() {
        let roundWon = false;

        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            this.statusDisplay.textContent = `Player ${this.currentPlayer} wins!`;
            this.gameActive = false;
            return;
        }

        if (!this.board.includes('')) {
            this.statusDisplay.textContent = 'Game ended in a draw!';
            this.gameActive = false;
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });

        // Remove old event listeners and add new ones
        this.cells.forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });

        // Reinitialize click events
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e), { once: true });
        });
    }
}

// Start the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 