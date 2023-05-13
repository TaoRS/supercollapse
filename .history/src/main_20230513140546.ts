import "./style.scss";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  '\n<canvas id="gameCanvas" width="800" height="600"></canvas>\n';

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
