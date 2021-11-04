import { Canvas } from "../canvas.js";

export class MoonCanvas extends Canvas {
  // constructor(color, con) {
  //   super(color, con);

  // }

  initiation() {
    this.maxRadius =
      this.stageWidth > this.stageHeight
        ? this.stageHeight * 0.4
        : this.stageWidth * 0.4;

    this.baseRadius = this.maxRadius * 0.8;

    this.radius = this.baseRadius;

    this.x = this.stageWidth - this.radius * 1.2;
    this.y = this.radius * 1.2;
  }

  animation() {
    this.radius =
      this.baseRadius +
      (this.maxRadius - this.baseRadius) *
        (Math.sin(this.frameCount * 0.01) + 1);
    this.ctx.globalCompositeOperation = "lighter";

    this.ctx.filter = "blur(1px)";
    this.ctx.fillStyle = "#f6d55c";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2, false);
    this.ctx.fill();

    this.ctx.filter = "blur(156px)";

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}
