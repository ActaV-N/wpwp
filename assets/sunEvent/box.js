export class Box{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.size = 50;

        this.startX = (this.stageWidth - this.size) / 2;
        this.startY = (this.stageHeight - this.size) / 2;

        this.x = this.startX;
        this.y = this.startY;

        this.grabbed = false;

        this.targetPos = {
            x:this.x,
            y:this.y
        }

        this.grabbedPoint = {
            x:0,
            y:0
        }

        this.acc = 0.08;

        this.lightPoint = {
            x:this.stageWidth + 50,
            y: - 50
        }
    }

    grab(mousePos){
        this.grabbed = true;

        this.grabbedPoint.x = mousePos.x - this.x;
        this.grabbedPoint.y = mousePos.y - this.y;
    }

    drag(mousePos){
        if(this.grabbed){
            this.targetPos.x = mousePos.x - this.grabbedPoint.x;
            this.targetPos.y = mousePos.y - this.grabbedPoint.y;
        }
    }

    release(){
        this.grabbed = false;
    }

    getShadowPoint(x, y){
        const tangent = (y - this.lightPoint.y) / (x - this.lightPoint.x) ;

        return tangent * (- this.lightPoint.x);
    }

    animate(ctx, mousePos){
        this.x += (this.targetPos.x - this.x) * this.acc;
        this.y += (this.targetPos.y - this.y) * this.acc;

        // Check if it's colliding with sun
        const x = this.x + this.size - this.stageWidth;
        const y = this.y;
        const radius = this.stageWidth / 4;
        const dist = Math.sqrt(x * x + y * y);
        if(dist < radius){
            this.release();
            this.targetPos = {
                x:this.startX,
                y:this.startY
            }
        }


        ctx.beginPath();
        ctx.fillStyle = '#d62828';
        ctx.fillRect(this.x, this.y, this.size, this.size);

        ctx.fillStyle = '#003049'
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(0, this.getShadowPoint(this.x + this.size, this.y + this.size));
        ctx.lineTo(0, this.getShadowPoint(this.x, this.y));
        ctx.fill();

        if(this.grabbed){
            ctx.beginPath();
            ctx.fillStyle = '#f77f00';
            ctx.strokeStyle = '#f77f00'

            ctx.arc(this.x + this.grabbedPoint.x, this.y + this.grabbedPoint.y, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(this.x + this.grabbedPoint.x, this.y + this.grabbedPoint.y)
            ctx.stroke();
        }
    }
}