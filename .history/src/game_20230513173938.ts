import { GameState } from "./types/state";
import { game } from "./store";
import keyboardKeys from "./keys";
import { fpsText } from "./components/fpsText";

export function renderGame() {
  game.canvas.stage.addChild(fpsText);

  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === keyboardKeys.ESCAPE) {
      game.gameState = GameState.PAUSED;
      if (game.gameState === GameState.PAUSED) {
        game.mainThread.update();
      }
    }
  });

  game.mainThread.add(() => {
    fpsText.text = `FPS: ${game.mainThread.FPS.toFixed(2)}`;
    console.log(game.mainThread.FPS);

    switch (game.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        game.mainThread.start();
        game.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
        break;
      case GameState.PAUSED:
        game.mainThread.stop();
        console.log(game.mainThread);
        //show pause screen
        break;
      case GameState.GAME_OVER:
        //show game over screen
        break;
    }
  });
}
