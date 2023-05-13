import { fpsText } from "./components/fpsText";
import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Game {
  private _gameState: GameState = GameState.NEW_GAME;

  public canvas: PIXI.Application<HTMLCanvasElement>;

  constructor(canvas: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = canvas;

    this.canvas.ticker.add(() => {
      switch (this._gameState) {
        case GameState.NEW_GAME:
          this.canvas.stage.addChild(fpsText);
          fpsText.text = `FPS: ${this.canvas.ticker.FPS.toFixed(2)}`;
          //gen new board
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
}

export const game = new Game(
  new PIXI.Application<HTMLCanvasElement>({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
  })
);
