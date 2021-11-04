import { Canvas } from "../canvas.js";
import { Ball } from "./ball.js";

export class HelloCanvas extends Canvas {
  constructor(color, con, bodyColor, textColor) {
    super(color, con, bodyColor, textColor);
    this.ball = new Ball();
    this.reset();
  }

  reset(){
    const radius = Math.random() * 30 + 10;
    const x = Math.random() * (this.stageWidth - radius * 2) + radius;
    const y = Math.random() * (this.stageHeight - radius * 2) + radius;

    this.ball.reset(x, y, radius);
  }

  animation() {
    if(this.ball.isEnd){
      this.reset()
    }
    this.ball.animate(this.ctx)
  }
}
