import { Canvas } from "../canvas.js";
import { Answer } from "./answer.js";
import { Cloud } from "./cloud.js";

export class FaqEvent extends Canvas{
    constructor(color, con, body, text){
        super(color, con, body, text);

        this.answerCnt = 50;
        this.answers = [];

        this.maximumCloud = 3;
        this.clouds = [];

        this.mouse = {
            x:0,
            y:0
        }

        this.curr = null;
        this.newCloud = null
        this.dead = false;

        this.dieIndex = 0;
    }

    pointerDown(e){
        this.mouse.x = e.clientX - this.container.offsetLeft;
        this.mouse.y = e.clientY - this.container.offsetTop;

        let isSelected = false;

        if(!this.isOut){
            for(let i=this.clouds.length - 1; i>=0; i--){
                const cloud = this.clouds[i];
                const dx = cloud.x - this.mouse.x;
                const dy = cloud.y - this.mouse.y;

                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < cloud.radius){
                    this.curr = this.clouds.splice(i, 1)[0]
                    this.curr.down(this.mouse);
                    this.clouds.push(this.curr);
                    isSelected = true;
                    break;
                }
            }
            if(!isSelected && !this.dead){
                if(this.clouds.length <= this.maximumCloud){
                    this.clouds.push(new Cloud(this.mouse.x, this.mouse.y, this.stageHeight, this.stageWidth));
                }else{
                    this.dead = true;
                    this.clouds[this.dieIndex % this.clouds.length].die();
                    this.newCloud = new Cloud(this.mouse.x, this.mouse.y, this.stageHeight, this.stageWidth);
                }
            }   
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

        if(this.curr){
            this.curr.move(this.mouse)
        }
    }
    
    pointerUp(){
        if(this.curr){
            this.curr.up();
            this.curr = null;
        }
    }

    initiation(){
        this.answers = [];
        this.clouds = [];

        this.clouds.push(new Cloud(this.stageWidth / 2, this.stageHeight / 8, this.stageHeight, this.stageWidth));
    }

    animation(){
        if(this.frameCount % 20 === 0){
            if(this.answers.length < this.answerCnt){
                this.answers.push(new Answer(this.stageWidth, this.stageHeight))
            }
        }

        for(let i=0; i<this.answers.length; i++){
            this.answers[i].animate(this.ctx, this.clouds, this.frameCount, i);
            if(this.answers[i].done){
                this.answers.splice(i, 1);
            }
        }

        if(this.newCloud){
            this.newCloud.animate(this.ctx);
        }

        for(let i=0; i<this.clouds.length; i++){
            if(this.clouds[i]){
                this.clouds[i].animate(this.ctx);
                if(this.clouds[i].done){
                    this.dead = false;
                    this.clouds[i] = this.newCloud;
                    this.dieIndex ++;
                    this.newCloud = null;
                }
            }
        }
    }
}