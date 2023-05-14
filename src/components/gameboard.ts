import * as PIXI from "pixi.js";
import { Colors } from "../colors";

interface IGameGrid {
  rows: number;
  cols: number;
  blockSize: number;
  cellGap: number;
  borderColor: number;
}

export default class GameBoard {
  rows: number = 9;
  cols: number = 10;
  blockSize: number = 50;
  cellGap: number = 2;
  borderColor: number = Colors.BLACK;
  init: boolean = false;
  blocks: number[][] = [];
  nextBlocks: number[] = [];

  colors: number[] = [Colors.RED, Colors.BLUE, Colors.GREEN];

  public container: PIXI.Container = new PIXI.Container();

  constructor(config?: IGameGrid) {
    if (config) {
      this.rows = config.rows;
      this.cols = config.cols;
      this.blockSize = config.blockSize;
      this.cellGap = config.cellGap;
      this.borderColor = config.borderColor;
    }

    this._init();
  }

  private _init() {
    if (!this.init) {
      this.blocks = new Array(this.rows)
        .fill(0)
        .map(() => new Array(this.cols).fill(Colors.TRANSPARENT));

      this.blocks.forEach((row, rowIndex) => {
        row.forEach((_cell, cellIndex) => {
          if (rowIndex < this.rows - 3) {
            return;
          }
          this.blocks[rowIndex][cellIndex] = this.randomColor();
        });
      });

      this.generateNewBlocks();

      this.init = true;
    }
  }

  public startNewGame() {
    this.init = false;
    this._init();
  }

  public generateNewBlocks() {
    this.nextBlocks = new Array(this.cols).fill(0);

    this.nextBlocks.forEach((_cell, index) => {
      this.nextBlocks[index] = this.randomColor();
    });

    console.dir({
      grid: this.blocks,
      nextPieceGrid: this.nextBlocks,
    });
  }

  public render() {
    this.fillBoard();
    this.renderBoardOuline();
  }

  private fillBoard() {
    this.blocks.forEach((row, rowIndex) => {
      row.forEach((_cell, cellIndex) => {
        let cell = new PIXI.Graphics();
        cell.beginFill(this.blocks[rowIndex][cellIndex]);
        cell.drawRect(0, 0, this.blockSize, this.blockSize);
        cell.x = cellIndex * (this.blockSize + this.cellGap);
        cell.y = rowIndex * (this.blockSize + this.cellGap);
        this.container.addChild(cell);
      });
    });
  }

  private renderBoardOuline() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let cell = new PIXI.Graphics();
        cell.lineStyle(1, this.borderColor);
        cell.drawRect(0, 0, this.blockSize, this.blockSize);
        cell.x = x * (this.blockSize + this.cellGap);
        cell.y = y * (this.blockSize + this.cellGap);
        this.container.addChild(cell);
      }
    }

    for (let x = 0; x < this.cols; x++) {
      let cell = new PIXI.Graphics();
      cell.lineStyle(1, this.borderColor);
      cell.drawRect(0, 0, this.blockSize, this.blockSize);
      cell.x = x * (this.blockSize + this.cellGap);
      cell.y = this.rows * (this.blockSize + this.cellGap) + this.blockSize / 2;
      this.container.addChild(cell);
    }
  }

  public renderBlock(blockColor: number, index: number) {
    let cell = new PIXI.Graphics();
    cell.beginFill(blockColor);
    cell.drawRect(0, 0, this.blockSize, this.blockSize);
    cell.x = index * (this.blockSize + this.cellGap);
    cell.y = this.rows * (this.blockSize + this.cellGap) + this.blockSize / 2;
    cell.visible = false;
    this.container.addChild(cell);
    return cell;
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
