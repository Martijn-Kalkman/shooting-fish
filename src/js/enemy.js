import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Enemy extends Actor {
  constructor() {
    super();
    this.graphics.use(Resources.Enemy.toSprite());
    this.pos = new Vector(Math.random() * (innerWidth - 100), Math.random() * (innerHeight - 100));
    this.vel = new Vector(0, 0);
    this.enableCapturePointer = true;

    this.on("pointerup", (event) => {
      this.kill();
    });
  }

  update(engine, delta) {
    super.update(engine, delta);

    if (this.pos.x + this.width < 0) {
      this.pos.x = innerWidth;
    }
  }
}