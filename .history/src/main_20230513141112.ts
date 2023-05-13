import "./style.scss";
import { setupCounter } from "./counter.ts";
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

document.querySelector<HTMLDivElement>("#app").appendChild(app.view);

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
