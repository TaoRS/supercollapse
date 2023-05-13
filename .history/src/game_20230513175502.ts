import { fpsText } from "./components/fpsText";
import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Game {
  private _gameState: GameState = GameState.NEW_GAME;

  public canvas: PIXI.Application<HTMLCanvasElement>;

  constructor(canvas: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = canvas;

    this.canvas.stage.addChild(fpsText);

    this.canvas.ticker.add(() => {
      fpsText.text = `FPS: ${this.canvas.ticker.FPS.toFixed(2)}`;
      console.log("test");

      switch (this._gameState) {
        case GameState.NEW_GAME:
          //gen new board
          this._gameState = GameState.PLAYING;
          break;
        case GameState.PLAYING:
          break;
        case GameState.PAUSED:
          //show pause screen
          break;
        case GameState.GAME_OVER:
          //show game over screen
          break;
      }
    });
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(newState: GameState) {
    this._gameState = newState;
  }
}

export const game = new Game(
  new PIXI.Application<HTMLCanvasElement>({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
  })
);
