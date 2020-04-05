export default class Animation {
  constructor({ frames, width, height, delay }) {
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.current = 0;
    this.delay = delay;
  }

  get timeToRefresh() {
    return this._timeToRefresh;
  }

  set timeToRefresh(value) {
    if (value > 0) {
      this.result = this.current * this.width;
      return (this._timeToRefresh = value);
    }
    this.result = this.current++ * this.width;
    this._timeToRefresh = value + this.delay;
  }

  getByX(dt) {
    this.timeToRefresh -= dt;
    if (this.current === this.frames) this.current = 0;
    return this.result;
  }
}
