import Entity from './Entity.js';
import { ONE_DEGREE, SIDE } from './helpers/index.js';

export default class Ship extends Entity {
  constructor() {
    super({
      x: 0,
      y: 0,
      hitRadius: 35,
      source: 'images/spaceship.png',
      width: 40,
      height: 40,
      dx: 0,
      dy: 0,
      angle: -90,
      velocity: 0
    });
    this.rotationSpeed = 0;
    this.isTrust = false;
    this.maxVelocity = 1;
    this.rotationSide = SIDE.none;
  }

  setRotation(side) {
    this.rotationSide = side;
  }

  rotate() {
    this.angle += this.rotationSide * this.rotationSpeed;
  }

  setRotationSpeed(degrees) {
    this.rotationSpeed = degrees;
  }

  move(dt, bWidth, bHeight) {
    if (this.isTrust) {
      this.dx += Math.cos(this.angle * ONE_DEGREE) * 0.001 * dt;
      this.dy += Math.sin(this.angle * ONE_DEGREE) * 0.001 * dt;
    } else {
      this.dx *= 0.995;
      this.dy *= 0.995;
    }

    this.velocity = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    if (this.velocity > this.maxVelocity) {
      this.dx *= this.maxVelocity / this.velocity;
      this.dy *= this.maxVelocity / this.velocity;
    }
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    if (this.x > bWidth) this.x = 0;
    if (this.y > bHeight) this.y = 0;
    if (this.x < 0) this.x = bWidth;
    if (this.y < 0) this.y = bHeight;
  }

  setTrust(trust) {
    if (trust) return (this.isTrust = true);
    this.isTrust = false;
  }

  render(ctx) {
    super.render(ctx, 40, 0);
  }
}
