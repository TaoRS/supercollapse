import * as PIXI from "pixi.js";

export function renderGame(app: PIXI.Application) {
  const square = new PIXI.Graphics();

  // Set the fill color to red
  square.beginFill(0xff0000);

  // Draw a square
  square.drawRect(0, 0, 100, 100);

  // End the fill
  square.endFill();

  // Add the square to the stage
  app.stage.addChild(square);
}
