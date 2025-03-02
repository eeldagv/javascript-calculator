import { handleInputKey } from "./event-handlers.js";
import { calculate } from "./calculator.js";

const keypad = document.querySelector(".calculator__keypad");
const display = document.querySelector(".calculator__display-main");
const formula = document.querySelector(".calculator__formula");

let currentInput = [];

keypad.addEventListener("click", (event) =>
  handleInputKey(event, currentInput, display, formula)
);
document.addEventListener("keydown", (event) =>
  handleInputKey(event, currentInput, display, formula)
);
