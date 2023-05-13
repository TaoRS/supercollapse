import "./style.scss";
import * as PIXI from "pixi.js";
import { renderGame } from "./game.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find #app");
}

const pixi = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

const title = document.createElement("h1");
title.textContent = "Super Collapse!";

app.appendChild(title);

app.appendChild(pixi.view);

renderGame(pixi);
