import {Canvas} from '../canvas.js'
import { Wave } from './wave.js';
export class HangangCanvas extends Canvas{
    constructor(color, con, bodyColor, textColor) {
        super(color, con, bodyColor, textColor);

        this.waveCount = 3;
        this.waves = [];
    }

    initiation(){
        this.waves = [];
        for(let i=0; i<this.waveCount; i++){
            this.waves.push(new Wave(i));
            this.waves[i].init(this.stageWidth, this.stageHeight);
        }
    }

    animation(){
        this.ctx.globalCompositeOperation = 'luminosity'
        for(const wave of this.waves){
            wave.animate(this.ctx, this.frameCount)
        }
    }
}