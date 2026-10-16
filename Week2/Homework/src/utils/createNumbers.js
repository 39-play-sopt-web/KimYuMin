import random from "./random";

export default function createNumbers(start, end) {
  const numbers = [];

  for (let number = start; number <= end; number++) {
    numbers.push(number);
  }

  return random(numbers);
}
