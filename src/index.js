import Ship from './Ship.js';
import { SIDE, KEY, random } from './helpers/index.js';
import Rock from './Rock.js';
import Bullet from './Bullet.js';

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
    this.rocks = [];
    for (let i = 0; i <= random(30); i++) this.rocks.push(new Rock());

    this.bullets = [];
    this.init();
  }

  init() {
    window.addEventListener('resize', x => this.onResize());
    this.onResize();
    this.background.src = '/images/background.jpg';
    this.ship.setSpawnPoint(this.width / 2, this.height / 2);
    this.rocks.forEach(rock => rock.setSpawnPoint(random(this.width), 0));
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
    if (KEY.space.includes(keyCode))
      this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
    console.log(this.bullets);
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
    this.rocks.forEach(rock => rock.move(dt, this.width, this.height));
    this.bullets.forEach(bullet => {
      bullet.move(dt, this.width, this.height);
    });
    this.bullets = this.bullets.filter(e => !e.outOfBound);
    //console.log(this.ship.x, this.ship.y);
    //console.log(this.ship.dx, this.ship.dy);

    requestAnimationFrame(time => this.update(time));
  }

  render() {
    this.ctx.drawImage(this.background, 0, 0);
    this.ship.render(this.ctx);
    this.rocks.forEach(rock => rock.render(this.ctx));
    this.bullets.forEach(bullet => bullet.render(this.ctx));
  }
}

new Game();
