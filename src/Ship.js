import Entity from './Entity.js';
import { ONE_DEGREE, SIDE } from './helpers/index.js';

export default class Ship extends Entity {
  constructor() {
    super({
      x: 0,
      y: 0,
      hitRadius: 18,
      source: 'images/spaceship.png',
      width: 40,
      height: 40,
      dx: 0,
      dy: 0,
      angle: -90,
      velocity: 0,
      untouchable: false,
      lives: 1
    });
    this.rotationSpeed = 0;
    this.isTrust = false;
    this.maxVelocity = 0.7;
    this.rotationSide = SIDE.none;
    this.isReady = true;
    this.time = Date.now();
    this.coolDown = 200;
    this.isShooting = false;
  }

  setShooting(x) {
    this.isShooting = x;
  }

  setRotation(side) {
    this.rotationSide = side;
  }

  shoot() {
    this.isReady = false;
  }

  rotate() {
    this.angle += this.rotationSide * this.rotationSpeed;
  }

  setRotationSpeed(degrees) {
    this.rotationSpeed = degrees;
  }

  move(dt, bWidth, bHeight) {
    if (Date.now() - this.time >= this.coolDown) {
      this.time = Date.now();
      this.isReady = true;
    }

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
