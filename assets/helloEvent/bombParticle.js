export class BombParticle{
    constructor(radius){
        this.mainRadius = radius;
        
        this.startRadius = 0;
        this.radius = this.startRadius;

        this.start = false;

        this.x = 0;
        this.y = 0;
    }

    onUp(x, y, color){
        this.start = true;

        this.color = color;

        this.startRadius = Math.random() * 30 + 5;
        this.radius = this.startRadius;

        this.x = x - this.mainRadius * 2 + Math.random() * this.mainRadius * 4;
        this.y = y - this.mainRadius * 2 + Math.random() * this.mainRadius * 4;

        this.vx = Math.random() * 3 - 1.5;
        this.vy = Math.random() * 3 - 1.5;
    }

    animate(ctx){
        if(this.start){
            this.x += this.vx;
            this.y += this.vy;
            this.radius += (0 - this.radius) * 0.05;

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.fill();

            if(this.radius < 0.1) {
                this.start = false;
                this.radius = 0;
            }
        }
    }
}