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

interface IMatch {
  row: number;
  col: number;
}

export default class GameBoard {
  private readonly _colors: number[] = [
    Colors.DARKSLATEGRAY,
    Colors.SILVER,
    Colors.PLUM,
  ];
  private readonly _rows: number = 9;
  private readonly _cols: number = 10;
  private readonly _blockSize: number = 50;
  private readonly _cellGap: number = 2;
  private readonly _borderColor: number = Colors.BLACK;
  private readonly _startingRows: number = 3;
  private readonly _blockSpawnSpeedInMS: number = 1000;
  private readonly _debug: boolean = true;

  private _timePassed: number = 0;
  private _board: number[][] = [];
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
    this._board.forEach((row, rowIndex) => {
      row.forEach((_cell, cellIndex) => {
        let cell = new PIXI.Graphics();
        cell.beginFill(_cell);

        if (this._debug) {
          cell.lineStyle(2, Colors.BLACK);
        }

        cell.drawRect(0, 0, this._blockSize, this._blockSize);
        cell.x = cellIndex * (this._blockSize + this._cellGap);
        cell.y =
          (rowIndex + this._cols - this._board.length - 1) *
          (this._blockSize + this._cellGap);

        this._addClickEventToBlocks(cell, _cell, rowIndex, cellIndex);

        this.container.addChild(cell);

        if (this._debug) {
          let text = new PIXI.Text(
            `row: ${rowIndex}\ncol: ${cellIndex}\ncolor: ${this._colors.indexOf(
              _cell
            )}`,
            new PIXI.TextStyle({
              fontSize: 10,
              fill: Colors.BLACK,
            })
          );
          text.x = cell.x;
          text.y = cell.y;
          this.container.addChild(text);
        }
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
    this._board.push(this._nextBlocks);
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
      this._board.push(row);
    }
  }

  private _clearBlocks() {
    this._board = [];
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
    return this._board.length >= this._rows;
  }

  private _spawnAreaIsFull(): boolean {
    return this._nextBlocks.length >= this._cols;
  }
  private _checkForMatches(
    board: number[][],
    row: number,
    col: number,
    color: number,
    visited: boolean[][]
  ): IMatch[] {
    let matches: IMatch[] = [];
    let rows = board.length;
    let cols = board[0].length;

    if (visited[row][col]) {
      return matches;
    }

    visited[row][col] = true;

    if (board[row][col] === color) {
      matches.push({ row, col });

      if (row > 0 && board[row - 1][col]) {
        matches.push(
          ...this._checkForMatches(board, row - 1, col, color, visited)
        );
      }

      if (row < rows - 1 && board[row + 1][col]) {
        matches.push(
          ...this._checkForMatches(board, row + 1, col, color, visited)
        );
      }

      if (col > 0 && board[row][col - 1]) {
        matches.push(
          ...this._checkForMatches(board, row, col - 1, color, visited)
        );
      }

      if (col < cols - 1 && board[row][col + 1]) {
        matches.push(
          ...this._checkForMatches(board, row, col + 1, color, visited)
        );
      }
    }

    return matches;
  }

  private _addClickEventToBlocks(
    cell: PIXI.Graphics,
    color: number,
    rowIndex: number,
    cellIndex: number
  ) {
    cell.eventMode = "static";

    cell.onmousedown = () => {
      const matches: IMatch[] = this._checkForMatches(
        this._board,
        rowIndex,
        cellIndex,
        color,
        Array.from(Array(this._board.length), () =>
          new Array(this._board[0].length).fill(false)
        )
      );

      if (this._debug) {
        matches.length >= 3
          ? console.log("%c3 or more", "color: green")
          : console.log("%cless than 3", "color: red");

        matches.forEach((match) => {
          const cell = new PIXI.Graphics();
          cell.lineStyle(2, matches.length >= 3 ? Colors.GREEN : Colors.RED);
          cell.drawRect(0, 0, this._blockSize, this._blockSize);
          cell.x = match.col * (this._blockSize + this._cellGap);
          cell.y =
            (match.row + this._cols - this._board.length - 1) *
            (this._blockSize + this._cellGap);

          this.container.addChild(cell);
        });
      }

      if (matches.length >= 3) {
        this._removeMatches(matches);
        this._updateBoard();
      }
    };
  }

  private _removeMatches(matches: IMatch[]) {
    console.log(matches);

    matches.forEach((match) => {
      this._board[match.row].splice(match.col, 1);
    });
  }
}
