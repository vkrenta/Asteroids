export const ONE_DEGREE = Math.PI / 180;

export const SIDE = { left: -1, right: +1, none: 0 };

export const KEY = {
  left: [37, 65],
  right: [39, 68],
  up: [38, 87],
  space: [32]
};

export const isCirclesCollide = (x1, x2, y1, y2, r1, r2) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 + r2;
};

export const random = num => Math.random() * num;
