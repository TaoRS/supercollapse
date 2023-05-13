import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Game {
  private _gameState: GameState = GameState.NEW_GAME;
  public canvas: PIXI.Application<HTMLCanvasElement>;
  private _mainThread: PIXI.Ticker || null = null;

  constructor(canvas: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = canvas;
    // this._mainThread = this.canvas.ticker;
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(newState: GameState) {
    this._gameState = newState;
  }

  get mainThread(): PIXI.Ticker {
    return this._mainThread;
  }
}

export const game = new Game(
  new PIXI.Application<HTMLCanvasElement>({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
  })
);
