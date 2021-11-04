export class Point{
    constructor(index, x, stageHeight){
        this.index = index;
        this.stageHeight = stageHeight;

        this.y = this.stageHeight / 2;
        this.x = x;
        this.amp = this.stageHeight / 20;
    }

    animate(frameCount){
        // Update
        this.y = this.stageHeight / 2 + Math.sin(frameCount*0.05+this.index) * this.amp;
    }
}