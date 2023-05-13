import { GameState } from "./types/state";
import { game } from "./store";
import keyboardKeys from "./keys";
import { fpsText } from "./components/fpsText";

export function renderGame() {
  game.canvas.stage.addChild(fpsText);

  game.canvas.ticker.add(() => {
    fpsText.text = `FPS: ${game.canvas.ticker.FPS.toFixed(2)}`;

    switch (game.gameState) {
      case GameState.NEW_GAME:
        //gen new board
        game.canvas.ticker.start();
        game.gameState = GameState.PLAYING;
        break;
      case GameState.PLAYING:
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
