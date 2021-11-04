import { Canvas } from "../canvas.js";
import { Ripple } from "./ripple.js";

export class RippleCanvas extends Canvas{
    initiation(){
        this.ripple = new Ripple(this.stageWidth, this.stageHeight);
    }

    animation(){
        this.ripple.animate(this.ctx);
    }
}