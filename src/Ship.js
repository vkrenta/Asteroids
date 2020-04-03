import Entity from './Entity.js';
import { ONE_DEGREE, SIDE } from './helpers/index.js';
import Animation from './Animation.js';
import { ship, explosion } from './helpers/images.js';

export default class Ship extends Entity {
  constructor() {
    super({
      x: 0,
      y: 0,
      hitRadius: 18,
      image: ship,
      width: 40,
      height: 40,
      dx: 0,
      dy: 0,
      angle: -90,
      velocity: 0,
      untouchable: false,
      lives: 3
    });
    this.rotationSpeed = 0;
    this.isTrust = false;
    this.maxVelocity = 0.7;
    this.rotationSide = SIDE.none;
    this.isReady = true;
    this.time = Date.now();
    this.coolDown = 200;
    this.isShooting = false;
    this.invulnerabilityDelay = 1000;
    this.onLifeLost = new Event('life-lost');
    this.onDeath = new Event('death');

    this.explosion = explosion;
    this.explodeAnimation = new Animation({
      frames: 20,
      width: 50,
      delay: 60
    });
    this.dead = false;
  }

  _onCollide(collider) {
    if (
      (collider.constructor.name === 'Rock' ||
        collider.constructor.name === 'Shard') &&
      !this.untouchable
    ) {
      this.lives--;
      if (!this.lives) return dispatchEvent(this.onDeath);
      dispatchEvent(this.onLifeLost);
      this.untouchable = true;
      setInterval(() => (this.untouchable = false), this.invulnerabilityDelay);
    }
  }

  respawn() {
    this.dx = 0;
    this.dy = 0;
    this.angle = -90;
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
    if (!this.lives) return;

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
    if (this.lives) return super.render(ctx, 40, 0);

    this.image = this.explosion;
    this.width = 50;
    this.height = 50;

    super.render(ctx, this.explodeAnimation.getByX(), 0);
  }
}
