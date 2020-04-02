import Entity from './Entity.js';
import Animation from './Animation.js';
import { random } from './helpers/index.js';

export default class Rock extends Entity {
  constructor() {
    super({
      x: 100,
      y: 100,
      hitRadius: 60,
      width: 64,
      height: 64,
      source: '/images/rock.png',
      dx: random(0.6) - 0.3,
      dy: random(0.6) - 0.3,
      angle: random(360),
      velocity: 0
    });
    this.animation = new Animation({
      frames: 16,
      width: 64,
      height: 64,
      delay: 60
    });
  }

  move(dt, bWidth, bHeight) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    if (this.x > bWidth) this.x = 0;
    if (this.y > bHeight) this.y = 0;
    if (this.x < 0) this.x = bWidth;
    if (this.y < 0) this.y = bHeight;
  }

  render(ctx) {
    super.render(ctx, this.animation.getByX(), 0);
  }
}
