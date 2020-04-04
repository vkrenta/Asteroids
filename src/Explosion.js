import Entity from './Entity.js';
import { explosion } from './helpers/images.js';
import Animation from './Animation.js';

export default class Explosion extends Entity {
  constructor(x, y) {
    super({
      x,
      y,
      width: 50,
      height: 50,
      image: explosion,
    });
    this.animation = new Animation({
      frames: 20,
      width: 50,
      delay: 60,
    });
    this.dead = false;
  }

  render(ctx, dt) {
    super.render(ctx, this.animation.getByX(dt), 0);
    if (this.animation.current + 1 === this.animation.frames) this.dead = true;
  }
}
