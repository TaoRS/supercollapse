import * as PIXI from "pixi.js";
import { GameState } from "./types/state";
import { store } from "./store";

export function renderGame() {
  const fpsText = new PIXI.Text(`FPS: 0`, {
    fontFamily: "Arial",
    fontSize: 11,
    fill: 0x00ff00,
  });
  store.canvas.stage.addChild(fpsText);

  store.canvas.ticker.add(() => {
    fpsText.text = `FPS: ${Math.round(store.canvas.ticker.FPS)}`;

    switch (store.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        store.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
        store.canvas.stage.onclick = (e) => {
          e.preventDefault();
          store.gameState = GameState.PAUSED;
        };
        break;
      case GameState.PAUSED:
        console.log(store.gameState);

        store.canvas.ticker.stop();
        store.canvas.stop();
        //show pause screen
        break;
      case GameState.GAME_OVER:
        //show game over screen
        break;
    }
  });
}
