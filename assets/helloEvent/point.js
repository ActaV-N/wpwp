import { BombParticle } from "./bombParticle.js";

const COLORS = ['#ff5964', '#ffe74c', '#eeeeee'];

export class Point{
    constructor(){
        this.x = 0;
        this.y = 0;

        this.radius = 12;

        this.colorIndex = 0;

        this.particles = [];
    }

    onUp(){
        this.particlesCount = Math.random() * 5 + 3;
        this.particles = [];

        for(let i=0; i<this.particlesCount; i++){
            this.particles.push(new BombParticle(this.radius))
        }

        this.colorIndex ++;
        for(const particle of this.particles){
            particle.onUp(this.x, this.y, COLORS[this.colorIndex % COLORS.length])
        }   
    }

    animate(ctx, mousePos){
        this.x += (mousePos.x - this.x) * 0.05;
        this.y += (mousePos.y - this.y) * 0.05; 

        ctx.fillStyle = COLORS[this.colorIndex % COLORS.length];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        for(const particle of this.particles){
            particle.animate(ctx)
        }
    }
}