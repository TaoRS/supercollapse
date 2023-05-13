import * as PIXI from "pixi.js";
import { GameState, gameState, setGameState } from "./types/state";

// const gridColumns = 10;
// const gridRows = 10;
// const cellSize = 50;
// const colors = [0xff0000, 0x00ff00, 0x0000ff];

export function renderGame(pixi: PIXI.Application) {
  let frameCount = 0;

  const frameCountText = new PIXI.Text(`Frame count: ${frameCount}`, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0x000000,
  });
  pixi.stage.addChild(frameCountText);

  pixi.ticker.add((delta) => {
    // Increment frame count
    frameCount++;

    // Update frame count text
    frameCountText.text = `Frame count: ${frameCount}`;

    // Your game logic here
  });

  switch (gameState) {
    case GameState.NEW_GAME:
      setGameState(GameState.PLAYING);
      drawSquare();
      break;
    case GameState.PLAYING:
      alert("playing");
      break;
    case GameState.PAUSED:
      break;
    case GameState.GAME_OVER:
      break;
  }

  function drawSquare() {
    const square = new PIXI.Graphics();

    // Set the fill color to red
    square.beginFill(0xff0000);

    // Draw a square
    square.drawRect(0, 0, 50, 50);

    // End the fill
    square.endFill();

    // Add the square to the stage
    pixi.stage.addChild(square);
  }
}
