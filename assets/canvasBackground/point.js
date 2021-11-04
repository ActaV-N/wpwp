export class Point {
  constructor(sx, sy, dx, dy, index) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.index = index;
  }

  activate() {
    if (Math.abs(this.dx - this.x) < 0.1 && Math.abs(this.dy - this.y) < 0.1)
      return true;

    this.x += ((this.dx - this.x) * 0.3) / (this.index + 1.2);
    this.y += ((this.dy - this.y) * 0.3) / (this.index + 1.2);
  }

  deactivate() {
    if (Math.abs(this.sx - this.x) < 0.1 && Math.abs(this.sy - this.y) < 0.1)
      return true;

    this.x += ((this.sx - this.x) * 0.3) / (this.index + 1.2);
    this.y += ((this.sy - this.y) * 0.3) / (this.index + 1.2);
  }
}
