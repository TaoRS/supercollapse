import { GameState } from "./types/state";

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
export default Store;
