import Entity from './Entity.js';
import { ONE_DEGREE, SIDE } from './helpers/index.js';

export default class Ship extends Entity {
  constructor() {
    super({
      x: 300,
      y: 300,
      hitRadius: 50,
      source: 'images/spaceship.png',
      width: 40,
      height: 40,
      dx: 0,
      dy: 0
    });
    this.angle = 0;
    this.rotationSpeed = 0;
    this.isTrust = false;
    this.acceleration = 0.001;
    this.velocity = 0;
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
      this.velocity += this.acceleration * dt;
      if (this.velocity >= this.maxVelocity) this.velocity = this.maxVelocity;
    } else {
      this.velocity -= this.acceleration * dt;
      if (this.velocity <= 0) this.velocity = 0;
    }

    this.dx = Math.cos((this.angle - 90) * ONE_DEGREE) * this.velocity * dt;
    this.dy = Math.sin((this.angle - 90) * ONE_DEGREE) * this.velocity * dt;

    this.x += this.dx;
    this.y += this.dy;

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
    // ctx.rotate((3.14 * 40) / 180);
    // ctx.drawImage(this.image, 40, 0, 40, 40, this.x, this.y, 40, 40);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.angle++;

    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate(this.angle * ONE_DEGREE);
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);

    super.render(ctx, 40, 0);

    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate(-(this.angle * ONE_DEGREE));
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);
  }
}
