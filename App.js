import { mobileChk, relMousePos, getDistance } from './asset/js/util.js';
import { buttonStyling } from "./asset/js/button.js";
import { Particle } from "./asset/js/particle.js";
import { Ball } from "./asset/js/fireworks/ball.js";
import { Explode } from "./asset/js/fireworks/explode.js";

const mobile = mobileChk();

class App {
  constructor() {
    const btn = document.querySelector('button');
    buttonStyling(btn);

    // canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    // resize
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    // particles
    this.particles = [];
    const moveHandler = evt => {
      let { x, y } = relMousePos(this.canvas, evt);

      if (mobile) {
        x = evt.targetTouches[0].clientX;
        y = evt.targetTouches[0].clientY;
      }

      this.particles.push(new Particle(x, y));
    }
    if (mobile) {
      window.addEventListener('touchmove', moveHandler, false);
    }
    else if (!mobile) {
      window.addEventListener('mousemove', moveHandler, false);
    }

    // fireworks
    this.fireworks = {
      elements: [],
      colors: ['#F263C0', '#F2AEE0', '#303473', '#F2BA52', '#F28D35']
    }
    this.explodes = [];

    btn.addEventListener('click', () => {
      for (let i = 0; i < 10; i++) {
        this.fireworks.elements.push(new Ball(this.stageWidth, this.stageHeight, this.fireworks.colors[Math.round(Math.random() * this.fireworks.colors.length - 1)]));
      }
    }, false);

    // animate
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // particles line
    const distance = 100;
    for (let i = 0; i < this.particles.length; i++) {
      const cur = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const tar = this.particles[j];

        if (getDistance(cur.x, cur.y, tar.x, tar.y) < distance) {
          this.ctx.beginPath();
          this.ctx.moveTo(cur.x, cur.y);
          this.ctx.lineTo(tar.x, tar.y);
          this.ctx.closePath();
          this.ctx.lineWidth = 1;
          this.ctx.strokeStyle = '#FFF';
          this.ctx.stroke();
        }
      }
    }

    // particles
    this.particles.forEach((particle, i) => {
      if (particle.x < 0 || particle.x > this.stageWidth || particle.y < 0 || particle.y > this.stageHeight) this.particles.splice(i, 1);
      if (particle.radius < .5) this.particles.splice(i, 1);

      particle.animate();
      particle.draw(this.ctx);
    });

    /**
     * fireworks
     */
    if (this.fireworks.elements.length < 2) this.fireworks.elements.push(new Ball(this.stageWidth, this.stageHeight, this.fireworks.colors[Math.round(Math.random() * this.fireworks.colors.length - 1)]));

    this.fireworks.elements.forEach((firework, i) => {
      if ((firework.x < 0 || firework.x > this.stageWidth || firework.y < 0 || firework.y > this.stageHeight) || (Math.abs(firework.velocity.x) < .5 && Math.abs(firework.velocity.y) < .5)) {
        this.explodes.push(new Explode(firework.x, firework.y, (Math.random() * 100) + 60));
        this.fireworks.elements.splice(i, 1);
      }

      firework.animate();
      firework.draw(this.ctx);
    });

    // Explode
    this.explodes.forEach((explode, i) => {
      if (explode.sparks.length === 0) this.explodes.splice(i, 1);
      explode.draw(this.ctx, this.stageWidth, this.stageHeight);
    });
  }
}

window.onload = () => { new App() }