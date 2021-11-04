import { DragText } from "./dragText.js";
import {L, takeAll, go} from '../../lib/fx.js'

export class Drag{
    constructor(){
        this.texts = [];
        this.space = 10;
    }

    onMove(mousePos, prevPos){
        const finished = go(
            this.texts,
            L.filter(t => t.finish),
            takeAll
        )

        const x = prevPos.x - mousePos.x;
        const y = prevPos.y - mousePos.y;
        const move = Math.sqrt(x*x + y*y);
        

        if(move > 2){
            const text = this.texts.length === finished.length ? '슈':'우';
            this.texts.push(new DragText(text, mousePos.x, mousePos.y, move));
        }
    }

    animate(ctx){
        ctx.globalCompositeOperation = 'destination-over';
        for(const text of this.texts){
            text.animate(ctx);
            if(text.disappear){
                this.texts.splice(this.texts.indexOf(text), 1);
            }
        }
    }
}