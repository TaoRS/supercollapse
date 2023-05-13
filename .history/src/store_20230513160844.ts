import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Store {
  private _gameState: GameState = GameState.NEW_GAME;
  private _canvas: PIXI.Application;

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
