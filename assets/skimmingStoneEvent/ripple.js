export class Ripple{
    constructor(x, y, index){
        this.reset(x, y, index)
    }

    reset(x, y, index){
        this.maxRadius = 90 - index * 10;

        this.radius1 = 0;
        this.radius2 = 0;

        this.velocity1 = 0;
        this.velocity2 = 0;

        this.x = x;
        this.y = y;
        this.done = false;
    }

    animate(ctx){
        if(this.radius2 > this.radius1 + Math.random() * 20){
            this.done = true;
        }
        if(this.done){
            this.radius1 = 0;
            this.radius2 = 0;

            this.velocity1 = 0;
            this.velocity2 = 0;
        }
        const accel1 = (this.maxRadius - this.radius1) / 10;
        const accel2 = (this.maxRadius + 10 - this.radius2) / 10;

        this.velocity1 += accel1;
        this.velocity1 *= 0.4;
        this.radius1 += this.velocity1;

        this.velocity2 += accel2;
        this.velocity2 *= 0.33;
        this.radius2 += this.velocity2;

        if(this.radius1 > 0 && this.radius2 > 0){
            ctx.beginPath();
            ctx.fillStyle = '#1e1e1e';
            ctx.arc(this.x, this.y, this.radius1, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
    
            ctx.beginPath();
            ctx.fillStyle = '#f9f9f9';
            ctx.arc(this.x, this.y, this.radius2, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    }
}