let num1 = null;
let operator = null;
let num2 = null;
let displayValue = "0";
let result = "0";

const operands = document.querySelectorAll(".operand");
const display = document.querySelector("#display");
const operators = document.querySelectorAll(".operator");
const equalTo = document.querySelector(".equalTo");
const clear = document.querySelector(".clear");

function operate(num1, num2, operator) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operator === "+") {
    return `${num1 + num2}`;
  } else if (operator === "-") {
    return `${num1 - num2}`;
  } else if (operator === "*") {
    return `${num1 * num2}`;
  } else if (operator === "/") {
    if (num2 == "0") {
      return "Gotcha!!";
    }
    return `${num1 / num2}`;
  }
}

function updateDisplay() {
  display.textContent = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}

for (let operand of operands) {
  operand.addEventListener("click", function (e) {
    const value = e.target.value;
    if (
      display.textContent === "0" ||
      display.textContent === operator ||
      display.textContent === "NaN"
    ) {
      displayValue = value;
    } else {
      displayValue = displayValue + value;
    }
    updateDisplay();
  });
}

for (let op of operators) {
  op.addEventListener("click", function (e) {
    //Allow only one operator to be considered at a time
    if(operator != null && displayValue == operator){
      return;
    }
    //first operation
    if (operator === null) {
      operator = e.target.value;
      num1 = displayValue;
    } 
    //second,third and further operations
    else {
      num2 = displayValue;
      num1 = operate(num1, num2, operator);
      operator = e.target.value;
    }

    //User divides by 0 in between multiple operations
    if (num1 == "Gotcha!!") {
      displayValue = num1;
      num1 = null;
      num2 = null;
      operator = null;
    } else {
      displayValue = operator;
    }
    updateDisplay();
  });
}

//Resets Calc for user
clear.addEventListener("click", function (e) {
  displayValue = "0";
  num1 = null;
  num2 = null;
  operator = null;
  result = "0";
  updateDisplay();
});

//Displays the final output of operations
equalTo.addEventListener("click", function (e) {
  if (operator === null) {
    displayValue = displayValue;
  } else{
    num2 = displayValue;
    result = operate(num1, num2, operator);
    operator = null;
    num1 = null;
    num2 = null;
    if (result == "Gotcha!!") {
      displayValue = result;
    } 
    else if(result == "NaN"){
      displayValue = "Error!!";
    }
    else {
      displayValue = parseFloat(result).toFixed(2).toString();
    }
  }
  
  updateDisplay();
});
