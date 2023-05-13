import * as PIXI from "pixi.js";
import { GameState } from "./types/state";
import { store } from "./store";
import keyboardKeys from "./keys";
import { fpsText } from "./components/fpsText";

export function renderGame() {
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
        store.canvas.ticker.store.canvas.stop();
        console.log(store.canvas.ticker);
        //show pause screen
        break;
      case GameState.GAME_OVER:
        //show game over screen
        break;
    }
  });
}
