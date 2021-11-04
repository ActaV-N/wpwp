import {Canvas} from '../canvas.js'
import {Point} from './point.js'

export class HelloEvent extends Canvas{
    constructor(color, con, bodyColor, textColor) {
        super(color, con, bodyColor, textColor);

        this.mousePos = {
            x:0,
            y:0,
        }

        this.point = new Point();

        this.isOut = false;
    }

    initiation(){
        this.mousePos.x = this.stageWidth / 2;
        this.mousePos.y = this.stageHeight / 2;
    }

    pointerUp(){
        if(!this.isOut){
            this.point.onUp();
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

        if(this.isOut){
            this.mousePos.x = this.stageWidth / 2;
            this.mousePos.y = this.stageHeight / 2;
        }
    }

    animation(){
        this.point.animate(this.ctx, this.mousePos);
    }
}