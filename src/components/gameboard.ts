import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

interface IGameGridConfig {
  rows?: number;
  cols?: number;
  blockSize?: number;
  cellGap?: number;
  borderColor?: number;
}

export default class GameBoard {
  private readonly _colors: number[] = [Colors.RED, Colors.BLUE, Colors.GREEN];
  private readonly _rows: number = 9;
  private readonly _cols: number = 10;
  private readonly _blockSize: number = 50;
  private readonly _cellGap: number = 2;
  private readonly _borderColor: number = Colors.BLACK;
  private readonly _startingRows: number = 7;
  private readonly _blockSpawnSpeedInMS: number = 200;

  private _timePassed: number = 0;
  private _blocks: number[][] = [];
  private _nextBlocks: number[] = [];

  public container: PIXI.Container = new PIXI.Container();

  constructor(config?: IGameGridConfig) {
    if (config) {
      this._rows = config.rows || this._rows;
      this._cols = config.cols || this._cols;
      this._blockSize = config.blockSize || this._blockSize;
      this._cellGap = config.cellGap || this._cellGap;
      this._borderColor = config.borderColor || this._borderColor;
    }
  }

  public prepareGame() {
    this._clearBlocks();

    this._spawnStartingBlocks();

    this._updateBoard();
  }

  public update(deltaMS: number) {
    if (this._timeToSpawnBlock(deltaMS)) {
      if (this._spawnAreaIsFull()) {
        this._clearSpawnedBlocks();
      }

      if (this._blocksReachedTop()) {
        this._handleGameOver();
      } else {
        this._generateNextBlock();
      }

      this._updateBoard();
    }
  }

  private _updateBoard() {
    this._paintGamingArea();
    this._paintBorders();
  }

  private _paintBorders() {
    this._outlineGamingArea();
    this._outlineSpawnArea();
  }

  private _paintGamingArea() {
    this._blocks.forEach((row, rowIndex) => {
      row.forEach((_cell, cellIndex) => {
        let cell = new PIXI.Graphics();
        cell.beginFill(_cell);
        cell.drawRect(0, 0, this._blockSize, this._blockSize);
        cell.x = cellIndex * (this._blockSize + this._cellGap);
        cell.y =
          (rowIndex + this._cols - this._blocks.length - 1) *
          (this._blockSize + this._cellGap);
        this.container.addChild(cell);
      });
    });
  }

  private _outlineGamingArea() {
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._cols; x++) {
        let cell = new PIXI.Graphics();
        cell.lineStyle(1, this._borderColor);
        cell.drawRect(0, 0, this._blockSize, this._blockSize);
        cell.x = x * (this._blockSize + this._cellGap);
        cell.y = y * (this._blockSize + this._cellGap);
        this.container.addChild(cell);
      }
    }
  }

  private _outlineSpawnArea() {
    for (let x = 0; x < this._cols; x++) {
      let cell = new PIXI.Graphics();
      cell.lineStyle(1, this._borderColor);
      cell.drawRect(0, 0, this._blockSize, this._blockSize);
      cell.x = x * (this._blockSize + this._cellGap);
      cell.y =
        this._rows * (this._blockSize + this._cellGap) + this._blockSize / 2;
      this.container.addChild(cell);
    }
  }

  private _paintSpawnedBlock(blockColor: number, index: number) {
    let cell = new PIXI.Graphics();
    cell.beginFill(blockColor);
    cell.drawRect(0, 0, this._blockSize, this._blockSize);
    cell.x = index * (this._blockSize + this._cellGap);
    cell.y =
      this._rows * (this._blockSize + this._cellGap) + this._blockSize / 2;
    this.container.addChild(cell);
    return cell;
  }

  private _clearSpawnedBlocks() {
    for (let i = 0; i < this._cols; i++) {
      this._paintSpawnedBlock(Colors.WHITE, i);
    }
    this._blocks.push(this._nextBlocks);
    this._nextBlocks = [];
  }

  private _handleGameOver() {
    game.gameover();
  }

  private _generateNextBlock() {
    this._nextBlocks.push(this._randomColor());

    this._paintSpawnedBlock(
      this._nextBlocks[this._nextBlocks.length - 1],
      this._nextBlocks.length - 1
    );
  }

  private _randomColor() {
    return this._colors[Math.floor(Math.random() * this._colors.length)];
  }

  private _spawnStartingBlocks() {
    for (let i = 0; i < this._startingRows; i++) {
      let row: number[] = new Array(this._cols).fill(Colors.TRANSPARENT);
      row.forEach((_cell, cellIndex) => {
        row[cellIndex] = this._randomColor();
      });
      this._blocks.push(row);
    }
  }

  private _clearBlocks() {
    this._blocks = [];
    this._nextBlocks = [];

    this.container.removeChildren();
  }

  private _timeToSpawnBlock(deltaMS: number): boolean {
    this._timePassed += deltaMS;

    if (this._timePassed >= this._blockSpawnSpeedInMS) {
      this._timePassed = 0;

      return true;
    }

    return false;
  }

  private _blocksReachedTop(): boolean {
    return this._blocks.length >= this._rows;
  }

  private _spawnAreaIsFull(): boolean {
    return this._nextBlocks.length >= this._cols;
  }
}
