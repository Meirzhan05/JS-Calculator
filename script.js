const btns = document.querySelectorAll('.button');
const num = document.querySelector('#num');
const operators = '-+÷×';
let numbers = [];
let operator;

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (num.textContent.length <= 9) {
            btnValue = btn.value;
            textContent = num.textContent;

            if (operators.includes(btnValue)) {
                operator = btnValue;
                numbers.push(parseFloat(textContent));
                console.log(operator);
            }

            if (btnValue == "=") {
                numbers.push(parseFloat(textContent));
                num.textContent = calculate(numbers, operator);
            } else if (btnValue == "AC") {
                num.textContent = "0";
            } else if (textContent != "+/-" && ('0+-÷×'.includes(textContent) || operators.includes(btnValue))) {
                num.textContent = btnValue;
            } else if ((isNumeric(textContent) || btnValue == ".") && (isNumeric(btnValue) || btnValue == ".")) {
                num.textContent += btnValue;
            } else if (btnValue === "+/-") {
                if (isNumeric(textContent[0])) {
                    num.textContent = "-" + textContent;
                } else {
                    num.textContent = num.textContent.substring(1, textContent.length);
                } 
            }
        }
    });
});

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function calculate(numbers, operator) {
    let firstNumber = numbers[0];
    let secondNumber = numbers[1];
    let total;
    switch (operator) {
        case "+": 
            total = firstNumber + secondNumber;    
        case "-":
            total = firstNumber - secondNumber;
        case "÷":
            total = firstNumber / secondNumber;
        case "×": 
            total = firstNumber * secondNumber;
    }
    return total;
}