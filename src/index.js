import Ship from './Ship.js';

export default class Game {
  constructor() {
    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.prevUpdateTime = 0;
    this.height = 0;
    this.width = 0;

    this.background = new Image();
    this.ship = new Ship();

    this.init();
  }

  init() {
    window.addEventListener('resize', x => this.onResize());
    this.onResize();
    this.background.src = '/images/background.jpg';
    requestAnimationFrame(time => this.update(time));
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update(time) {
    const dt = time - this.prevUpdateTime;
    this.prevUpdateTime = time;
    // console.log('update!');
    this.render();

    requestAnimationFrame(time => this.update(time));
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.background, 0, 0);
    this.ship.render(this.ctx);
  }
}

new Game();
