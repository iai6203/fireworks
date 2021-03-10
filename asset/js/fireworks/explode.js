import {negativeRandom} from "../util.js";

export class Explode {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;

    this.sparks = [];
    for (let i = 0; i < size; i++) {
      this.sparks.push(new Spark(x, y));
    }
  }

  draw(ctx, stageWidth, stageHeight) {
    this.sparks.forEach((spark, i) => {
      if (spark.y > stageHeight) this.sparks.splice(i, 1);

      spark.animate(stageWidth);
      spark.draw(ctx);
    });
  }
}

class Spark {
  constructor(x, y) {
    this.velocity = { x: negativeRandom(.2, 6), y: negativeRandom(.5, 8) };

    this.x = x;
    this.y = y;

    this.colors = ['#F263C0', '#F2AEE0', '#303473', '#F2BA52', '#F28D35'];
    this.color = this.colors[Math.round(Math.random() * this.colors.length - 1)];

    this.lastPoint = { x: this.x, y: this.y };
  }

  windowBounce(stageWidth) {
    if (this.x < 0 || this.x > stageWidth) {
      this.velocity.x *= -0.5;
      this.x += this.velocity.x;
    }
  }

  animate(stageWidth, stageHeight) {
    this.lastPoint.x = this.x;
    this.lastPoint.y = this.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.windowBounce(stageWidth, stageHeight);

    this.velocity.y += .08;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}