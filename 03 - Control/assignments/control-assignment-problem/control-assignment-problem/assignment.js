const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

// Task #1
if (randomNumber > 0.7) {
  alert("randomNumber is greater than 0.7");
}

// Task #2
let numbers = [2, 7, 3, 8, 1];

for (const n of numbers) {
  console.log(n);
}

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Task #3
for (let i = numbers.length; i > 0; i--) {
  console.log(numbers[i - 1]);
}

// Task #4
const anotherRandomNumber = Math.random();
if (
  randomNumber > 0.7 && anotherRandomNumber > 0.7 ||
  randomNumber <= 0.2 ||
  anotherRandomNumber <= 0.2
) {
  alert("One of the conditions is true");
}

console.log(`randomNumber: ${randomNumber}; anotherRandomNumber: ${anotherRandomNumber}`);