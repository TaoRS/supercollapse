import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Store {
  private _gameState: GameState = GameState.NEW_GAME;
  private _canvas: PIXI.Application;

  constructor() {
    this._canvas = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xffffff,
    });
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(newState: GameState) {
    this._gameState = newState;
  }

  get canvas(): PIXI.Application {
    return this._canvas;
  }
  set canvas(newCanvas: PIXI.Application) {
    this._canvas = newCanvas;
  }
}
export default store = new Store();
