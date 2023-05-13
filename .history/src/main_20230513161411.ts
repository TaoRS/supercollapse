import "./style.scss";
import { renderGame } from "./game.ts";
import { store } from "./store.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find #app");
}

const title = document.createElement("h1");
title.textContent = "Super Collapse!";

app.appendChild(title);

app.appendChild(store.canvas);

renderGame(store.canvas);
