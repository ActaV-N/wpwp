import { Canvas } from "../canvas.js";
import { Particle } from "./particle.js";

export class ParticleEvent3D extends Canvas {
  constructor(color, con, bodyColor, textColor) {
    super(color, con, bodyColor, textColor);
    this.particleCnt = 300;
    this.particles = [];

    this.mousePos = {
      x:0,
      y:0
    }

    this.prevPos = {
      x:0,
      y:0,
    }

    this.isDown = false;
    this.moveX = 0;
    this.moveY = 0;
  }

  pointerDown(e){
    if(!this.isOut) {
      this.isDown = true;
      this.moveX = 0;
      this.moveY = 0;
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

    if(this.isDown){
      this.moveX = this.mousePos.x - this.prevPos.x;
      this.moveY = this.mousePos.y - this.prevPos.y;
    }
    

    this.prevPos.x = this.mousePos.x;
    this.prevPos.y = this.mousePos.y
  }

  pointerUp(){
    this.isDown = false;
  }

  initiation() {
    this.particles = [];
    for (let i = 0; i < this.particleCnt; i++) {
      const paritcle = new Particle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.floor(Math.random() * 2) - 1,
        Math.random() * 0.5 + 0.1,
        this.stageWidth,
        this.stageHeight
      );

      this.particles.push(paritcle);
    }
  }

  animation() {
    this.moveX *= 0.95
    this.moveY *= 0.95
    for (const particle of this.particles) {
      particle.animate(this.ctx, this.moveX, this.moveY);
    }
  }
}
