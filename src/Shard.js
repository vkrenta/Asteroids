import Rock from './Rock.js';
import { random } from './helpers/index.js';
import { shard } from './helpers/images.js';

export default class Shard extends Rock {
  constructor(x, y, angle = random(361), maxVelocity = 0.02) {
    super(x, y, maxVelocity);
    this.hitRadius = 15;
    this.image = shard;
    this.angle = angle;
    this.lives = 1;
  }

  setAngle(angle) {
    this.angle = angle;
  }
}
