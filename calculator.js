const DECIMAL_PLACES = 8;
const DELETE_COUNT = 3;

export function convertKeyToOperator(key) {
  const operatorMapping = {
    "*": "×",
    "/": "÷",
  };
  return operatorMapping[key] || key;
}

export function calculate(display, formula) {
  console.log("formula:", formula);

  if (display.textContent === "") return;

  formula.textContent = display.textContent;
  let expression = display.textContent.match(/\d+(\.\d+)?|\D/g) || [];

  expression = processMulDiv(expression);
  expression = processAddSub(expression);

  let finalValue = expression[0];

  display.textContent = finalValue;
}

export function processMulDiv(expression) {
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

export function processAddSub(expression) {
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
