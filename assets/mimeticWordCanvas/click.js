export class Click{
    constructor(ctx, stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight

        this.text1 = '딸';
        this.text2 = '깍!'

        this.font = 'bold 40px sans-serif';

        ctx.font = this.font
        this.measured1 = ctx.measureText(this.text1);
        this.measured2 = ctx.measureText(this.text2);
        ctx.textBaseline = 'middle';

        this.show = false;
        this.isUp = false;

        this.info1 = {
            x:0,
            y:0,
            vx: -(Math.random() * 2 + 1),
            vy: -(Math.random() * 3 + 5),
            ay: 1,
            rotation: 0,
            complete: false
        }

        this.info2 = {
            x:0,
            y:0,
            vx: Math.random() * 2 + 1,
            vy: -(Math.random() * 3 + 5),
            ay: 1,
            rotation: 0,
            complete:false
        }

        this.remove = false;
    }

    updateMousePos(mousePos){
        if(!this.isUp){
            this.info1.x = mousePos.x;
            this.info2.x = mousePos.x;

            this.info1.y = mousePos.y;
            this.info2.y = mousePos.y;
        }
    }

    animate(ctx, frameCount){
        if(this.show){
            ctx.save();
            ctx.translate(this.info1.x, this.info1.y);
            ctx.rotate(this.info1.rotation);

            this.info1.x += Math.cos(frameCount * 0.8) * 0.5;

            ctx.fillStyle = '#1e1e1e';
            ctx.fillText(this.text1, -this.measured1.width - 0.5, 0);

            if(this.isUp){
                this.info1.vy += this.info1.ay;

                this.info1.x += this.info1.vx;
                this.info1.y += this.info1.vy;

                this.info1.rotation += this.info1.vx * 0.01;

                if(this.info1.y > this.stageHeight){
                    this.info1.complete = true;
                }
            }

            ctx.restore();

            ctx.save();
            ctx.translate(this.info2.x, this.info2.y);
            ctx.rotate(this.info2.rotation)
            
            ctx.strokeStyle = '#1e1e1e';
            ctx.strokeText(this.text2, 0, 0);

            if(this.isUp){
                ctx.fillText(this.text2, 0, 0);

                this.info2.vy += this.info2.ay;

                this.info2.x += this.info2.vx;
                this.info2.y += this.info2.vy;

                this.info2.rotation += this.info2.vx * 0.01;

                if(this.info2.y > this.stageHeight){
                    this.info2.complete = true;
                }
            }

            if(this.info1.complete && this.info2.complete) this.remove = true;

            ctx.restore();
        }
    }
}