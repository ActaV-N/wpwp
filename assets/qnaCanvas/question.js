export class Question{
    constructor(index, stageWidth, stageHeight){
        this.index = index;
        
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.answerHeight = this.stageHeight - 300;
        if(this.answerHeight < 300){
            this.answerHeight = this.stageHeight / 2;
        }

        this.force = -2;

        this.gravity = 0.009;

        this.init();
        this.emit = false;
    }

    init(){
        // Shape Info
        this.mass = Math.random() * 5 + 5;

        this.startPointx = (this.stageWidth - this.mass) / 2;
        this.startPointy = this.stageHeight + this.mass * 5;

        this.startAngle = Math.PI / 360 * (Math.random() * 120 + 120);
        this.angle = this.startAngle;

        this.accelx = this.force * Math.cos(this.startAngle) / this.mass;
        this.accely = this.force * Math.sin(this.startAngle) / this.mass;

        this.x = this.startPointx;
        this.y = this.startPointy;

        this.vx = 0;
        this.vy = 0;

        this.size = (Math.random() * 5 + 5) * 5;

        this.isAnswer = false;
        this.color = '#ffa4b6'
        this.text = '?'

        this.font = `bold ${this.size}px sans-serif`
    }

    beAnswer(){
        this.isAnswer = true;
        this.vy = 3;
    }

    animate(ctx, frameCount){
        if(frameCount > this.index * 5){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation)

            if(!this.isAnswer){
                this.rotation = (this.x - this.startPointx) * 0.008

                this.accely += this.gravity;

                this.vx += this.accelx;
                this.vy += this.accely;
        
                this.x += this.vx;
                this.y += this.vy;
    
                if(this.x - this.size >= 0 && this.x + this.size <= this.stageWidth && this.y + this.size <= this.stageHeight){
                    this.emit = true
                }
    
                if((this.x + this.size < 0 ||
                    this.x - this.size > this.stageWidth ||
                    this.y - this.size > this.stageHeight) &&
                    this.emit){
                        this.init();
                }

                if(this.y < this.answerHeight){
                    this.beAnswer();
                }
            }

            if(this.isAnswer){

                this.text = '!'
                this.color = '#f765a3'
                this.y -= this.vy
                this.x = this.x + Math.cos(frameCount* this.index * 0.001) * 2;
                this.font = `bold ${this.size*1.5}px sans-serif`

                this.rotation += (0 - this.rotation) * 0.05;

                if(this.y + this.size < 0){
                    this.init();
                }
            }

            ctx.beginPath();

            ctx.font = this.font
            ctx.fillStyle = this.color;

            const y = (ctx.measureText(this.text).actualBoundingBoxDescent + ctx.measureText(this.text).actualBoundingBoxAscent)
            ctx.fillText(this.text, 0, y)

            ctx.restore();
        }
    }
}