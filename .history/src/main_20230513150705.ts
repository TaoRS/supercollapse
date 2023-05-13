import "./style.scss";
import * as PIXI from "pixi.js";
import { renderGame } from "./game.ts";

const app = document.querySelector<HTMLDivElement>("#app");

const game = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

const title = document.createElement("h1");
title.textContent = "Super Collapse!";

app?.appendChild(title);

app?.appendChild(game.view);

renderGame(game);
