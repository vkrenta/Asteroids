export default class Animation {
  constructor({ frames, width, height, delay }) {
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.current = 0;
    this.time = Date.now();
    this.delay = delay;
  }

  getByX() {
    if (this.current === this.frames) this.current = 0;
    if (Date.now() - this.time < this.delay) return this.current * this.width;
    this.time = Date.now();
    return this.current++ * this.width;
  }
}
