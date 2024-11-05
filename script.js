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


let active = false;

function populate() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('#button-containers');
    let acc = '';

    buttonsContainer.addEventListener('click', (e) => {

        if (e.target !== e.currentTarget) {
            if (e.target.classList.contains('digit')) {
                if (!active) {
                    handleDisplay(e.target.value, display)
                    acc += e.target.value;
                } else {
                    handleDisplay(e.target.value, display)
                }
            } else if (e.target.classList.contains('operator')) {
                handleOperatorClick(e.target.id, acc)
            }
        }
    })
}

function handleDisplay(value, display) {
    active ? display.textContent = value :
        display.textContent += value
        active = false
        console.log(active)
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
        active = true;
        console.log(active)
    }
}

populate()