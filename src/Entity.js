export default class Entity {
  constructor({ x, y, hitRadius, source, width, height, dx, dy }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hitRadius = hitRadius;
    this.image = new Image();
    this.image.src = source;
    this.dx = dx;
    this.dy = dy;
  }

  render(ctx, sx, sy) {
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
  }
}
