const COLORS = ["#173f5f", "#20639b", "#3caea3", "#f6d55c", "#ed553b"];

export class Particle {
  constructor(x, y, depth, vx, stageWidth, stageHeight) {
    this.x = x;
    this.y = y;
    this.depth = depth < 0 ? -1 : 1;
    this.vx = vx * this.depth;

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    this.downRatio = 4

    this.radius = Math.random() * 3 + 1.5;
    this.radius = this.depth < 0 ? this.radius / this.downRatio : this.radius;

    this.move = 0;

    this.restart = false;
  }

  animate(ctx, moveX, moveY) {
    if (this.x > this.stageWidth + this.radius * this.downRatio || this.x < -this.radius * this.downRatio ||
        this.y > this.stageHeight + this.radius * this.downRatio || this.y < - this.radius * this.downRatio
      ) {
      if(!this.restart){
        this.restart = true;

        this.vx *= -1;
        if(this.depth < 0){
          this.radius *= this.downRatio;
        } else{
          this.radius /= this.downRatio;
        }
        this.depth *= -1;
      }
    }

    if(this.x - this.radius > 0 && this.x + this.radius < this.stageWidth &&
      this.y - this.radius > 0 && this.y + this.radius < this.stageHeight
      ){
      this.restart = false;
    }

    moveX = this.vx * moveX;
    moveY = this.vx * moveY;

    this.x += this.vx + moveX;
    this.y += moveY;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
