const btns = document.querySelectorAll('.button');
const num = document.querySelector('#num');
const OPERATORS = '-+÷×';
let numbers = [];
let operator;
const MAX_CHARS = 9;
const CLEAR_BTN = "AC";

// Logic of a calculator 
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let btnValue = btn.value;
        let textContent = num.textContent;

        if (OPERATORS.includes(btnValue)) {
            operator = btnValue;
            numbers.push(parseFloat(textContent));
        }
        
        if (btnValue == "=") {
            numbers.push(parseFloat(textContent));
            textContent = calculate(numbers, operator);
            numbers = [];
            num.textContent = textContent;
        } else if (btnValue == CLEAR_BTN) {
            num.textContent = "0";
            numbers = [];
        } else if ("+/-" != btnValue && btnValue != "." && ('0+-÷×'.includes(textContent) || OPERATORS.includes(btnValue))) {
            num.textContent = btnValue;
        } else if ((isNumeric(textContent) && isNumeric(btnValue) || (btnValue == "." && textContent[textContent.length - 1] != ".")) 
        && num.textContent.length <= MAX_CHARS) {
            num.textContent += btnValue;
        } else if (btnValue === "+/-" && textContent != 0) {
            if (isNumeric(textContent[0])) {
                num.textContent = "-" + textContent;
            } else {
                num.textContent = textContent.substring(1, textContent.length);
            } 
        } else if (btnValue == "%") {
            numbers.push(parseFloat(textContent));
            textContent = calculate(numbers, operator, true);
            numbers = [];
            num.textContent = textContent;
        } else if (btnValue == "↺") {
            if (textContent.length - 1 >= 1) {
                num.textContent = textContent.substring(0, textContent.length - 1);
            } else {
                num.textContent = "0";
            }
        }
    });
});


function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function calculate(numbers, operator, percent=false) {
    let firstNumber = numbers[0];
    let secondNumber = numbers[1];
    let total;
    const limit = 1e9;

    if (percent) {
        secondNumber = secondNumber / 100;
    }

    switch (operator) {
        case "+":
            total = firstNumber + secondNumber;  
            break; 
        case "-":
            total = firstNumber - secondNumber;
            break;
        case "÷":
            total = firstNumber / secondNumber;
            break;
        case "×": 
            total = firstNumber * secondNumber;
            break;
    }

    if (Math.abs(total) > limit) {
        total = total.toExponential(2)
    }
    return total;
}