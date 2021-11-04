import { RainDrop } from "./rainDrop.js";
import { go, L, takeAll } from "../../lib/fx.js";

export class Rain {
  constructor(stageWidth, stageHeight) {
    this.dropCnt = Math.random() * 3 + 3;

    this.depth = Math.random() * 3 + 1;
    this.width = 2 / this.depth;
    this.height = 10 / this.depth;

    this.v = Math.random() * 5 + 7 / this.depth;

    this.init(stageWidth, stageWidth);
  }

  init(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.drops = [];

    this.x = Math.random() * (this.stageWidth - this.width * 2) + this.width;
    this.y = -Math.random() * this.stageHeight * 2 - this.height;

    for (let i = 0; i < this.dropCnt; i++) {
      this.drops.push(new RainDrop(this.x, this.stageHeight, this.depth));
    }
  }

  animate(ctx) {
    this.y += this.v;

    const complete = go(
      this.drops,
      L.filter(d => !d.isEnded),
      takeAll
    )

    if(!complete.length){
      this.init(this.stageWidth, this.stageHeight);
    }

    ctx.fillStyle = "#033a66";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.y >= this.stageWidth) {
      for (const drop of this.drops) {
        drop.animate(ctx);
      }
    }
  }
}
