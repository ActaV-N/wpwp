const COLORS = ["#e27d60", "#e8a87c", "#c38d9e", "#41b3a3"];

export class Ball {
  reset(x, y, radius){
    this.x = x;
    this.y = y;

    this.baseRadius = radius;
    this.radius = 0;
    this.radiusV = 0;

    this.vy = 3;

    this.frameCount = 0;

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.start = true;
    this.isEnd = false;
  }

  animate(ctx) {
    if (!this.start) {
      // Disappear
      this.radiusV += (0 - this.radius) / 15;
    } else {
      // Appear
      this.radiusV += (this.baseRadius - this.radius) / 15;
    }

    this.radiusV *= 0.8;
    this.radius += this.radiusV;

    if(Math.abs(this.radius - this.baseRadius) < 0.01){
      this.start = false;
    }
    if(this.radius < 0.01 && !this.isEnd){
      this.isEnd = true;
    }

    if (this.radius < 0) this.radius = 0;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    this.frameCount++;
  }
}
