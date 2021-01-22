const btn = document.querySelectorAll(".btn");
const resultbox = document.querySelector(".resultbox");

let x = "";
let y = "";
let result = 0;
let operator = "";
let triger = "reset";

function calculate(x, y, oper) {
  switch (oper) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
    default:
      return 0;
  }
}

function handleBtnNumber(e) {
  const number = e.target.getAttribute("value");
  switch (triger) {
    case "reset":
      x = x + number;
      resultbox.innerText = x;
      break;
    case "operate":
      y = y + number;
      resultbox.innerText = y;
      break;
    case "equals":
      x = "";
      x = x + number;
      resultbox.innerText = x;
      triger = "reset";
      break;
    default:
  }
}

function handleBtnOperator(e) {
  operator = e.target.getAttribute("value");
  if (triger === "operate") {
    result = String(calculate(parseInt(x), parseInt(y), operator));
    resultbox.innerText = result;
    x = result;
    y = "";
  } else {
    triger = "operate";
  }
}

function handleReset() {
  resultbox.innerText = 0;
  x = "";
  y = "";
  result = 0;
  operator = "";
  triger = "reset";
}

function handleEquals() {
  result = String(calculate(parseInt(x), parseInt(y), operator));
  resultbox.innerText = result;
  x = result;
  y = "";
  triger = "equals";
}

function init() {
  btn.forEach((btn) => {
    if (btn.classList.contains("btn-number")) {
      btn.addEventListener("click", handleBtnNumber);
    } else if (btn.classList.contains("btn-operator")) {
      btn.addEventListener("click", handleBtnOperator);
    } else if (btn.classList.contains("btn-reset")) {
      btn.addEventListener("click", handleReset);
    } else if (btn.classList.contains("btn-equals")) {
      btn.addEventListener("click", handleEquals);
    }
  });
}

init();
