import Entity from './Entity.js';
import { ONE_DEGREE, SIDE } from './helpers/index.js';
import { ship, explosion } from './helpers/images.js';
import Bullet from './Bullet.js';

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
      lives: 3,
    });
    this.rotationSpeed = 0;
    this.isTrust = false;
    this.maxVelocity = 0.05;
    this.rotationSide = SIDE.none;
    this.coolDown = 500;
    this.isShooting = false;
    this.invulnerabilityDelay = 1000;
    this.onLifeLost = new Event('life-lost');
    this.onDeath = new Event('death');
    this.untouchable = true;
    this.rechargingTime = 0;
    this.explosion = explosion;
    this.bullets = [];
  }

  set invulnerability(value) {
    if (value >= 0) return (this._invulnerability = value);
    this._invulnerability = 0;
    this.untouchable = false;
  }

  get invulnerability() {
    return this._invulnerability;
  }

  set rechargingTime(value) {
    if (value > 0) return (this._rechargingTime = value);
    if (this.isShooting) {
      this.bullets.push(new Bullet(this.x, this.y, this.angle));
      this._rechargingTime = value + this.coolDown;
    } else this._rechargingTime = 0;
  }

  get rechargingTime() {
    return this._rechargingTime;
  }

  get coolDown() {
    return this._coolDown;
  }

  set coolDown(value) {
    if (value >= 20) this._coolDown = value;
    else this.coolDown = 20;
  }

  respawn(x, y) {
    this.untouchable = true;
    this.invulnerability = this.invulnerabilityDelay;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.angle = -90;
  }

  rotate() {
    this.angle += this.rotationSide * this.rotationAngle;
  }

  move(dt, bWidth, bHeight) {
    this.dt = dt;
    this.invulnerability -= dt;
    this.rechargingTime -= dt;
    if (this.dead) return;

    this.rotationAngle = 0.3 * dt;

    if (this.isTrust) {
      this.dx += Math.cos(this.angle * ONE_DEGREE) * 0.001 * dt;
      this.dy += Math.sin(this.angle * ONE_DEGREE) * 0.001 * dt;
    } else {
      this.dx *= 0.995;
      this.dy *= 0.995;
    }

    super.move(dt);

    if (this.x > bWidth) this.x = 0;
    if (this.y > bHeight) this.y = 0;
    if (this.x < 0) this.x = bWidth;
    if (this.y < 0) this.y = bHeight;
  }

  setTrust(trust) {
    this.isTrust = trust;
  }

  render(ctx, dt) {
    if (this.dead) return;
    if (this.rotationSide === SIDE.none) super.render(ctx, 40, 0);
    if (this.rotationSide === SIDE.left) super.render(ctx, -1, 0);
    if (this.rotationSide === SIDE.right) super.render(ctx, 80, 0);
  }

  _onCollide(collider) {
    if (
      (collider.constructor.name === 'Rock' ||
        collider.constructor.name === 'Shard') &&
      !this.untouchable
    ) {
      this.lives--;
      if (this.dead) return dispatchEvent(this.onDeath);
      dispatchEvent(this.onLifeLost);
    }
  }
}
