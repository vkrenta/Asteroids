import Entity from './Entity.js';

export default class Ship extends Entity {
  constructor() {
    super({
      x: 300,
      y: 300,
      hitRadius: 50,
      source: 'images/spaceship.png',
      width: 40,
      height: 40
    });
    this.deg = 0;
  }

  render(ctx) {
    // ctx.rotate((3.14 * 40) / 180);
    // ctx.drawImage(this.image, 40, 0, 40, 40, this.x, this.y, 40, 40);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    //this.deg++;

    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate((3.14 * this.deg) / 180);
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);

    super.render(ctx, 40, 0);

    ctx.transform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate(-(3.14 * this.deg) / 180);
    ctx.transform(1, 0, 0, 1, -this.x, -this.y);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
