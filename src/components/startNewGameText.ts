import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

const textEl = new PIXI.Text(`Start Game`, {
  fontFamily: "Arial",
  fontSize: 21,
  fill: Colors.BLACK,
});

textEl.eventMode = "static";

textEl.onclick = () => {
  resetStyling();
  game.startNewGame();
};

textEl.onmouseover = () => {
  document.body.style.cursor = "pointer";
  textEl.style.fill = Colors.RED;
};
textEl.onmouseout = () => {
  resetStyling();
};

const container = new PIXI.Container();
container.addChild(textEl);

const resetStyling = () => {
  document.body.style.cursor = "default";
  textEl.style.fill = Colors.BLACK;
};

export const startNewGameText = container;
