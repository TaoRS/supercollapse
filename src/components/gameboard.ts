import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

interface gameGridConfig {
  rows?: number;
  cols?: number;
  blockSize?: number;
  cellGap?: number;
  borderColor?: number;
}

interface coordinates {
  row: number;
  col: number;
}

interface block {
  type: blockType;
  coordinates: coordinates;
}

type blockType = number | null;

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
  private readonly _startingRows: number = 6;
  private readonly _blockSpawnSpeedInMS: number = 500;
  private readonly _debug: boolean = false;

  private _timePassed: number = 0;
  private _board: block[] = [];
  private _nextBlocks: blockType[] = [];

  public container: PIXI.Container = new PIXI.Container();

  constructor(config?: gameGridConfig) {
    if (config) {
      this._rows = config.rows || this._rows;
      this._cols = config.cols || this._cols;
      this._blockSize = config.blockSize || this._blockSize;
      this._cellGap = config.cellGap || this._cellGap;
      this._borderColor = config.borderColor || this._borderColor;
    }
  }

  public prepareGame() {
    this._newBoard();

    this._spawnStartingBlocks();

    this._updateBoard();
  }

  public update(deltaMS: number) {
    if (this._timeToSpawnBlock(deltaMS)) {
      if (this._spawnAreaIsFull()) {
        this._clearSpawnedBlocks();

        this._moveSpawnedBlocksToBoard();
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
    this._board.forEach((block) => {
      this._drawBlock(block);
    });
  }

  private _drawBlock(block: block) {
    let { row, col } = block.coordinates;
    let color = block.type || Colors.WHITE;
    let cell = new PIXI.Graphics();

    cell.beginFill(color);

    if (this._debug) {
      cell.lineStyle(2, Colors.BLACK);
    }

    cell.drawRect(0, 0, this._blockSize, this._blockSize);
    cell.x = col * (this._blockSize + this._cellGap);
    cell.y =
      (row + this._cols - this._rows - 1) * (this._blockSize + this._cellGap);

    this._addClickEventToBlocks(cell, block);

    this.container.addChild(cell);

    if (this._debug) {
      let text = new PIXI.Text(
        `row: ${row}\ncol: ${col}\ncolor: ${this._colors.indexOf(color)}`,
        new PIXI.TextStyle({
          fontSize: 10,
          fill: Colors.BLACK,
        })
      );
      text.x = cell.x;
      text.y = cell.y;
      this.container.addChild(text);
    }
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

  private _paintSpawnedBlock(blockType: blockType, index: number) {
    let cell = new PIXI.Graphics();
    let color = blockType || Colors.WHITE;
    cell.beginFill(color);
    cell.drawRect(0, 0, this._blockSize, this._blockSize);
    cell.x = index * (this._blockSize + this._cellGap);
    cell.y =
      this._rows * (this._blockSize + this._cellGap) + this._blockSize / 2;
    this.container.addChild(cell);
    return cell;
  }

  private _clearSpawnedBlocks() {
    for (let i = 0; i < this._cols; i++) {
      this._paintSpawnedBlock(null, i);
    }
  }

  private _moveSpawnedBlocksToBoard() {
    this._board.forEach((block) => {
      if (block.coordinates.row === 0) {
        this._board.splice(this._board.indexOf(block), 1);
      }

      block.coordinates.row--;
    });

    this._nextBlocks.forEach((block, index) => {
      this._board.push({
        type: block,
        coordinates: {
          row: this._rows - 1,
          col: index,
        },
      });
    });

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
    const limit = this._rows - this._startingRows;
    for (let y = this._rows; y >= limit; y--) {
      for (let x = 0; x < this._cols; x++) {
        this._setBlockType({ row: y, col: x }, this._randomColor());
      }
    }
  }

  private _newBoard() {
    this._board = [];
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._cols; x++) {
        this._board.push({
          type: null,
          coordinates: {
            row: y,
            col: x,
          },
        });
      }
    }

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
    let reachedTop = false;
    this._board.forEach((block) => {
      if (block.coordinates.row === 0 && block.type !== null) {
        reachedTop = true;
      }
    });

    return reachedTop;
  }

  private _spawnAreaIsFull(): boolean {
    return this._nextBlocks.length >= this._cols;
  }
  private _checkForMatches(
    coordinates: coordinates,
    blockType: blockType,
    visited?: coordinates[]
  ): coordinates[] {
    let matches: coordinates[] = [];
    let rows = this._rows;
    let cols = this._cols;
    let { row, col } = coordinates;
    visited = visited || [];

    if (visited.find((v) => v.col === col && v.row === row)) {
      return matches;
    }

    visited.push(coordinates);

    let blockIndex = this._locateBlockIndex(coordinates);
    if (!blockIndex) {
      return matches;
    }

    if (this._board[blockIndex].type === blockType) {
      matches.push(coordinates);

      let newCoordinates: coordinates = { row: row - 1, col: col };
      if (row > 0 && this._locateBlockIndex(newCoordinates)) {
        matches.push(
          ...this._checkForMatches(newCoordinates, blockType, visited)
        );
      }

      newCoordinates = { row: row + 1, col: col };
      if (row < rows - 1 && this._locateBlockIndex(newCoordinates)) {
        matches.push(
          ...this._checkForMatches(newCoordinates, blockType, visited)
        );
      }

      newCoordinates = { row: row, col: col - 1 };
      if (col > 0 && this._locateBlockIndex(newCoordinates)) {
        matches.push(
          ...this._checkForMatches(newCoordinates, blockType, visited)
        );
      }

      newCoordinates = { row: row, col: col + 1 };
      if (col < cols - 1 && this._locateBlockIndex(newCoordinates)) {
        matches.push(
          ...this._checkForMatches(newCoordinates, blockType, visited)
        );
      }
    }

    return matches;
  }

  private _addClickEventToBlocks(cell: PIXI.Graphics, block: block) {
    cell.eventMode = "static";

    cell.onmousedown = () => {
      const matches: coordinates[] = this._checkForMatches(
        block.coordinates,
        block.type
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
            (match.row + this._cols - this._rows - 1) *
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

  private _removeMatches(matches: coordinates[]) {
    matches.forEach((match) => {
      const blockIndex = this._locateBlockIndex(match);
      if (blockIndex) {
        this._board[blockIndex].type = null;
      }
    });

    this._moveBlocksDown();
    this._moveEmptyColumns();
  }

  private _moveBlocksDown() {
    let moved = false;

    this._board.forEach((block) => {
      if (block.type === null) {
        const blockAboveIndex = this._locateBlockIndex({
          row: block.coordinates.row - 1,
          col: block.coordinates.col,
        });
        if (blockAboveIndex) {
          const blockAbove = this._board[blockAboveIndex];
          if (blockAbove.type !== null) {
            this._switchBlocks(block, blockAbove);
            moved = true;
          }
        }
      }
    });

    if (moved) {
      this._moveBlocksDown();
    }
  }

  private _moveEmptyColumns() {
    let moved = false;

    for (let col = 0; col < this._cols; col++) {
      const block = this._getBlock({
        row: this._rows - 1,
        col: col,
      });

      if (block && block.type === null) {
        let emptyColumn = col;
        this._moveColumn(emptyColumn);
        moved = true;
      }
    }

    if (moved) {
      this._moveEmptyColumns();
    }
  }

  private _getBlock(coordinates: coordinates): block | null {
    const blockIndex = this._locateBlockIndex(coordinates);
    if (blockIndex) {
      return this._board[blockIndex];
    }

    return null;
  }

  private _moveColumn(emptyColumn: number) {
    const emptyColumnIsOnTheLeft = emptyColumn < this._rows / 2;

    if (emptyColumnIsOnTheLeft) {
      for (let col = emptyColumn; col > 0; col--) {
        this._switchColumns(col, col - 1);
      }
    }

    if (!emptyColumnIsOnTheLeft) {
      for (let col = emptyColumn; col < this._cols - 1; col++) {
        this._switchColumns(col, col + 1);
      }
    }
  }

  private _switchBlocks(block1: block, block2: block) {
    const block1Type = block1.type;
    block1.type = block2.type;
    block2.type = block1Type;
  }

  private _switchColumns(col1: number, col2: number) {
    this._board.forEach((block) => {
      if (block.coordinates.col === col1) {
        block.coordinates.col = col2;
      } else if (block.coordinates.col === col2) {
        block.coordinates.col = col1;
      }
    });
  }

  private _locateBlockIndex(coordinates: coordinates): number | null {
    const index = this._board.findIndex((block) => {
      return (
        block.coordinates.row === coordinates.row &&
        block.coordinates.col === coordinates.col
      );
    });

    return index >= 0 ? index : null;
  }

  private _setBlockType(coordinates: coordinates, blockType: blockType) {
    const blockIndex = this._locateBlockIndex(coordinates);
    if (blockIndex) {
      this._board[blockIndex].type = blockType;
    }
  }
}
