function add(...addends) {
    return addends.reduce((a, b) => a + b, 0)
}


function subtract(...num) {
    return num.reduce((a, b) => a - b)
}

function multiply(...num) {
    return num.reduce((a, b) => a * b, 1)
}

function divide(...num) {
    return num.reduce((a, b) => a / b)
}

let operandOne = 23;
let operandtwo = 34;
let operator = '/';

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function populate() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('#button-containers');

    buttonsContainer.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget && e.target.classList.contains('digit')) {
            display.textContent += e.target.value;
        }
    })
}

populate()