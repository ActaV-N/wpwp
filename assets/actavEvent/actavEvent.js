import { Canvas } from "../canvas.js";
import { Particle } from "./particle.js";

export class ActavEvent extends Canvas{
    constructor(color, con, body, text){
        super(color, con ,body, text);

        this.text = 'ActaV';
        this.density = 10;   

        this.particles = [];

        this.mouse = {
            x:0,
            y:0,
            radius:50
        }
    }

    pointerMove(e){
        this.mouse.x = e.clientX - this.container.offsetLeft;
        this.mouse.y = e.clientY - this.container.offsetTop;

        if(this.mouse.x < 0 || this.mouse.x > this.stageWidth || 
            this.mouse.y < 0 || this.mouse.y > this.stageHeight){
            document.body.classList.remove('no-scroll')
            this.isOut = true;
        }else{
            document.body.classList.add('no-scroll')
            this.isOut = false;
        }
    }

    initiation(){
        this.particles = [];
        const fontSize = Math.min(this.stageWidth / 3, 1400 / 3);
        this.font = `bold ${fontSize}px sans-serif`;

        const tmpCanvas = document.createElement('canvas');
        const tmpCtx = tmpCanvas.getContext('2d');

        tmpCanvas.width = this.stageWidth * window.devicePixelRatio;
        tmpCanvas.height = this.stageHeight * window.devicePixelRatio;

        tmpCanvas.style.width = `${this.stageWidth}px`;
        tmpCanvas.style.height = `${this.stageHeight}px`;

        tmpCtx.font = this.font;
        tmpCtx.textBaseline = 'middle';

        this.measure = tmpCtx.measureText(this.text);

        tmpCtx.fillText(this.text, 
            (this.stageWidth - this.measure.width) / 2, 
            this.measure.actualBoundingBoxAscent +
            this.measure.actualBoundingBoxDescent +
            (this.stageHeight - fontSize) / 2, 
            this.stageWidth);
        this.imageData = tmpCtx.getImageData(0, 0, this.stageWidth, this.stageHeight);

        this.loadParticle();
    }

    loadParticle(){
        for(let y=0; y<this.stageHeight; y+=this.density){
            for(let x=0; x<this.stageWidth; x+=this.density){
                const index = (y * this.stageWidth + x) * 4;
                const alpha = this.imageData.data[index + 3];
                if(alpha !== 0){
                    this.particles.push(new Particle(x, y))
                }
            }
        }
    }

    connect(){
        let opValue = 1;
        for(let i=0; i<this.particles.length; i++){
            for(let j=i; j<this.particles.length; j++){
                const p1 = this.particles[i];
                const p2 = this.particles[j];

                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if(distance < 20){
                    opValue = 1 - (distance / 20);
                    this.ctx.strokeStyle = `rgba(143, 146, 232, ${opValue})`;
                    this.ctx.lineWidth = 1.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animation(){
        this.connect();
        for(let i=0; i<this.particles.length; i++){
            this.particles[i].animate(this.ctx, this.mouse);
        }
    }
}