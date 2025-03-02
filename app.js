const keypad = document.querySelector(".calculator__keypad");
const display = document.querySelector(".calculator__display-main");
const formula = document.querySelector(".calculator__formula");

let currentInput = [];
const OPERATORS = ["+", "-", "×", "÷"];

function convertKeyToOperator(key) {
  const operatorMapping = {
    "*": "×",
    "/": "÷",
  }
  return operatorMapping[key] || key;
}

function handleInputKey(event) {
  const enteredKey = event.key || event.target.textContent.trim();
  const key = convertKeyToOperator(enteredKey);

  if (/\d/.test(key) || OPERATORS.includes(key)) {
    currentInput.push(key);
  } else if (key === "Backspace" || key === "<") {
    currentInput.pop();
  } else if (key === "AC") {
    currentInput = [];
    formula.textContent = "";
  } else if (key === "Enter" || key === "=") {
    calculate();
    currentInput = [display.textContent];
  }

  display.textContent = currentInput.join("");
}
keypad.addEventListener("click", handleInputKey);
document.addEventListener("keydown", handleInputKey);

function calculate() {
  if (display.textContent === "") return;

  formula.textContent = display.textContent;
  let expression = display.textContent.match(/\d+(\.\d+)?|\D/g) || [];

  expression = processMulDiv(expression);
  expression = processAddSub(expression);

  let finalValue = expression[0];

  display.textContent = finalValue;
}

const DECIMAL_PLACES = 8;
const DELETE_COUNT = 3;

function processMulDiv(expression) {
  let result;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "×" || expression[i] === "÷") {
      const prevOperandIndex = i - 1;
      const nextOperandIndex = i + 1;

      const firstOperand = Number(expression[prevOperandIndex]);
      const secondOperand = Number(expression[nextOperandIndex]);

      result =
        expression[i] === "×"
          ? firstOperand * secondOperand
          : firstOperand / secondOperand;

      result = parseFloat(result.toFixed(DECIMAL_PLACES));
      expression.splice(prevOperandIndex, DELETE_COUNT, result);
      i--;
    }
  }
  return expression;
}

function processAddSub(expression) {
  let result;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "+" || expression[i] === "-") {
      const prevOperandIndex = i - 1;
      const nextOperandIndex = i + 1;

      const firstOperand = Number(expression[prevOperandIndex]);
      const secondOperand = Number(expression[nextOperandIndex]);

      result =
        expression[i] === "+"
          ? firstOperand + secondOperand
          : firstOperand - secondOperand;

      result = parseFloat(result.toFixed(DECIMAL_PLACES));
      expression.splice(prevOperandIndex, DELETE_COUNT, result);
      i--;
    }
  }
  return expression;
}
