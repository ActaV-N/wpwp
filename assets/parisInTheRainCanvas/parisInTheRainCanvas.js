import { Canvas } from "../canvas.js";
import { Rain } from "./rain.js";

// 033a66
export class ParisInTheRainCanvas extends Canvas {
  constructor(color, con, bodyColor, textColor) {
    super(color, con, bodyColor, textColor);
    this.rainCnt = 1000;
    this.rains = [];
  }

  initiation() {
    this.rains = [];
    for (let i = 0; i < this.rainCnt; i++) {
      const rain = new Rain(this.stageWidth, this.stageHeight);
      this.rains.push(rain);
      this.rains[i].init(this.stageWidth, this.stageHeight);
    }
  }

  animation() {
    for (const rain of this.rains) {
      rain.animate(this.ctx);
    }
  }
}
