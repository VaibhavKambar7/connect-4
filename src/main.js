import { Game } from "./game/Game.js";
import { Player } from "./game/Player.js";
import { Board } from "./gameElements/Board.js";

async function startGame() {
    const board = new Board(6, 7);
    const game = new Game(board, 6, 7, 3);
    const p1 = new Player(board, game, 'red');
    const p2 = new Player(board, game, 'blue');
    // const p3 = new Player(board, game, 'green');
    game.addPlayers(p1, p2);
    document.getElementById("connect4").innerHTML = '';
    document.getElementById("connect4").append(board.dom);

    const winner = await game.start();
    if (winner) {
        document.getElementById("winner").innerText = `${winner.color.charAt(0).toUpperCase()}${winner.color.slice(1)} wins`
    } else {
        document.getElementById("winner").innerText = "It's a tie!"
    }
    document.getElementById('overlay').classList.remove('hidden');

    console.log(winner.color);
    console.log('Game ends');
}

async function main() {
    console.log('Main!');
    document.getElementById('play-again').addEventListener('click', (e) => {
        document.getElementById('overlay').classList.add('hidden');
        startGame();
    })
    startGame();
}

main()
