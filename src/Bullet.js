import Entity from './Entity.js';
import { ONE_DEGREE } from './helpers/index.js';
import Animation from './Animation.js';
import { bullet } from './helpers/images.js';

export default class Bullet extends Entity {
  constructor(x, y, angle) {
    super({
      x,
      y,
      angle,
      dx: 0,
      dy: 0,
      image: bullet,
      width: 32,
      height: 64,
      hitRadius: 20,
      lives: 1
    });
    this.animation = new Animation({
      frames: 16,
      width: 32,
      height: 64,
      delay: 10
    });
    this.outOfBound = false;
    this.onRock = new Event('rock');
    this.onShard = new Event('shard');
  }

  _onCollide(collider) {
    if (collider.constructor.name === 'Rock') dispatchEvent(this.onRock);
    if (collider.constructor.name === 'Shard') dispatchEvent(this.onShard);
  }

  move(dt, bWidth, bHeight) {
    this.dx = Math.cos(this.angle * ONE_DEGREE) * 0.5 * dt;
    this.dy = Math.sin(this.angle * ONE_DEGREE) * 0.5 * dt;

    this.x += this.dx;
    this.y += this.dy;

    if (
      !this.lives ||
      this.x > bWidth ||
      this.y > bHeight ||
      this.x < 0 ||
      this.y < 0
    )
      this.outOfBound = true;
  }

  render(ctx) {
    super.render(ctx, this.animation.getByX(), 0);
  }
}
