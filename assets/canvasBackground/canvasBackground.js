import { Point } from "./point.js";
import { filter, log } from "../../lib/fx.js";

export class CanvasBackground {
  constructor(color) {
    this.startColor = color;
    this.color = color;
  }

  init(con) {
    this.complete = [false, false, false, false];

    this.h = con.clientHeight;
    this.w = con.clientWidth;

    this.vmin = this.w > this.h ? this.h / 100 : this.w / 100;
    this.panelSize = 70;

    this.sx = (this.w - this.vmin * this.panelSize) / 2;
    this.sy = (this.h - this.vmin * this.panelSize) / 2;

    this.points = [
      new Point(this.sx, this.sy, 0, 0, 0),
      new Point(this.w - this.sx, this.sy, this.w, 0, 1),
      new Point(this.w - this.sx, this.h - this.sy, this.w, this.h, 2),
      new Point(this.sx, this.h - this.sy, 0, this.h, 3)
    ];
  }

  reset() {
    this.complete = [false, false, false, false];
  }

  activate(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    for (let i = 0; i < 4; i++) {
      if (i === 0) ctx.moveTo(this.points[i].x, this.points[i].y);
      else {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      if (this.points[i].activate()) {
        this.complete[i] = true;
      }
    }

    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.fill();

    const complete = filter((c) => !c, this.complete);
    if (complete.length === 0) {
      this.color = `rgba(0,0,0,0)`;
      return true;
    }
  }

  deactivate(ctx) {
    ctx.fillStyle = this.startColor;
    ctx.beginPath();

    for (let i = 0; i < 4; i++) {
      if (i === 0) ctx.moveTo(this.points[i].x, this.points[i].y);
      else {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      if (this.points[i].deactivate()) {
        this.color = this.startColor;
        this.complete[i] = true;
      }
    }

    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.fill();

    const complete = filter((c) => !c, this.complete);
    if (complete.length === 0) return true;
  }
}
