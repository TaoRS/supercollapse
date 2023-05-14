import * as PIXI from "pixi.js";
import { fpsCounter } from "./components/fpsText";
import { GameState } from "./types/state";
import { Colors } from "./colors";
import GameBoard from "./components/gameboard";
import keyboardKeys from "./keys";
import { newGameText } from "./components/newGameText";

export class Game {
  static CANVAS_HEIGHT = 600;
  static CANVAS_WIDTH = 800;
  private _gameState: GameState = GameState.NEW_GAME;
  private _gameStarted: boolean = false;

  public canvas: PIXI.Application<HTMLCanvasElement>;

  constructor() {
    this.canvas = new PIXI.Application<HTMLCanvasElement>({
      width: Game.CANVAS_WIDTH,
      height: Game.CANVAS_HEIGHT,
      backgroundColor: Colors.WHITE,
    });

    this.initGameLoop();

    this.addEventListeners();
  }

  public get gameState() {
    return this._gameState;
  }
  public set gameState(state: GameState) {
    this._gameState = state;
  }

  private clearStage() {
    this.canvas.stage.removeChildren();
  }

  private addEventListeners() {
    this.canvas.stage.eventMode = "static";

    window.addEventListener("keydown", (e) => {
      e.preventDefault();

      if (e.key === keyboardKeys.ESCAPE) {
        if (this.gameisStarted()) {
          this.gameIsPaused() ? this.resumeGame() : this.pauseGame();
        }
      }
    });
  }

  startNewGame() {
    this._gameStarted = true;
    this.gameState = GameState.PLAYING;
  }

  isNewGame() {
    return this.gameState === GameState.NEW_GAME;
  }

  pauseGame() {
    this.gameState = GameState.PAUSED;
  }

  resumeGame() {
    this.gameState = GameState.PLAYING;
  }

  gameIsPaused() {
    return this.gameState === GameState.PAUSED;
  }

  gameIsPlaying() {
    return this.gameState === GameState.PLAYING;
  }

  gameover() {
    this.gameState = GameState.GAME_OVER;
  }

  gameisOver() {
    return this.gameState === GameState.GAME_OVER;
  }

  quitGame() {
    this._gameStarted = false;
    this.gameState = GameState.NEW_GAME;
  }

  gameisStarted() {
    return this._gameStarted;
  }

  private initGameLoop() {
    newGameText.x = Game.CANVAS_WIDTH / 2 - newGameText.width / 2;
    newGameText.y = Game.CANVAS_HEIGHT / 2 - newGameText.height / 2;

    const gameBoard = new GameBoard();
    gameBoard.container.x = Game.CANVAS_WIDTH * 0.05;
    gameBoard.container.y = Game.CANVAS_HEIGHT * 0.05;
    gameBoard.render();

    this.renderPauseOverlay();

    this.canvas.ticker.add(() => {
      this.clearStage();

      switch (this._gameState) {
        case GameState.NEW_GAME:
          this.canvas.stage.addChild(newGameText);
          break;

        case GameState.PLAYING:
        case GameState.PAUSED:
          this.canvas.stage.addChild(gameBoard.container);

          if (this.gameIsPaused()) {
            this.renderPauseOverlay();
          }
          break;

        case GameState.GAME_OVER:
          //show game over screen
          break;
      }

      this.canvas.stage.addChild(fpsCounter.container);
      fpsCounter.updateCounter(this.canvas.ticker.FPS);

      console.log(this._gameState);
    });
  }

  private renderPauseOverlay() {
    const pausedTextBackground = new PIXI.Graphics();
    pausedTextBackground.beginFill(Colors.BLACK, 0.2);
    pausedTextBackground.drawRect(
      this.canvas.stage.x,
      this.canvas.stage.y,
      Game.CANVAS_WIDTH,
      Game.CANVAS_HEIGHT
    );
    pausedTextBackground.endFill();

    this.canvas.stage.addChild(pausedTextBackground);

    const pausedText = new PIXI.Text(`Paused`, {
      fontFamily: "Arial",
      fontSize: 31,
      fill: Colors.BLACK,
      fontWeight: "bold",
    });

    pausedText.x = Game.CANVAS_WIDTH / 2 - pausedText.width / 2;
    pausedText.y = Game.CANVAS_HEIGHT / 2 - pausedText.height / 2;

    pausedText.visible = this.gameIsPaused();

    this.canvas.stage.addChild(pausedText);
  }
}
