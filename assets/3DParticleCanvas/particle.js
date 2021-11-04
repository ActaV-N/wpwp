const COLORS = ["#173f5f", "#20639b", "#3caea3", "#f6d55c", "#ed553b"];

export class Particle {
  constructor(x, y, depth, vx, stageWidth) {
    this.x = x;
    this.y = y;
    this.depth = depth < 0 ? -1 : 1;
    this.vx = vx * this.depth;

    this.stageWidth = stageWidth;

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    this.radius = Math.random() * 3.8 + 1.2;
    this.radius = this.depth < 0 ? this.radius / 2 : this.radius;
  }

  animate(ctx) {
    if (this.x > this.stageWidth + this.radius) {
      this.x = -this.radius;
    }
    if (this.x < -this.radius) {
      this.x = this.stageWidth + this.radius;
    }

    this.x += this.vx;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
