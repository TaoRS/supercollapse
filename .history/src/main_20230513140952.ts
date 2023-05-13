import "./style.scss";
import { setupCounter } from "./counter.ts";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = app.view.outerHTML;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
