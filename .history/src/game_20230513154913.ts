import * as PIXI from "pixi.js";
import { GameState, gameState, setGameState } from "./types/state";

// const gridColumns = 10;
// const gridRows = 10;
// const cellSize = 50;
// const colors = [0xff0000, 0x00ff00, 0x0000ff];

export function renderGame(pixi: PIXI.Application) {
  // Set up frame counter
  let frameCount = 0;

  // Set up text to display FPS
  const fpsText = new PIXI.Text(`FPS: 0`, {
    fontFamily: "Arial",
    fontSize: 11,
    fill: 0x00ff00,
  });
  pixi.stage.addChild(fpsText);

  // Set up FPS calculation
  let lastTime = performance.now();
  let fps = 0;

  // Set up game loop
  pixi.ticker.add((delta) => {
    frameCount++;

    let currentTime = performance.now();
    let elapsedTime = (currentTime - lastTime) / 1000;

    if (elapsedTime >= 1) {
      fps = frameCount / elapsedTime;
      frameCount = 0;
      lastTime = currentTime;
      fpsText.text = `FPS: ${Math.round(fps)}`;
    }

    // Your game logic here

    switch (gameState) {
      case GameState.NEW_GAME:
        setGameState(GameState.PLAYING);
        drawSquare();
        break;
      case GameState.PLAYING:
        // alert("playing");
        break;
      case GameState.PAUSED:
        break;
      case GameState.GAME_OVER:
        break;
    }
  });

  function drawSquare() {
    const square = new PIXI.Graphics();

    // Set the fill color to red
    square.beginFill(0xff0000);

    // Draw a square
    square.drawRect(100, 100, 50, 50);

    // End the fill
    square.endFill();

    // Add the square to the stage
    pixi.stage.addChild(square);
  }
}
