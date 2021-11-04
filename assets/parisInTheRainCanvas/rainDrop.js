export class RainDrop {
  constructor(x, y, depth) {
    this.sx = x;
    this.sy = y;

    this.depth = depth;

    this.x = this.sx;
    this.y = this.sy;

    this.vx = (Math.random() * 6 - 3) / this.depth;
    this.vy = -4 / this.depth;
    this.ay = (Math.random() * 0.5 + 0.3) / this.depth;

    this.radius = 1 / this.depth;

    this.isEnded = false;
  }

  animate(ctx) {
    if (!this.isEnded) {
      this.x += this.vx;
      this.vy += this.ay;
      this.y += this.vy;

      if (this.y > this.sy) this.isEnded = true;

      ctx.fillStyle = "#033a66";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }
}
