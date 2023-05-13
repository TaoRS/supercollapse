import "./style.scss";
import * as PIXI from "pixi.js";
import { renderGame } from "./game.ts";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

document.querySelector<HTMLDivElement>("#app")?.appendChild(app.view);

renderGame(app);
