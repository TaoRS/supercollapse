import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

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
  initialized: boolean = false;
  blocks: number[][] = [];
  nextBlocks: number[] = [];
  public blockSpawnInterval: number = 1;

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
    if (!this.initialized) {
      /*
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
      });*/

      // fill last 3 rows with random colors
      for (let i = 0; i < 3; i++) {
        let row = new Array(this.cols).fill(Colors.TRANSPARENT);
        row.forEach((_cell, cellIndex) => {
          row[cellIndex] = this.randomColor();
        });
        this.blocks.push(row);
      }

      this.initialized = true;
    }
  }

  public startNewGame() {
    this.initialized = false;
    this._init();
  }

  public spawnBlock() {
    if (this.blocks.length >= this.rows) {
      game.gameover();
    }

    if (this.nextBlocks.length < this.cols) {
      this.nextBlocks.push(this.randomColor());
      this.renderNewBlock(
        this.nextBlocks[this.nextBlocks.length - 1],
        this.nextBlocks.length - 1
      );
    }

    if (this.nextBlocks.length >= this.cols) {
      this.blocks.unshift(this.nextBlocks);
      this.nextBlocks = [];
      for (let i = 0; i < this.cols; i++) {
        this.renderNewBlock(Colors.WHITE, i);
      }
    }

    this.render();
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

  private renderNewBlock(blockColor: number, index: number) {
    let cell = new PIXI.Graphics();
    cell.beginFill(blockColor);
    cell.drawRect(0, 0, this.blockSize, this.blockSize);
    cell.x = index * (this.blockSize + this.cellGap);
    cell.y = this.rows * (this.blockSize + this.cellGap) + this.blockSize / 2;
    this.container.addChild(cell);
    return cell;
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
