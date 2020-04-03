import Rock from './Rock.js';
import { ONE_DEGREE } from './helpers/index.js';

export default class Shard extends Rock {
  constructor(x, y) {
    super(x, y);
    this.hitRadius = 15;
    this.image = new Image();
    this.source = '/images/rock_small.png';
    this.image.src = this.source;
  }
}
