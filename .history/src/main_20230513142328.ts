import "./style.scss";
import * as PIXI from "pixi.js";
import { renderGame } from "./game.ts";

const game = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

// create a new h1 element with super collapse text
const title = document.createElement("h1");
title.textContent = "Super Collapse";
document.querySelector<HTMLDivElement>("#app")?.appendChild(title);

document.querySelector<HTMLDivElement>("#app")?.appendChild(game.view);

renderGame(game);
