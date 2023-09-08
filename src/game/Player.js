export class Player {
    constructor(board, game, color) {
        this.game = game;
        this.board = board;
        this.color = color;

        this.board.circles.forEach((circle, index) => {
            const col = index % game.numCols;
            // const row = Math.floor(index / game.cols);
            circle.dom.addEventListener("click", (e) => {
                const move = col;
                if (this.isWaitingForMove && game.isValidMove(move)) {
                    this.movePromise(move);
                    this.isWaitingForMove = false;
                }
            })
        });

        this.isWaitingForMove = false;
        this._movePromise = null; // Set this promise in makeMove function
    }

    async makeMove() {
        if (this.isWaitingForMove) {
            throw new Error("Supposed to wait till move is returned");
        }
        await new Promise((res, rej) => setTimeout(res, 50));
        this.isWaitingForMove = true;
        return new Promise((res, rej) => {
            this.movePromise = res;
        });
    }
}