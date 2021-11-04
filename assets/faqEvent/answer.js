export class Answer{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.mass = Math.random() * 5 + 5;
        this.size = (Math.random() * 5 + 5) * 5;

        this.text = '!';
        this.color = '#f765a3'
        this.fontSize = this.size * 1.5;

        this.vy = 3;

        this.x = Math.random() * this.stageWidth;
        this.y = this.stageHeight + this.size;

        this.captured = false;
        this.absorbed = false;
        this.done = false;
    }

    reset(){
        this.mass = Math.random() * 5 + 5;
        this.size = (Math.random() * 5 + 5) * 5;

        this.text = '!';
        this.color = '#f765a3'
        this.fontSize = this.size * 1.5;

        this.x = Math.random() * this.stageWidth;
        this.y = this.stageHeight + this.size;

        this.captured = false;
        this.absorbed = false;
        this.done = false;
        this.absorbTo = null;
    }

    getDirection(clouds){
        let totalForceX = 0;
        let totalForceY = 0;
        for(const cloud of clouds){
                let dx = cloud.x - this.x;
                let dy = cloud.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                let dirX = dx / distance;
                let dirY = dy / distance;
    
                let force = (cloud.range - distance) / cloud.range;
                if(distance < cloud.range && !this.absorbed){
                    this.captured = true;
                    totalForceX += force * dirX * this.mass;
                    totalForceY += force * dirY * this.mass;
                }
    
                if(distance < cloud.radius + 5 ){
                    this.absorbed = true;
                    this.absorbTo = cloud;
                    if(this.fontSize < 1 && !this.done){
                        this.done = true;
                        cloud.getWeight();
                    }
                }
        }

        if(this.absorbTo){
            let dx = this.absorbTo.x - this.x;
            let dy = this.absorbTo.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let dirX = dx / distance;
            let dirY = dy / distance;

            let force = (this.absorbTo.range - distance) / this.absorbTo.range;
            
            totalForceX += force * dirX * this.mass;
            totalForceY += force * dirY * this.mass;
        }

        this.x += totalForceX;
        this.y += totalForceY;
    }

    animate(ctx, clouds, frameCount, index){
        this.getDirection(clouds);

        if(!this.captured){
            this.x = this.x + Math.cos(frameCount*index * 0.001) * 2;
            this.y -= this.vy;
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.textBaseline = 'middle';
        
        if(this.absorbed){
            this.fontSize += (0 - this.fontSize) * 0.1;
        }

        ctx.font = `bold ${this.fontSize}px sans-serif`;


        ctx.fillStyle = this.color;
        
        const measure = ctx.measureText(this.text);
        ctx.fillText(this.text, 0, measure.actualBoundingBoxDescent);

        ctx.restore();
    }
}