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
  game.startNewGame();
};

textEl.onmouseover = () => {
  textEl.style.fill = Colors.RED;
};
textEl.onmouseout = () => {
  textEl.style.fill = Colors.BLACK;
};

const container = new PIXI.Container();
container.addChild(textEl);

export const newGameText = container;
