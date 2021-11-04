export class Ripple{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.reset();
    }

    reset(){
        this.maxRadius = Math.random() * 45 + 50;

        this.radius1 = 0;
        this.radius2 = 0;

        this.velocity1 = 0;
        this.velocity2 = 0;

        this.x = Math.random() * (this.stageWidth - this.maxRadius * 2) + this.maxRadius;
        this.y = Math.random() * (this.stageHeight - this.maxRadius * 2) + this.maxRadius;
        this.done = false;
    }

    animate(ctx){
        if(this.radius2 > this.radius1 + Math.random() * 20){
            this.done = true;
        }
        if(this.done){
            this.reset();
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