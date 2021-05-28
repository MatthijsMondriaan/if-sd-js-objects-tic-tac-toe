import Field from "./Field.js";

export default class Board {
  constructor(ctx, width = 3, height = 3) {
    this.context = ctx;
    this.width = width;
    this.height = height;
    this.fieldNodes = [];
    this.fields = [];
    this.generate();
  }

  generate() {
    let board = document.querySelector(".board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    for (let x = 0; x < this.width; x++) {
      this.fieldNodes[x] = [];
      for (let y = 0; y < this.height; y++) {
        const field = document.createElement("div");
        field.dataset.x = x;
        field.dataset.y = y;
        field.dataset.obj = "";

        field.addEventListener("click", (event) => {
          this.onFieldClick(event);
        });
        field.className = "field";
        this.fieldNodes[x][y] = field;
        board.appendChild(field);
        // this.fields.push(new Field(x, y, field));
      }
    }
  }

  onFieldClick(event) {
    if (!event.target.textContent) {
      event.target.textContent = this.context.currentPlayer.symbol;
      event.target.dataset.obj = this.context.currentPlayer.symbol;
      this.checkWinner(this.context.currentPlayer.symbol);
      if (this.context.currentPlayer.symbol === this.context.player1.symbol) {
        this.context.currentPlayer = this.context.player2;
      } else {
        this.context.currentPlayer = this.context.player1;
      }
    }
  }

  //check if there is three in a row...
  checkWinner(obj) {
    let winner = "";
    // console.log(this.fields);
    if (
      (this.fieldNodes[0][0].dataset.obj == obj &&
        this.fieldNodes[1][1].dataset.obj == obj &&
        this.fieldNodes[2][2].dataset.obj == obj) ||
      (this.fieldNodes[0][2].dataset.obj == obj &&
        this.fieldNodes[1][1].dataset.obj == obj &&
        this.fieldNodes[2][0].dataset.obj == obj)
    ) {
      winner = obj;
    }

    for (let i = 0; i < 3; i++) {
      if (
        this.fieldNodes[i][0].dataset.obj === obj &&
        this.fieldNodes[i][1].dataset.obj === obj &&
        this.fieldNodes[i][2].dataset.obj === obj
      ) {
        winner = obj;
      } else if (
        this.fieldNodes[0][i].dataset.obj === obj &&
        this.fieldNodes[1][i].dataset.obj === obj &&
        this.fieldNodes[2][i].dataset.obj === obj
      ) {
        winner = obj;
      }
    }

    if (winner) {
      document.querySelector(".popup").textContent = `Winner: ${winner}`;
    }

    return false;
  }

  getField(x, y) {
    if (x < this.width && y < this.height) {
      return this.fieldNode[x][y].dataset.obj;
    } else {
      return "";
    }
  }
}
