import { Canvas } from "../canvas.js";
import { Box } from "./box.js";

export class SunEvent extends Canvas{
    constructor(color, con, bodyColor, textColor) {
        super(color, con, bodyColor, textColor);
        this.mousePos = {x:0, y:0};
        this.isDown = false;
    }

    initiation(){
        this.box = new Box(this.stageWidth, this.stageHeight);
    }

    pointerDown(e){
        this.mousePos.x = e.clientX - this.container.offsetLeft;
        this.mousePos.y = e.clientY - this.container.offsetTop;

        if(this.box.x < this.mousePos.x && this.box.x + this.box.size > this.mousePos.x &&
            this.box.y < this.mousePos.y && this.box.y + this.box.size > this.mousePos.y
            ){
            this.box.grab(this.mousePos);
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
            this.box.drag(this.mousePos)
        }
    }

    pointerUp(e){
        if(!this.isOut){
            this.box.release();
        }
    }

    animation(){
        this.ctx.fillStyle = '#fcbf49';
        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth, 0, this.stageWidth / 4, 0 , Math.PI * 2);
        this.ctx.fill();

        this.box.animate(this.ctx, this.mousePos)
        
    }
}