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

let firstOperand = [];
let secondOperand = [];
let operator;

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
    let acc = '';

    buttonsContainer.addEventListener('click', (e) => {
        //this is for the numbers buttons when clicked it will update ui display
        if (e.target !== e.currentTarget && e.target.classList.contains('digit')) {
            display.textContent += e.target.value;
            acc += e.target.value;
        }
        //this is for operator buttons when pushed it will update operator then push the number to the array
        if (e.target !== e.currentTarget && e.target.classList.contains('operator')) {
            handleOperatorClick(e.target.id, acc)
        }
    })
}


function handleOperatorClick(targetId, acc) {
    const operatorMap = {
        plus: '+',
        minus: '-',
        times: '*',
        divide: '/'
    }

    operator = operatorMap[targetId]
    let converted = Number(acc)
    if (operator) {
        firstOperand.push(converted)
        console.log(firstOperand, operator)
    }
}

populate()