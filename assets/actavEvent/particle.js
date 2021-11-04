const COLORS = ['#FF9677']

export class Particle{
    constructor(x, y){
        this.sx = x;
        this.sy = y;
        this.x = x;
        this.y = y;

        this.density = 10
        
        this.color = COLORS[Math.round(Math.random() * COLORS.length)];

        this.radius = 1.5;
    }

    animate(ctx, mouse){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let fx = dx / distance;
        let fy = dy / distance;

        let maxDistance = mouse.radius;

        let force = (maxDistance - distance) / maxDistance;



        if(distance < maxDistance){
            this.x -= fx * force * this.density;
            this.y -= fy * force * this.density;
        } else{
            if(this.x !== this.sx){
                dx = this.sx - this.x;
                this.x += dx / distance * this.density;
            }

            if(this.y !== this.sy){
                dy = this.sy - this.y;
                this.y += dy / distance * this.density;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}