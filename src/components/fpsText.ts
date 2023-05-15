import * as PIXI from "pixi.js";
import { Colors } from "../colors";

class FPSCounter {
  private readonly _background: PIXI.Graphics = new PIXI.Graphics();
  private readonly _bgRadius = 3;
  private readonly _bgPadding = 16;
  private readonly _updateFrequencyMS: number = 500;
  private _timePassed: number = 0;

  public textElement: PIXI.Text;
  public container: PIXI.Container = new PIXI.Container();

  constructor(element: PIXI.Text) {
    this.textElement = element;

    this._background.beginFill(Colors.BLACK, 1);
    this._background.drawRoundedRect(
      -this._bgRadius,
      -this._bgRadius,
      this.textElement.width + this._bgPadding,
      this.textElement.height + this._bgPadding,
      this._bgRadius
    );
    this._background.endFill();
    this.container.addChild(this._background);

    this.textElement.x =
      this._background.width / 2 - this.textElement.width / 2;
    this.textElement.y =
      this._background.height / 2 - this.textElement.height / 2;
    this.container.addChild(this.textElement);
  }

  updateCounter(FPS: number, deltaMS: number) {
    if (this._timeToUpdate(deltaMS)) {
      this.textElement.text = `FPS: ${Math.round(FPS)}`;
      this._background.width = this.textElement.width + this._bgPadding;
    }
  }

  private _timeToUpdate(deltaMS: number): boolean {
    this._timePassed += deltaMS;

    if (this._timePassed >= this._updateFrequencyMS) {
      this._timePassed = 0;

      return true;
    }

    return false;
  }
}

export const fpsCounter = new FPSCounter(
  new PIXI.Text(`FPS: 000`, {
    fontFamily: "Arial",
    fontSize: 12,
    fill: Colors.GREEN,
    dropShadow: true,
    dropShadowDistance: 0.5,
  })
);
