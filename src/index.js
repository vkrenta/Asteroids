import Ship from './Ship.js';
import { SIDE, KEY, random, randomElement } from './helpers/index.js';
import Rock from './Rock.js';
import Bullet from './Bullet.js';
import Shard from './Shard.js';

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
    this.bullets = [];
    this.shardInterval = 2000;
    this.rockInterval = 3000;
    this.init();
  }

  init() {
    window.addEventListener('resize', x => this.onResize());
    this.onResize();
    this.background.src = '/images/background.jpg';
    this.ship.setSpawnPoint(this.width / 2, this.height / 2);
    requestAnimationFrame(time => this.update(time));
    window.addEventListener('keydown', event => this.onKeyDown(event.keyCode));
    window.addEventListener('keyup', event => this.onKeyUp(event.keyCode));
    setTimeout(() => this.spawnShards(), this.shardInterval);
    setTimeout(() => this.spawnRocks(), this.rockInterval);
  }

  spawnRocks() {
    this.rocks.push(
      new Rock(randomElement([0, this.width]), randomElement([0, this.height]))
    );
    this.rockInterval *= 0.9999;
    setTimeout(() => this.spawnRocks(), this.rockInterval);
  }

  spawnShards() {
    this.rocks.push(
      new Shard(randomElement([0, this.width]), randomElement([0, this.height]))
    );
    this.shardInterval *= 0.9999;
    console.log(this.shardInterval);
    setTimeout(() => this.spawnShards(), this.shardInterval);
  }

  onKeyUp(keyCode) {
    if (KEY.up.includes(keyCode)) this.ship.setTrust(false);
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.none);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.none);
    if (KEY.space.includes(keyCode)) this.ship.setShooting(false);
    //console.log(keyCode);
  }

  onKeyDown(keyCode) {
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.left);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.right);
    if (KEY.up.includes(keyCode)) this.ship.setTrust(true);
    if (KEY.space.includes(keyCode)) this.ship.setShooting(true);
    // console.log(this.bullets);
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

    this.render();
    this.move(dt);

    requestAnimationFrame(time => this.update(time));
  }

  move(dt) {
    this.ship.setRotationSpeed(0.3 * dt);
    this.ship.move(dt, this.width, this.height);
    this.ship.rotate();
    if (this.ship.isShooting && this.ship.isReady) {
      this.ship.shoot();
      this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
    }

    this.rocks.forEach(rock => {
      rock.move(dt, this.width, this.height);
      rock.isCollide(this.ship);
      this.bullets.forEach(bullet => rock.isCollide(bullet));
      if (rock.constructor.name === 'Rock' && !rock.isSharding && !rock.lives) {
        rock.setSharding(true);
        this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 30));
        this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 150));
        this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 270));
      }
    });
    this.rocks = this.rocks.filter(rock => !rock.dead);

    this.bullets.forEach(bullet => {
      bullet.move(dt, this.width, this.height);
    });
    this.bullets = this.bullets.filter(e => !e.outOfBound);
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.background, 0, 0);
    this.ship.render(this.ctx);
    this.rocks.forEach(rock => rock.render(this.ctx));
    this.bullets.forEach(bullet => bullet.render(this.ctx));
  }
}

new Game();
