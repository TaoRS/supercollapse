import * as PIXI from "pixi.js";
import { GameState, gameState, setGameState } from "./types/state";

// const gridColumns = 10;
// const gridRows = 10;
// const cellSize = 50;
// const colors = [0xff0000, 0x00ff00, 0x0000ff];

export function renderGame(pixi: PIXI.Application) {
  // Set up game variables
  //   let grid = [];

  // Initialize grid with random colors

  // Draw grid on canvas

  // Handle clicks on the canvas

  // Collapse a column by removing all cells of the same color as the bottom cell

  // Start the game by drawing the initial grid

  if (gameState === GameState.NEW_GAME) {
    setGameState(GameState.PLAYING);
    drawSquare();
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
