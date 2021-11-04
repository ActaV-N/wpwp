const COLORS = [// rgb(11, 19, 85)
    {
        r:11,
        g:19,
        b:85
    },
    // rgb(23, 90, 169)
    {
        r:23,
        g:90,
        b:169
    },
    // rgb(161, 85, 184)
    {
        r:161,
        g:85,
        b:184
    },
    // rgb(247, 102, 162)
    {
        r:247,
        g:102,
        b:162
    },
    // rgb(255, 164, 183)
    {
        r:255,
        g:164,
        b:183
    },
    // rgb(249, 210, 208)
    {
        r:249,
        g:210,
        b:208
    },
    
    
    
    
    
]

export class Cloud{
    constructor(x, y, stageHeight, stageWidth){
        [this.sx, this.sy, this.x, this.y] = [x, y, x, y];

        this.stageHeight = stageHeight;
        this.stageWidth = stageWidth;
        
        this.range = Math.max(this.stageHeight, this.stageWidth);

        this.baseRadius = 25
        this.radius = 0;

        this.maxWeight = COLORS.length - 1;
        this.weight = 0;

        this.r = COLORS[this.weight].r
        this.g = COLORS[this.weight].g
        this.b = COLORS[this.weight].b
        
        this.color = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;

        this.vy = 0;
        this.ay = 0.1;

        this.done = false;
        this.dying = false;

        this.grabbed = false;

        this.mouse = {
            x:this.sx,
            y:this.sy
        }

        this.grabPoint = {
            x:0,
            y:0
        }

        this.movingGrabPoint = {
            x:0, y:0
        }
    }

    die(){
        this.dying = true;
    }

    down(mouse){
        this.grabbed = true;
        this.mouse = {...mouse};

        this.grabPoint.x = this.mouse.x - this.x;
        this.grabPoint.y = this.mouse.y - this.y;

        this.movingGrabPoint = {...this.grabPoint};
    }

    move(mouse){
        this.mouse = {...mouse};
        this.movingGrabPoint.x = this.x + this.grabPoint.x;
        this.movingGrabPoint.y = this.y + this.grabPoint.y;
    }

    up(){
        this.grabbed = false;
    }

    getWeight(){
        if(this.weight < this.maxWeight){
            this.weight += 1;
        }
    }

    animate(ctx){
        if(this.dying) this.baseRadius = 0;
        else this.baseRadius = 25;
        this.radius += (this.baseRadius - this.radius) * 0.1;

        if(Math.abs(this.radius - this.baseRadius) < 1 && this.dying){
            this.done = true;
        }

        this.r += (COLORS[this.weight].r - this.r) * 0.08;
        this.g += (COLORS[this.weight].g - this.g) * 0.08;
        this.b += (COLORS[this.weight].b - this.b) * 0.08;

        this.x += ((this.mouse.x - this.grabPoint.x) - this.x) * 0.08;
        this.y += ((this.mouse.y - this.grabPoint.y) - this.y) * 0.08;

        if(this.x - this.radius < 0){
            this.x = this.radius;
        } else if(this.x + this.radius > this.stageWidth){
            this.x = this.stageWidth - this.radius
        }

        if(this.y - this.radius < 0){
            this.y = this.radius;
        } else if(this.y + this.radius > this.stageHeight){
            this.y = this.stageHeight - this.radius
        }

        this.color = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;

        ctx.fillStyle = this.color;

        ctx.save();
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if(this.grabbed){
            ctx.fillStyle = '#eee';
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.grabPoint.x, this.y + this.grabPoint.y, 5, 0, Math.PI * 2);
            ctx.fill();
    
            ctx.beginPath();
            ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(this.x + this.grabPoint.x, this.y + this.grabPoint.y);
            ctx.lineTo(this.mouse.x, this.mouse.y);
            ctx.stroke();
        }
    }
}