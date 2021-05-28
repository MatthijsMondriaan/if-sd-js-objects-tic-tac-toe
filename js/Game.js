import Board from "./Board.js";
import Player from "./Player.js";

export default class Game {
  constructor() {
    this.player1 = new Player("player 1,", "X");
    this.player2 = new Player("player 2", "O");
    this.currentPlayer = this.player1;
    this.board = new Board(this);
    document.querySelector(".reset-btn").addEventListener("click", () => {
      this.reset();
    });
  }

  reset() {
    this.board = new Board(this);
    document.querySelector(".popup");
  }
}

new Game();
