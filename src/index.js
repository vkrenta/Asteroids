import Ship from './Ship.js';
import { SIDE, KEY } from './helpers/index.js';

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
    window.addEventListener('keydown', event => this.onKeyDown(event.keyCode));
    window.addEventListener('keyup', event => this.onKeyUp(event.keyCode));
  }

  onKeyUp(keyCode) {
    if (KEY.up.includes(keyCode)) this.ship.setTrust(false);
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.none);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.none);
    //console.log(keyCode);
  }

  onKeyDown(keyCode) {
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.left);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.right);
    if (KEY.up.includes(keyCode)) this.ship.setTrust(true);
    // console.log(keyCode);
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
    //console.clear();
    this.render();
    this.ship.setRotationSpeed(0.3 * dt);
    this.ship.move(dt, this.width, this.height);
    this.ship.rotate();
    //console.log(this.ship.x, this.ship.y);
    //console.log(this.ship.dx, this.ship.dy);

    requestAnimationFrame(time => this.update(time));
  }

  render() {
    this.ctx.drawImage(this.background, 0, 0);
    this.ship.render(this.ctx);
  }
}

new Game();
