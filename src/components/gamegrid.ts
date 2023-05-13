import * as PIXI from "pixi.js";
import { Colors } from "../colors";

interface IGameGrid {
  rows: number;
  cols: number;
  cellSize: number;
  cellGap: number;
  borderColor: number;
}

export default class GameGrid {
  rows: number = 9;
  cols: number = 10;
  cellSize: number = 50;
  cellGap: number = 2;
  borderColor: number = Colors.BLACK;

  public container: PIXI.Container = new PIXI.Container();

  constructor(config?: IGameGrid) {
    if (config) {
      this.rows = config.rows;
      this.cols = config.cols;
      this.cellSize = config.cellSize;
      this.cellGap = config.cellGap;
      this.borderColor = config.borderColor;
    }

    this.createGrid();
    this.createNextPieceGrid();
  }

  private createGrid() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let cell = new PIXI.Graphics();
        cell.lineStyle(1, this.borderColor);
        cell.drawRect(0, 0, this.cellSize, this.cellSize);
        cell.x = x * (this.cellSize + this.cellGap);
        cell.y = y * (this.cellSize + this.cellGap);
        this.container.addChild(cell);
      }
    }
  }

  private createNextPieceGrid() {
    for (let x = 0; x < this.cols; x++) {
      let cell = new PIXI.Graphics();
      cell.lineStyle(1, this.borderColor);
      cell.drawRect(0, 0, this.cellSize, this.cellSize);
      cell.x = x * (this.cellSize + this.cellGap);
      cell.y = this.rows * (this.cellSize + this.cellGap) + this.cellSize / 2;
      this.container.addChild(cell);
    }
  }
}
