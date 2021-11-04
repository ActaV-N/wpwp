import {Point} from './point.js'

const COLORS = ['rgba(0, 63, 154, 0.7)', 'rgba(120, 193, 255, 0.9)','rgba(80, 153, 244, 0.9)'];

export class Wave{
    constructor(index){
        this.index = index;
        this.wavePointCount = 6;
        this.wavePoints = [];

        this.color = COLORS[this.index];
    }

    init(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        for(let i=0; i<this.wavePointCount;i++){
            this.wavePoints.push(new Point(i+this.index, stageWidth / (this.wavePointCount - 1)* i, stageHeight))
        }
    }

    animate(ctx, frameCount){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.wavePoints[0].x,this.wavePoints[0].y)
        for(let i=1; i<this.wavePoints.length - 1; i++){
            const wavePoint = this.wavePoints[i];
            const nextPoint = this.wavePoints[i + 1];
            const cx = (nextPoint.x + wavePoint.x) / 2;
            const cy = (nextPoint.y + wavePoint.y) / 2;
            wavePoint.animate(frameCount);

            ctx.quadraticCurveTo(wavePoint.x, wavePoint.y, cx, cy);
            
        }
        ctx.lineTo(this.wavePoints[this.wavePoints.length - 1].x, this.wavePoints[this.wavePoints.length - 1].y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight);
        ctx.lineTo(this.wavePoints[0].x,this.wavePoints[0].y);
        ctx.fill();
    }
}