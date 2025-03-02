import { calculate } from "./calculator.js";
import { convertKeyToOperator } from "./calculator.js";

export function handleInputKey(event, currentInput, display, formula) {
  const enteredKey = event.key || event.target.textContent.trim();
  const key = convertKeyToOperator(enteredKey);

  const OPERATORS = ["+", "-", "×", "÷"];

  if (/\d/.test(key) || OPERATORS.includes(key)) {
    currentInput.push(key);
    console.log(currentInput);
  } else if (key === "Backspace" || key === "<") {
    currentInput.pop();
  } else if (key === "AC") {
    currentInput.length = 0;
    display.textContent = "";
    formula.textContent = "";
  } else if (key === "Enter" || key === "=") {
    formula.textContent = display.textContent;
    calculate(display, formula);
    currentInput.splice(0, currentInput.length, display.textContent);
    return;
  }

  display.textContent = currentInput.join("");
}
