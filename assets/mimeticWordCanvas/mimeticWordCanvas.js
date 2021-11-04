import { Canvas } from "../canvas.js";
import { Click } from "./click.js";
import { Drag } from './drag.js';

export class MimeticWordCanvas extends Canvas{
    constructor(color, con, bodyColor, textColor) {
        super(color, con, bodyColor, textColor);
        this.clicks = [];
        this.mousePos = {x:0, y:0};
        this.prevPos = {x:0, y:0};

        this.drag = new Drag();
        this.isOut = false;
    }

    pointerDown(e){
        if(!this.isOut){
            const click = new Click(this.ctx, this.stageWidth, this.stageHeight);
            this.clicks.push(click);
    
            this.mousePos.x = e.clientX - this.container.offsetLeft;
            this.mousePos.y = e.clientY - this.container.offsetTop;
    
            for(const click of this.clicks){
                click.updateMousePos(this.mousePos);
                click.show = true;
            }
        }
    }

    pointerMove(e){
        this.mousePos.x = e.clientX - this.container.offsetLeft;
        this.mousePos.y = e.clientY - this.container.offsetTop;

        if(this.mousePos.x < 0 || this.mousePos.x > this.stageWidth || 
            this.mousePos.y < 0 || this.mousePos.y > this.stageHeight){
             document.body.classList.remove('no-scroll')
             this.isOut = true;
         }else{
             document.body.classList.add('no-scroll')
             this.isOut = false;
         }
         if(!this.isOut){
            for(const click of this.clicks){
                click.updateMousePos(this.mousePos);
            }
    
            this.drag.onMove(this.mousePos, this.prevPos, this.frameCount);
    
            this.prevPos.x = this.mousePos.x;
            this.prevPos.y = this.mousePos.y;
         }
    }

    pointerUp(e){
        if(!this.isOut){
            this.mousePos.x = e.clientX - this.container.offsetLeft;
            this.mousePos.y = e.clientY - this.container.offsetTop;
    
            for(const click of this.clicks){
                click.updateMousePos(this.mousePos);
                click.isUp = true;
    
            }
        }
    }

    animation(){
        for(const click of this.clicks){
            if(click.remove){
                this.clicks.splice(this.clicks.indexOf(click), 1);
            }
            click.animate(this.ctx, this.frameCount);
        }

        this.drag.animate(this.ctx);
    }
}