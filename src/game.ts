import * as PIXI from "pixi.js";
import { fpsCounter } from "./components/fpsText";
import { GameState } from "./types/state";
import { Colors } from "./colors";
import GameBoard from "./components/gameboard";
import keyboardKeys from "./keys";
import { startNewGameText } from "./components/startNewGameText";

export class Game {
  private _gameState: GameState = GameState.NEW_GAME;
  private _gameStarted: boolean = false;
  private _bg_audio = new Audio("./bg_music.mp3");

  public canvas: PIXI.Application<HTMLCanvasElement>;

  public get gameState() {
    return this._gameState;
  }
  public set gameState(state: GameState) {
    this._gameState = state;
  }

  public startNewGame() {
    this.gameState = GameState.PLAYING;
  }

  public pauseGame() {
    this.gameState = GameState.PAUSED;
  }

  public resumeGame() {
    this.gameState = GameState.PLAYING;
  }

  public gameover() {
    this.gameState = GameState.GAME_OVER;
  }

  public quitGame() {
    this._gameStarted = false;
    this.gameState = GameState.NEW_GAME;
  }

  public isNewGame(): boolean {
    return this.gameState === GameState.NEW_GAME;
  }

  public gameisStarted(): boolean {
    return this._gameStarted;
  }

  public gameIsPlaying(): boolean {
    return this.gameState === GameState.PLAYING;
  }

  public gameIsPaused(): boolean {
    return this.gameState === GameState.PAUSED;
  }

  public gameisOver(): boolean {
    return this.gameState === GameState.GAME_OVER;
  }

  constructor(pixiApp: PIXI.Application<HTMLCanvasElement>) {
    this.canvas = pixiApp;

    this._initGameLoop();

    this._addEventListeners();
  }

  private _initGameLoop() {
    this._renderStartNewGameScreen();

    const gameBoard = this._createBoard();
    const scoreText = new PIXI.Text(`Score: 0`, {
      fontFamily: "Arial",
      fontSize: 21,
      fill: Colors.BLACK,
    });

    scoreText.x = (this.canvas.view.width / 2) * 1.5;
    scoreText.y = this.canvas.view.height * 0.05;

    const spawnsLeftText = new PIXI.Text(`Spawns left: 0`, {
      fontFamily: "Arial",
      fontSize: 21,
      fill: Colors.BLACK,
    });

    spawnsLeftText.x = (this.canvas.view.width / 2) * 1.5;
    spawnsLeftText.y = this.canvas.view.height * 0.05 + 30;

    this.canvas.ticker.add(() => {
      this._clearStage();

      switch (this._gameState) {
        case GameState.NEW_GAME:
          this.canvas.stage.addChild(startNewGameText);
          break;

        case GameState.PLAYING:
        case GameState.PAUSED:
        case GameState.GAME_OVER:
          if (!this.gameisStarted()) {
            this._bg_audio.loop = true;
            this._bg_audio.volume = 1;
            this._bg_audio.playbackRate = 1.1;
            this._bg_audio.currentTime = 0.25;
            gameBoard.prepareGame();
            this._gameStarted = true;
          }

          this.canvas.stage.addChild(gameBoard.container);
          this.canvas.stage.addChild(scoreText);
          this.canvas.stage.addChild(spawnsLeftText);

          if (this.gameIsPlaying()) {
            this._bg_audio.play();
            gameBoard.update(this.canvas.ticker.deltaMS);
            scoreText.text = `Score: ${gameBoard.score}`;
            spawnsLeftText.text = `Spawns left: ${gameBoard.linesSpawned}`;
          }

          if (this.gameIsPaused()) {
            this._bg_audio.pause();
            this._renderPauseOverlay();
          }

          if (this.gameisOver()) {
            this._bg_audio.pause();
            this._renderGameOverScreen();
          }
          break;
      }

      this._renderFPSCounter(
        this.canvas.ticker.FPS,
        this.canvas.ticker.deltaMS
      );
    });
  }

  private _addEventListeners() {
    this.canvas.stage.eventMode = "static";

    window.addEventListener("keydown", (e) => {
      if (e.key === keyboardKeys.ESCAPE) {
        if (this.gameisStarted() && !this.gameisOver()) {
          this.gameIsPaused() ? this.resumeGame() : this.pauseGame();
        }
      }

      if (e.key === keyboardKeys.ENTER) {
        if (this.gameisOver()) {
          this.quitGame();
        }
      }
    });
  }

  private _clearStage() {
    this.canvas.stage.removeChildren();
  }

  private _renderPauseOverlay() {
    const background = new PIXI.Graphics();
    background.beginFill(Colors.BLACK, 0.2);
    background.drawRect(
      this.canvas.stage.x,
      this.canvas.stage.y,
      this.canvas.view.width,
      this.canvas.view.height
    );
    background.endFill();

    this.canvas.stage.addChild(background);

    const pausedText = new PIXI.Text(`Paused`, {
      fontFamily: "Arial",
      fontSize: 31,
      fill: Colors.BLACK,
      fontWeight: "bold",
    });

    pausedText.x = this.canvas.view.width / 2 - pausedText.width / 2;
    pausedText.y = this.canvas.view.height / 2 - pausedText.height / 2;

    this.canvas.stage.addChild(pausedText);
  }

  private _renderGameOverScreen() {
    const background = new PIXI.Graphics();
    background.beginFill(Colors.BLACK, 0.8);
    background.drawRect(
      this.canvas.stage.x,
      this.canvas.stage.y,
      this.canvas.view.width,
      this.canvas.view.height
    );
    background.endFill();
    this.canvas.stage.addChild(background);

    const container = new PIXI.Container();

    const gameOverText = new PIXI.Text(`Game Over!`, {
      fontFamily: "Arial",
      fontSize: 31,
      fill: Colors.WHITE,
      fontWeight: "bold",
    });

    gameOverText.x = this.canvas.view.width / 2 - gameOverText.width / 2;
    gameOverText.y = this.canvas.view.height / 2 - gameOverText.height / 2;

    const startNewGame = new PIXI.Text(`(Press enter to start a new game)`, {
      fontFamily: "Arial",
      fontSize: 21,
      fill: Colors.WHITE,
    });

    startNewGame.x = this.canvas.view.width / 2 - startNewGame.width / 2;
    startNewGame.y = gameOverText.y + gameOverText.height + 10;

    container.addChild(gameOverText);
    container.addChild(startNewGame);

    this.canvas.stage.addChild(container);
  }

  private _renderStartNewGameScreen() {
    startNewGameText.x =
      this.canvas.view.width / 2 - startNewGameText.width / 2;
    startNewGameText.y =
      this.canvas.view.height / 2 - startNewGameText.height / 2;
  }

  private _createBoard(): GameBoard {
    const gameBoard = new GameBoard();
    gameBoard.container.x = this.canvas.view.width * 0.05;
    gameBoard.container.y = this.canvas.view.height * 0.05;
    return gameBoard;
  }

  private _renderFPSCounter(FPS: number, deltaMS: number) {
    this.canvas.stage.addChild(fpsCounter.container);
    fpsCounter.updateCounter(FPS, deltaMS);
  }
}
