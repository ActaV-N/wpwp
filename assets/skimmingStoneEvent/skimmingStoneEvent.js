import { Canvas } from "../canvas.js";
import { Ripple } from "./ripple.js";

export class SkimmingStoneEvent extends Canvas{
    constructor(color, con, body, text){
        super(color, con, body, text);
        
        this.mouse = {
            x:0,
            y:0
        }

        this.prevMouse = {
            x:0,
            y:0
        }

        this.ripples = [];
        this.isMoving = false;
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

        if(!this.isOut){
            const dx = this.mouse.x - this.prevMouse.x;
            const dy = this.mouse.y - this.prevMouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance > 1){
                this.isMoving = true;
            } else{
                this.isMoving = false;
            }

            if(this.isMoving && this.animationCondition()){
                if(this.frameCount % 10 === 0){
                    if(this.ripples.length){
                        const dx = this.ripples[this.ripples.length - 1].x - this.mouse.x;
                        const dy = this.ripples[this.ripples.length - 1].y - this.mouse.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if(distance < 50) return;
                    }

                    this.ripples.push(new Ripple(this.mouse.x, this.mouse.y, this.ripples.length));
                }
            }
        }

        console.log(this.ripples)

        this.prevMouse = {...this.mouse}
    }

    animation(){
        for(const ripple of this.ripples){
            ripple.animate(this.ctx);
            if(ripple.done){
                this.ripples.splice(this.ripples.indexOf(ripple), 1);
            }
        }
    }
}