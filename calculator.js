import { OPERATORS, DECIMAL_PLACES, DELETE_COUNT } from "./constants.js";

export function convertKeyToOperator(key) {
  const operatorMapping = {
    "*": "×",
    "/": "÷",
  };
  return operatorMapping[key] || key;
}

export function calculate(display, formula) {
  if (display.textContent === "") return;

  formula.textContent = display.textContent;
  let expression = display.textContent.match(/\d+(\.\d+)?|\D/g) || [];

  expression = processOperation(expression, ["×", "÷"]);
  expression = processOperation(expression, ["+", "-"]);

  let finalValue = expression[0];

  display.textContent = finalValue;
}

function processOperation(expression, OPERATORS) {
  let result;
  for (let i = 0; i < expression.length; i++) {
    if (OPERATORS.includes(expression[i])) {
      const prevOperandIndex = i - 1;
      const nextOperandIndex = i + 1;

      const firstOperand = Number(expression[prevOperandIndex]);
      const secondOperand = Number(expression[nextOperandIndex]);

      result = processCalculation(expression[i], firstOperand, secondOperand);

      result = parseFloat(result.toFixed(DECIMAL_PLACES));
      expression.splice(prevOperandIndex, DELETE_COUNT, result);
      i--;
    }
  }
  return expression;
}

function processCalculation(OPERATORS, firstOperand, secondOperand) {
  switch (OPERATORS) {
    case "×":
      return firstOperand * secondOperand;
    case "÷":
      return firstOperand / secondOperand;
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
  }
}
