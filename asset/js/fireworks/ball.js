import {negativeRandom} from "../util.js";

export class Ball {
  constructor(stageWidth, stageHeight, color) {
    this.velocity = { x: negativeRandom(.5, 4), y: -((Math.random() * 16) + 5) }

    this.x = stageWidth / 2;
    this.y = stageHeight;
    this.radius = 3;
    this.color = color;
  }

  animate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x *= .995;
    this.velocity.y *= .975;
    this.radius *= .99;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}