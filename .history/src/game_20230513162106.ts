import * as PIXI from "pixi.js";
import { GameState } from "./types/state";
import { store } from "./store";

export function renderGame() {
  // Set up frame counter
  let frameCount = 0;

  // Set up text to display FPS
  const fpsText = new PIXI.Text(`FPS: 0`, {
    fontFamily: "Arial",
    fontSize: 11,
    fill: 0x00ff00,
  });
  store.canvas.stage.addChild(fpsText);

  // Set up game loop
  store.canvas.ticker.add(() => {
    fpsText.text = `FPS: ${Math.round(store.canvas.ticker.FPS)}`;

    switch (store.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        store.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
        // alert("playing");
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
