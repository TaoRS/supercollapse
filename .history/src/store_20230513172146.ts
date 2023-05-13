import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Store {
  private _gameState: GameState = GameState.NEW_GAME;
  public canvas: PIXI.Application<HTMLCanvasElement>;
  private _mainThread: PIXI.Ticker = new PIXI.Ticker();

  constructor(canvas: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = canvas;
    this._mainThread.add(() => {
        switch (this.gameState) {
            case GameState.NEW_GAME:
            //gen new board
            this.gameState = GameState.PLAYING;
            break;
            case GameState.PLAYING:
            break;
            case GameState.PAUSED:
            this.canvas.stop();
            //show pause screen
            break;
            case GameState.GAME_OVER:
            //show game over screen
            break;
        }
        }
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
