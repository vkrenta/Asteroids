import Entity from './Entity.js';
import Animation from './Animation.js';
import { random } from './helpers/index.js';

export default class Rock extends Entity {
  constructor(x, y) {
    super({
      x,
      y,
      hitRadius: 31,
      width: 64,
      height: 64,
      source: '/images/rock.png',
      dx: random(0.4) - 0.2,
      dy: random(0.4) - 0.2,
      angle: random(360),
      velocity: 0,
      lives: 1,
      untouchable: false
    });
    this.animation = new Animation({
      frames: 16,
      width: 64,
      height: 64,
      delay: 60
    });
    this.explosion = new Image();
    this.explosion.src = '/images/explosions/type_A.png';
    this.explodeAnimation = new Animation({
      frames: 20,
      width: 50,
      delay: 60
    });
    this.dead = false;
  }

  move(dt, bWidth, bHeight) {
    if (this.lives) {
      this.x += this.dx * dt;
      this.y += this.dy * dt;

      if (this.x > bWidth) this.x = 0;
      if (this.y > bHeight) this.y = 0;
      if (this.x < 0) this.x = bWidth;
      if (this.y < 0) this.y = bHeight;
    }
  }

  render(ctx) {
    if (this.lives) return super.render(ctx, this.animation.getByX(), 0);
    // super.render(ctx, this.explodeAnimation.getByX(), 0);
    this.image = this.explosion;
    this.width = 50;

    super.render(ctx, this.explodeAnimation.getByX(), 0);
    if (this.explodeAnimation.current + 1 === this.explodeAnimation.frames)
      this.dead = true;
  }
}
