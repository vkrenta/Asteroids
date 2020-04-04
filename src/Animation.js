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
    if (value >= 0) return (this._timeToRefresh = value);
    this._timeToRefresh = 0;
    this.ready = true;
  }

  getByX(dt) {
    this.timeToRefresh -= dt;
    if (this.current === this.frames) this.current = 0;
    if (this.ready) {
      this.ready = false;
      this.timeToRefresh = this.delay;
      return this.current * this.width;
    }
    return this.current++ * this.width;
  }
}
