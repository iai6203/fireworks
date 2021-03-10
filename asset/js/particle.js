import { negativeRandom } from "./util.js";

export class Particle {
  constructor(x, y) {
    this.velocity = { x:  negativeRandom(.5, 2), y: negativeRandom(.5, 2) }

    this.x = x;
    this.y = y;
    this.radius = (Math.random() * 5) + 3;
    this.color = '#FFF';
  }

  animate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.radius -= .05;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}