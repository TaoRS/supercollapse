import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Store {
  private _gameState: GameState = GameState.NEW_GAME;
  public canvas: PIXI.Application;

  constructor(canvas: PIXI.Application) {
    this.canvas = canvas;
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(newState: GameState) {
    this._gameState = newState;
  }
}
export const store = new Store(
  new PIXI.Application<HTMLCanvasElement>({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
  })
);
