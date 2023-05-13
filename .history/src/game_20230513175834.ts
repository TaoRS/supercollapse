import { fpsText } from "./components/fpsText";
import { GameState } from "./types/state";
import * as PIXI from "pixi.js";

class Game {
  private _gameState: GameState = GameState.NEW_GAME;

  public canvas: PIXI.Application<HTMLCanvasElement>;

  constructor(canvas: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = canvas;

    this.canvas.ticker.add(() => {
      this.canvas.stage.addChild(
        new PIXI.Text(`test`, {
          fontFamily: "Arial",
          fontSize: 11,
          fill: 0xff0000,
        })
      );

      switch (this._gameState) {
        case GameState.NEW_GAME:
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

      this.canvas.stage.addChild(fpsText);
      fpsText.text = `FPS: ${this.canvas.ticker.FPS.toFixed(2)}`;
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
