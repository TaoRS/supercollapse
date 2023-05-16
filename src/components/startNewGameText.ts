import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

const textEl = new PIXI.Text(`Click to Start Game`, {
  fontFamily: "Arial",
  fontSize: 33,
  fill: Colors.BLACK,
  fontWeight: "bold",
  dropShadowDistance: 0,
  dropShadowColor: Colors.DARKSLATEGRAY,
  dropShadowBlur: 5,
  dropShadowAngle: 0.5,
  dropShadow: false,
});

const pausedText = new PIXI.Text(
  `Tip: You can use ESC key on your keyboard\n to pause the game.`,
  {
    fontFamily: "Arial",
    fontSize: 14,
    fill: Colors.DARKSLATEGRAY,
    align: "center",
  }
);

textEl.eventMode = "static";

textEl.onclick = () => {
  resetStyling();
  game.startNewGame();
};

textEl.onmouseover = () => {
  document.body.style.cursor = "pointer";
  textEl.style.fill = Colors.MAROON;
  textEl.style.dropShadow = true;
};
textEl.onmouseout = () => {
  resetStyling();
};

const container = new PIXI.Container();

textEl.x = textEl.width / 2 - textEl.width / 2;
textEl.y = container.height / 2 - textEl.height / 2;

pausedText.x = container.width;
pausedText.y = container.height + textEl.height + 10;

container.addChild(textEl);
container.addChild(pausedText);

const resetStyling = () => {
  document.body.style.cursor = "default";
  textEl.style.fill = Colors.BLACK;
  textEl.style.dropShadow = false;
};

export const startNewGameText = container;
