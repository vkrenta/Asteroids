export const ONE_DEGREE = Math.PI / 180;

export const SIDE = { left: -1, right: +1, none: 0 };

export const KEY = {
  left: [37, 65],
  right: [39, 68],
  up: [38, 87],
  space: [32],
  enter: [13],
  r: [82],
};

export const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const randomBetween = (num1, num2) => random(num2 - num1) + num1;

export const isCirclesCollide = (x1, x2, y1, y2, r1, r2) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 + r2;
};

export const random = (num) => Math.random() * num;
