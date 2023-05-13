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

  store.mainThread.add(() => {
    fpsText.text = `FPS: ${Math.round(store.mainThread.FPS.toFixed(2))}`;
    console.log(store.mainThread.FPS);

    switch (store.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        store.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
        break;
      case GameState.PAUSED:
        store.mainThread.stop();
        //show pause screen
        store.mainThread.break;
      case GameState.GAME_OVER:
        //show game over screen
        break;
    }
  });
}
