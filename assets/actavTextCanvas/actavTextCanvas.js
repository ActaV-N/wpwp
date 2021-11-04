import { Canvas } from "../canvas.js";
import { Particle } from "./particle.js";

export class ActavTextCanvas extends Canvas{
    constructor(color, con, body, text){
        super(color, con ,body, text);

        this.text = 'ActaV';
        this.density = 8;   

        this.particles = [];

        this.mappedImage = [];
    }

    initiation(){
        this.particles = [];
        this.particlesCnt = this.stageWidth < 500 ? 2000 : 4000;
        this.mappedImage = []

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
        for(let y=0; y<this.stageHeight; y++){
            let row = [];
            for(let x=0; x<this.stageWidth; x++){
                const index = (y * this.stageWidth + x) * 4;
                const alpha = this.imageData.data[index + 3];
                
                row.push(alpha !== 0);
            }
            this.mappedImage.push(row);
        }
        for(let i=0; i<this.particlesCnt; i++){
            this.particles.push(new Particle(this.stageWidth, this.stageHeight, this.mappedImage))
        }
    }

    animation(){
        for(let i=0; i<this.particles.length; i++){
            this.particles[i].animate(i, this.ctx, this.frameCount);
        }
    }
}