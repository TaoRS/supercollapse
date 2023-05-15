import * as PIXI from "pixi.js";
import { Colors } from "../colors";

class FPSCounter {
  public element: PIXI.Text;
  public container: PIXI.Container = new PIXI.Container();
  public updateInterval: number = 0.5;

  constructor(text: PIXI.Text, updateInterval?: number) {
    this.element = text;
    this.container.addChild(this.element);

    if (updateInterval) {
      this.updateInterval = updateInterval;
    }
  }

  updateCounter(FPS: number) {
    this.element.text = `FPS: ${Math.round(FPS)}`;
  }
}

export const fpsCounter = new FPSCounter(
  new PIXI.Text(`FPS: 0`, {
    fontFamily: "Arial",
    fontSize: 12,
    fill: Colors.GREEN,
    dropShadow: true,
    dropShadowDistance: 0.5,
  })
);
