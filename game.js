import '../css/style.css';
import { Actor, Engine, Vector, Input, Color } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

export class Fish extends Actor {
  constructor() {
    super();
    this.graphics.use(Resources.Fish.toSprite());
    this.pos = new Vector(Math.random() * (window.innerWidth - 100), Math.random() * (window.innerHeight - 100));
    this.vel = new Vector(0, 0);
    this.pointer.useGraphicsBounds = true;
    this.enableCapturePointer = true;

    this.on('pointerup', (event) => {
      this.kill();
    });
  }

  update(engine, delta) {
    super.update(engine, delta);

    if (this.pos.x < 0) {
      this.pos.x = 0;
    } else if (this.pos.x + this.width > engine.drawWidth) {
      this.pos.x = engine.drawWidth - this.width;
    }
  }

  shootProjectile() {
    const randomValue = Math.random();

    if (randomValue <= 0.02) {
      const projectile = new Projectile(this.pos.clone(), Color.Red, 30, 30);
      this.scene.add(projectile);
    } else {
      const projectile = new Projectile(this.pos.clone());
      this.scene.add(projectile);
    }
  }
}

export class Projectile extends Actor {
  constructor(position, color = Color.Black, width = 10, height = 10) {
    super({
      pos: position.clone(),
      width: width,
      height: height,
      color: color,
    });

    this.vel = new Vector(0, -300); // Adjust the vertical velocity as per your requirements
  }

  update(engine, delta) {
    super.update(engine, delta);

    if (this.pos.y < -300) { // Adjust the termination condition as per your requirements
      this.kill();
    }
  }
}

export class Game extends Engine {
  constructor() {
    super({ width: window.innerWidth, height: window.innerHeight });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    console.log('start the game!');

    if (!Resources.Fish.isLoaded()) {
      console.error('Fish resource is not loaded!');
      return;
    }

    this.input.keyboard.enabled = true;

    const fish = new Fish();
    this.add(fish);

    this.input.keyboard.on('hold', (evt) => {
      if (evt.key === Input.Keys.A) {
        fish.pos.x -= 10;
      } else if (evt.key === Input.Keys.D) {
        fish.pos.x += 10;
      }
    });

    this.input.keyboard.on('hold', (evt) => {
      if (evt.key === Input.Keys.W) {
        fish.shootProjectile();
      }
    });
  }
}

new Game();
