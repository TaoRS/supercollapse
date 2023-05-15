import "./style.scss";
import * as PIXI from "pixi.js";
import { Game } from "./game.ts";
import { Colors } from "./colors.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find #app");
}

const title = document.createElement("h1");
title.textContent = "Super Collapse!";

const pixiApp = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: Colors.WHITE,
});
export const game = new Game(pixiApp);

app.appendChild(title);
app.appendChild(game.canvas.view);
