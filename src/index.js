import Ship from './Ship.js';
import { SIDE, KEY, randomElement } from './helpers/index.js';
import Rock from './Rock.js';
import Bullet from './Bullet.js';
import Shard from './Shard.js';
import { backGround } from './helpers/images.js';
import Explosion from './Explosion.js';

export default class Game {
  constructor() {
    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.prevUpdateTime = 0;
    this.height = 0;
    this.width = 0;

    this.background = backGround;
    this.isGame = true;
    this.isPaused = true;
    this.points = 0;

    this.ship = new Ship();
    this.rocks = [];
    this.bullets = [];
    this.explosions = [];
    this.shardInterval = 2000;
    this.rockInterval = 3000;
    this.init();
  }

  restart() {
    this.isGame = true;
    this.ship = new Ship();
    this.ship.respawn(this.width / 2, this.height / 2);
    this.rocks = [];
    this.bullets = [];
    this.shardInterval = 2000;
    this.rockInterval = 3000;
    this.points = 0;
  }

  init() {
    window.addEventListener('resize', (x) => this.onResize());
    this.onResize();
    this.ship.respawn(this.width / 2, this.height / 2);
    requestAnimationFrame((time) => this.update(time));
    window.addEventListener('keydown', (event) =>
      this.onKeyDown(event.keyCode)
    );
    window.addEventListener('keyup', (event) => this.onKeyUp(event.keyCode));
    setTimeout(() => this.spawnShards(), this.shardInterval);
    setTimeout(() => this.spawnRocks(), this.rockInterval);
    window.addEventListener('life-lost', () => this.onLifeLost());
    window.addEventListener('death', () => this.onDie());
    window.addEventListener('rock', () => (this.points += 3));
    window.addEventListener('shard', () => (this.points += 1));
  }

  onDie() {
    this.isGame = false;
  }

  onLifeLost() {
    this.explosions.push(new Explosion(this.ship.x, this.ship.y));
    this.ship.respawn(this.width / 2, this.height / 2);
  }

  spawnRocks() {
    if (!this.isPaused) {
      this.rocks.push(
        new Rock(
          randomElement([0, this.width]),
          randomElement([0, this.height])
        )
      );
      this.rockInterval *= 0.9999;
    }
    setTimeout(() => this.spawnRocks(), this.rockInterval);
  }

  spawnShards() {
    if (!this.isPaused) {
      this.rocks.push(
        new Shard(
          randomElement([0, this.width]),
          randomElement([0, this.height])
        )
      );
      this.shardInterval *= 0.9999;
    }
    setTimeout(() => this.spawnShards(), this.shardInterval);
    // console.log(this.shardInterval);
  }

  onKeyUp(keyCode) {
    if (KEY.up.includes(keyCode)) this.ship.setTrust(false);
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.none);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.none);
    if (KEY.space.includes(keyCode)) this.ship.setShooting(false);
    // console.log(keyCode);
  }

  onKeyDown(keyCode) {
    if (KEY.left.includes(keyCode)) this.ship.setRotation(SIDE.left);
    if (KEY.right.includes(keyCode)) this.ship.setRotation(SIDE.right);
    if (KEY.up.includes(keyCode)) this.ship.setTrust(true);
    if (KEY.space.includes(keyCode)) this.ship.setShooting(true);
    if (KEY.enter.includes(keyCode) && this.isGame)
      this.isPaused = !this.isPaused;
    if (KEY.enter.includes(keyCode) && !this.isGame) this.restart();
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

    this.render(dt);
    if (this.isGame && !this.isPaused) this.move(dt);

    requestAnimationFrame((time) => this.update(time));
  }

  move(dt) {
    this.ship.move(dt, this.width, this.height);
    this.ship.rotate();
    if (this.ship.isShooting && this.ship.isReady) {
      this.ship.shoot();
      this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
    }

    this.rocks.forEach((rock) => {
      rock.move(dt, this.width, this.height);
      rock.isCollide(this.ship);
      this.bullets.forEach((bullet) => rock.isCollide(bullet));
      if (rock.dead) {
        this.explosions.push(new Explosion(rock.x, rock.y));
        if (rock.constructor.name === 'Rock') {
          rock.setSharding(true);
          this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 30));
          this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 150));
          this.rocks.push(new Shard(rock.x, rock.y, rock.angle - 270));
        }
      }
    });
    this.explosions = this.explosions.filter((explosion) => !explosion.dead);
    this.rocks = this.rocks.filter((rock) => !rock.dead);

    this.bullets.forEach((bullet) => {
      bullet.move(dt, this.width, this.height);
    });
    this.bullets = this.bullets.filter((e) => !e.outOfBound);
  }

  render(dt) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.background, 0, 0);
    this.ship.render(this.ctx, dt);
    this.rocks.forEach((rock) => rock.render(this.ctx, dt));
    this.bullets.forEach((bullet) => bullet.render(this.ctx, dt));
    this.explosions.forEach((explosion) => explosion.render(this.ctx, dt));

    this.ctx.font = '40px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`L: ${this.ship.lives}`, 10, 50);
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`${this.points}`, this.width - 10, 50);
    this.ctx.textAlign = 'center';
    this.ctx.font = '70px Arial';
    if (this.isPaused)
      this.ctx.fillText(
        'Game is paused, press Enter to continue',
        this.width / 2,
        this.height / 2
      );

    if (!this.isGame)
      this.ctx.fillText(
        'Game is over, press Enter to restart',
        this.width / 2,
        this.height / 2
      );
  }
}

// eslint-disable-next-line no-new
new Game();
