import Rock from './Rock.js';
import { random } from './helpers/index.js';

export default class Shard extends Rock {
  constructor(x, y, angle = random(361)) {
    super(x, y);
    this.hitRadius = 15;
    this.image = new Image();
    this.source = '/images/rock_small.png';
    this.image.src = this.source;
    this.angle = angle;
  }

  setAngle(angle) {
    this.angle = angle;
  }
}
