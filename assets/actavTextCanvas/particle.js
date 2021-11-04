const COLORS = ['rgba(66, 67, 107,', 'rgba(152, 64, 99,', 'rgba(245, 72, 104,', 'rgba(255, 150, 119,']

export class Particle{
    constructor(stageWidth, stageHeight, mappedImage){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.mappedImage = mappedImage;

        this.start = false;

        this.init();
    }

    init(){
        this.color = COLORS[Math.round(Math.random() * COLORS.length)];
        // this.color = ''
        this.x = Math.random() * this.stageWidth;
        this.y = Math.random() * this.stageHeight;

        this.startRadius = 1;

        this.radius = this.startRadius;
        this.maxRadius = 8;

        this.opVal = 0;

        this.vy = Math.random() * 3 + 1;
        this.cosWidth = Math.random() + 1;

        this.dir = Math.random() - 0.5 < 0 ? -1 : 1;
    }

    getAlphaColor(alpha){
        return this.color + alpha + ')';
    }

    animate(i, ctx, frameCount){


        this.y -= this.vy;
        if(this.y < 0){
            this.y = this.stageHeight;
            this.radius = this.startRadius;
        }

        const posY = Math.floor(this.y);
        const posX = Math.floor(this.x);

        if(this.mappedImage[posY] && this.mappedImage[posY][posX]){
            this.x = this.x + Math.cos(frameCount * 0.001 * ((i + 1) % 6)) * this.dir;

            this.start = true;
            this.opVal += (1 - this.opVal) * 0.1;
            this.radius += (this.maxRadius - this.radius) * 0.08;

            this.vy = Math.random() * 1.5 + 2;
        } else{
            this.x = this.x + Math.cos(frameCount * 0.01 * ((i + 1) % 6)) * this.cosWidth * this.dir;

            this.start = false;
            this.opVal += (0 - this.opVal) * 0.01;
            this.radius += (this.startRadius - this.radius) * 0.1;
            
            this.vy = Math.random() * 3 + 1;
        }

        if(this.radius < 0) this.radius = 0;

        ctx.beginPath();
        ctx.fillStyle = this.color + this.opVal + ')';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}