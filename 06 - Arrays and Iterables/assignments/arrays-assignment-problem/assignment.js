// Task 1
// Create an array of numbers
const numbers = [2, 4, 6, 8, 10];

// Filter for the numbers greater than 5
const filteredNumbers = numbers.filter((value) => value > 5);
console.log(filteredNumbers);

// Map every number to an object which holds the number o some property
const mappedNumbers = numbers.map((value) => ({ num: value }));
console.log(mappedNumbers);

// Reduce the array to a single number
const product = numbers.reduce(
  (prevValue, curValue) => prevValue * curValue,
  1
);
console.log(product);

// Task 2
const findMax = (...args) => {
  let maxValue = args[0];
  for (const arg of args) {
    if (arg > maxValue) {
      maxValue = arg;
    }
  }
  return maxValue;
};
console.log(findMax(...numbers));

// Task 3
const findMinMax = (...args) => {
  let maxValue = args[0];
  let minValue = args[0];
  for (const arg of args) {
    if (arg > maxValue) {
      maxValue = arg;
    }
    if (arg < minValue) {
      minValue = arg;
    }
  }
  return [minValue, maxValue];
};
[minNumber, maxNumber] = findMinMax(...numbers);
console.log(minNumber, maxNumber);

// Task 4
let list = new Set([1, 2, 3]);
list.add(2);
console.log(list);
