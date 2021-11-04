export class DragText{
    constructor(text, x, y, move){
        this.x = x;
        this.y = y;

        this.text = text;
        this.startFontSize = 5 * move * 0.5;
        this.fontSize = this.startFontSize;

        this.finish = false;
        this.disappear = false;
    }

    animate(ctx){
        ctx.save();
        ctx.font = `bold ${this.fontSize}px sans-serif`;

        ctx.translate(this.x, this.y);

        ctx.fillStyle = '#1e1e1e';
        this.fontSize += (0 - this.fontSize) * 0.1;
        ctx.globalAlpha = this.fontSize / this.startFontSize;
        if(this.fontSize < 10) this.finish = true;
        if(this.fontSize < 0.2) this.disappear = true;
        ctx.fillText(this.text, 0, 0);

        ctx.restore();
    }
}