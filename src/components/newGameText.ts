import * as PIXI from "pixi.js";
import { Colors } from "../colors";
import { game } from "../main";

const textEl = new PIXI.Text(`New Game`, {
  fontFamily: "Arial",
  fontSize: 21,
  fill: Colors.BLACK,
});

textEl.eventMode = "static";

textEl.onclick = () => {
  document.body.style.cursor = "default";
  game.startNewGame();
};

textEl.onmouseover = () => {
  document.body.style.cursor = "pointer";
  textEl.style.fill = Colors.RED;
};
textEl.onmouseout = () => {
  document.body.style.cursor = "default";
  textEl.style.fill = Colors.BLACK;
};

const container = new PIXI.Container();
container.addChild(textEl);

export const newGameText = container;
