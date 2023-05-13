import "./style.scss";
import * as PIXI from "pixi.js";
import { renderGame } from "./game.ts";

const game = new PIXI.Application<HTMLCanvasElement>({
  width: 500,
  height: 500,
  backgroundColor: 0xffffff,
});

const title = document.createElement("h1");
title.textContent = "Super Collapse!";

document.querySelector<HTMLDivElement>("#app")?.appendChild(title);

document.querySelector<HTMLDivElement>("#app")?.appendChild(game.view);

renderGame(game);
