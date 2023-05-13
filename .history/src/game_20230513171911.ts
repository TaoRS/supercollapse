import * as PIXI from "pixi.js";
import { GameState } from "./types/state";
import { store } from "./store";
import keyboardKeys from "./keys";

export function renderGame() {
  const fpsText = new PIXI.Text(`FPS: 0`, {
    fontFamily: "Arial",
    fontSize: 11,
    fill: 0x00ff00,
  });
  store.canvas.stage.addChild(fpsText);

  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === keyboardKeys.ESCAPE) {
      store.gameState = GameState.PAUSED;
    }
  });

  store.canvas.ticker.add(() => {
    fpsText.text = `FPS: ${Math.round(store.canvas.ticker.FPS)}`;

    switch (store.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        store.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
        break;
      case GameState.PAUSED:
        store.canvas.ticker.stop();
        store.canvas.stop();
        console.log(store.canvas.ticker);
        //show pause screen
        break;
      case GameState.GAME_OVER:
        //show game over screen
        break;
    }
  });
}
