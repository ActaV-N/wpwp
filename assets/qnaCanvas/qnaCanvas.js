import { Canvas } from "../canvas.js";
import { Question } from "./question.js";

// #ffa4b6
// #f765a3

export class QnaCanvas extends Canvas{
    constructor(color, con, bodyColor, textColor) {
        super(color, con, bodyColor, textColor);

        this.questions = [];
        if(this.stageWidth < 500){
            this.questionsCount = 10;
        } else{
            this.questionsCount = 15;
        }
    }

    initiation(){
        this.questions = [];
        for(let i=0; i<this.questionsCount; i++){
            this.questions.push(new Question(i, this.stageWidth, this.stageHeight));
        }
    }

    animation(){
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle';
        this.ctx.save();
        for(const q of this.questions){
            q.animate(this.ctx, this.frameCount)
        }
    }
}