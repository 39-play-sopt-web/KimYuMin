export default function createRandomNumbers(start, end) {
  const numbers = [];

  for (let number = start; number <= end; number++) {
    numbers.push(number);
  }

  return shuffle(numbers);
}

function shuffle(numbers) {
  const result = [...numbers];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}
