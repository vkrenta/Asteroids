import { ONE_DEGREE, isCirclesCollide } from './helpers/index.js';

export default class Entity {
  constructor({
    x,
    y,
    hitRadius,
    source,
    width,
    height,
    dx,
    dy,
    angle,
    velocity,
    lives = 1,
    untouchable = false
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hitRadius = hitRadius;
    this.image = new Image();
    this.image.src = source;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
    this.velocity = velocity;
    this.lives = lives;
    this.untouchable = untouchable;
  }

  setSpawnPoint(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx, sx, sy) {
    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate((this.angle + 90) * ONE_DEGREE);
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);
    ctx.drawImage(
      this.image,
      sx,
      sy,
      this.width,
      this.height,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate(-((this.angle + 90) * ONE_DEGREE));
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);
  }

  _onCollide(collider) {}

  isCollide(entity) {
    const result = isCirclesCollide(
      this.x,
      entity.x,
      this.y,
      entity.y,
      this.hitRadius,
      entity.hitRadius
    );

    if (!this.untouchable && result) {
      this.lives--;
      this.untouchable = true;
      entity._onCollide(this);
    }
  }
}
