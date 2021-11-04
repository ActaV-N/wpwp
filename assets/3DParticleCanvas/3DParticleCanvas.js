import { Canvas } from "../canvas.js";
import { Particle } from "./particle.js";

export class ParticleCanvas3D extends Canvas {
  constructor(color, con, bodyColor, textColor) {
    super(color, con, bodyColor, textColor);
    this.particleCnt = 300;
    this.particles = [];
  }

  initiation() {
    this.particles = [];
    for (let i = 0; i < this.particleCnt; i++) {
      const paritcle = new Particle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.floor(Math.random() * 2) - 1,
        Math.random() * 0.5 + 0.1,
        this.stageWidth
      );

      this.particles.push(paritcle);
    }
  }

  animation() {
    for (const particle of this.particles) {
      particle.animate(this.ctx);
    }
  }
}
