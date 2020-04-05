import Entity from './Entity.js';
import Animation from './Animation.js';
import { random, ONE_DEGREE } from './helpers/index.js';
import { rock } from './helpers/images.js';

export default class Rock extends Entity {
  constructor(x, y, maxVelocity = 0.01) {
    super({
      x,
      y,
      hitRadius: 31,
      width: 64,
      height: 64,
      image: rock,
      dx: 0,
      dy: 0,
      angle: random(361),
      lives: 3,
      untouchable: false,
    });
    this.animation = new Animation({
      frames: 16,
      width: 64,
      delay: 60,
    });
    this.dead = false;
    this.maxVelocity = maxVelocity;
    this.velocity = random(this.maxVelocity);
  }

  move(dt, bWidth, bHeight) {
    const k = this.velocity * dt;
    this.dx = Math.cos(this.angle * ONE_DEGREE) * k;
    this.dy = Math.sin(this.angle * ONE_DEGREE) * k;

    super.move(dt);

    if (this.x > bWidth) this.x = 0;
    if (this.y > bHeight) this.y = 0;
    if (this.x < 0) this.x = bWidth;
    if (this.y < 0) this.y = bHeight;
  }

  render(ctx, dt) {
    super.render(ctx, this.animation.getByX(dt), 0);
  }
}
