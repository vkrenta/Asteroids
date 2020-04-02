import Entity from './Entity.js';
import { ONE_DEGREE } from './helpers/index.js';
import Animation from './Animation.js';

export default class Bullet extends Entity {
  constructor(x, y, angle) {
    super({
      x,
      y,
      angle,
      dx: Math.cos(angle * ONE_DEGREE),
      dy: Math.sin(angle * ONE_DEGREE),
      source: '/images/fire_red.png',
      width: 32,
      height: 64,
      hitRadius: 40
    });
    this.animation = new Animation({
      frames: 16,
      width: 32,
      height: 64,
      delay: 10
    });
    this.outOfBound = false;
    this.dx *= 5;
    this.dy *= 5;
  }

  move(dt, bWidth, bHeight) {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x > bWidth) this.outOfBound = true;
    if (this.y > bHeight) this.outOfBound = true;
    if (this.x < 0) this.outOfBound = true;
    if (this.y < 0) this.outOfBound = true;
  }

  render(ctx) {
    super.render(ctx, this.animation.getByX(), 0);
  }
}
