const OPERATION_ADD = "ADD";
const OPERATION_SUBTRACT = "SUBTRACT";
const OPERATION_MULTIPLY = "MULTIPLY";
const OPERATION_DIVIDE = "DIVIDE";

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets int from input field
function getUserInput() {
  return parseInt(userInput.value);
}

// Generates and writes calculation description
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

// Creates log entry and adds it to log
function writeToLog(operation, previousResult, number, newResult) {
  let logEntry = {
    operation: operation,
    previousResult: previousResult,
    number: number,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

// Executes operation on currentResult and calls output and logging functions
function calculate(operation) {
  const enteredNumber = getUserInput();
  const initialResult = currentResult;
  let operator;
  switch (operation) {
    case OPERATION_ADD:
      currentResult += enteredNumber;
      operator = "+";
      break;
    case OPERATION_SUBTRACT:
      currentResult -= enteredNumber;
      operator = "-";
      break;
    case OPERATION_MULTIPLY:
      currentResult *= enteredNumber;
      operator = "*";
      break;
    case OPERATION_DIVIDE:
      currentResult /= enteredNumber;
      operator = "/";
      break;
    default:
      break;
  }
  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(operation, initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener("click", calculate.bind(this, OPERATION_ADD));
subtractBtn.addEventListener("click", calculate.bind(this, OPERATION_SUBTRACT));
multiplyBtn.addEventListener("click", calculate.bind(this, OPERATION_MULTIPLY));
divideBtn.addEventListener("click", calculate.bind(this, OPERATION_DIVIDE));
