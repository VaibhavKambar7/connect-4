export class Game {
    constructor(boardDom, numRows, numCols, maxPlayerCount) {
        this.boardDom = boardDom;
        this.numRows = numRows;
        this.numCols = numCols;
        this.maxPlayerCount = maxPlayerCount;

        this.players = [];
        this.currentPlayerIndex = 0;
        
        this.board = this.initializeBoard();
    }

    initializeBoard() {
        // array of rows from bottom to top. Values are playerIndex from this.players. -1 is empty.
        const board = [];
        for (let row = 0; row < this.numRows; row++) {
            const row = [];
            for (let col = 0; col < this.numCols; col++) {
                row.push(-1);
            }
            board.push(row);
        }
        return board;
    }

    addPlayers(...players) {
        players.forEach(player => {
            this.addPlayer(player);
        })
    }

    addPlayer(player) {
        if (this.players.length >= this.maxPlayerCount) {
            console.log(`Maximum player limit of ${this.maxPlayerCount} reached`);
        }
        this.players.push(player);
    }

    async start() {
        while(true) {
            const move = await this.players[this.currentPlayerIndex].makeMove();
            const row = this.getMoveRow(move);
            this.boardDom.updateCircle(row, move, this.players[this.currentPlayerIndex]);
            this.board[row][move] = this.currentPlayerIndex;
            
            const gameStatus = this.isGameOver();
            if (gameStatus.over) {
                if (gameStatus.winner) return this.players[this.currentPlayerIndex];
                return null;
            }

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
    }

    isGameOver() {
        // Check for a win
        if (this.checkForWin()) {
            const currentPlayer = this.players[this.currentPlayerIndex];
            return {over: true, winner: true};
        }
    
        // Check for a tie (board is full)
        if (this.isBoardFull()) {
            return {over: true, winner: false};
        }
    
        return {over: false};
    }
    
    checkForWin() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const playerIndex = this.currentPlayerIndex;
    
        // Check horizontally
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col <= this.numCols - 4; col++) {
                if (
                    this.board[row][col] === playerIndex &&
                    this.board[row][col + 1] === playerIndex &&
                    this.board[row][col + 2] === playerIndex &&
                    this.board[row][col + 3] === playerIndex
                ) {
                    return true;
                }
            }
        }
    
        // Check vertically
        for (let col = 0; col < this.numCols; col++) {
            for (let row = 0; row <= this.numRows - 4; row++) {
                if (
                    this.board[row][col] === playerIndex &&
                    this.board[row + 1][col] === playerIndex &&
                    this.board[row + 2][col] === playerIndex &&
                    this.board[row + 3][col] === playerIndex
                ) {
                    return true;
                }
            }
        }
    
        // Check diagonally (both directions)
        for (let row = 0; row <= this.numRows - 4; row++) {
            for (let col = 0; col <= this.numCols - 4; col++) {
                // Diagonal from top-left to bottom-right
                if (
                    this.board[row][col] === playerIndex &&
                    this.board[row + 1][col + 1] === playerIndex &&
                    this.board[row + 2][col + 2] === playerIndex &&
                    this.board[row + 3][col + 3] === playerIndex
                ) {
                    return true;
                }
    
                // Diagonal from top-right to bottom-left
                if (
                    this.board[row][col + 3] === playerIndex &&
                    this.board[row + 1][col + 2] === playerIndex &&
                    this.board[row + 2][col + 1] === playerIndex &&
                    this.board[row + 3][col] === playerIndex
                ) {
                    return true;
                }
            }
        }
    
        return false;
    }
    
    isBoardFull() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                if (this.board[row][col] === -1) {
                    return false; // Found an empty cell, board is not full
                }
            }
        }
        return true; // All cells are occupied, it's a tie
    }    

    isValidMove(move) {
        return this.getMoveRow(move) !== undefined;
    }

    getMoveRow(move) {
        for (let row = 0; row < this.board.length; row++) {
            if (this.board[row][move] == -1) return row;
        }
        return undefined;
    }
}