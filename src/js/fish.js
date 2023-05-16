import { Actor, Vector, Input } from "excalibur";
import { Resources } from './resources.js';

export class Fish extends Actor {
  constructor() {
    super();
    this.graphics.use(Resources.Fish.toSprite());
    this.pos = new Vector(Math.random() * (innerWidth - 100), Math.random() * (innerHeight - 100));
    this.vel = new Vector(0, 0);
    this.pointer.useGraphicsBounds = true;
    this.enableCapturePointer = true;

    this.on("pointerup", (event) => {
      this.kill();
    });
  }

  onInitialize() {
    const keyboard = this.scene.input.keyboard;

    keyboard.on('hold', (evt) => {
      if (evt.key === Input.Keys.A) {
        this.pos.x -= 5;
      } else if (evt.key === Input.Keys.D) {
        this.pos.x += 5;
      } else if (evt.key === Input.Keys.W) {
        this.pos.y -= 5;
      } else if (evt.key === Input.Keys.S) {
        this.pos.y += 5;
      }
    });
  }

  update(engine, delta) {
    super.update(engine, delta);

    if (this.pos.x + this.width < 0) {
      this.pos.x = innerWidth;
    }
  }
}
