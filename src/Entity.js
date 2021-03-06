import { ONE_DEGREE, isCirclesCollide } from './helpers/index.js';

export default class Entity {
  constructor({
    x,
    y,
    hitRadius,
    image,
    width,
    height,
    dx,
    dy,
    angle,
    velocity,
    lives = 1,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hitRadius = hitRadius;
    this.image = image;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
    this.velocity = velocity;
    this.lives = lives;
    this.dead = false;
  }

  set lives(value) {
    if (value > 0) return (this._lives = value);
    this._lives = 0;
    this.dead = true;
  }

  get lives() {
    return this._lives;
  }

  set velocity(value) {
    if (value <= this.maxVelocity) return (this._velocity = value);
    this._velocity = this.maxVelocity;
    this.dx *= this.maxVelocity / value;
    this.dy *= this.maxVelocity / value;
  }

  get velocity() {
    return this._velocity;
  }

  setSpawnPoint(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dt) {
    this.velocity = Math.sqrt(this.dx ** 2 + this.dy ** 2) / dt;

    this.x += this.dx * dt;
    this.y += this.dy * dt;
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

    if (result) {
      this.lives--;
      entity._onCollide(this);
    }
  }
}
