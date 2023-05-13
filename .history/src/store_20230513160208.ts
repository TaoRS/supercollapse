import { GameState } from "./types/state";

class Store {
  private _gameState: GameState = GameState.NEW_GAME;

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(newState: GameState) {
    this._gameState = newState;
  }
}
export default store;
