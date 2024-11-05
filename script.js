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
let operator;

function operate(operator, operands) {
    switch (operator) {
        case '+':
            return add(...operands);
        case '-':
            return subtract(...operands);
        case '*':
            return multiply(...operands);
        case '/':
            return divide(...operands);
    }
}

let acc = '';
const operatorMap = {
    plus: '+',
    minus: '-',
    times: '*',
    divide: '/',
}

function populate() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('#button-containers');

    buttonsContainer.addEventListener('click', (e) => {

        if (e.target !== e.currentTarget) {
            if (e.target.classList.contains('digit')) {
                acc += e.target.value;
                handleDisplay(acc, display)
            } else if (e.target.classList.contains('operator')) {
                handleOperatorClick(e.target.id, acc, display)
            } else if (e.target.id === 'equals') {
                handleEqualClick(display)
            }
        }
    })
}

function handleDisplay(value, display) {
    display.textContent = value;
}

// this is still buggy I have to figure out how to make = work
function handleOperatorClick(targetId) {
    operator = operatorMap[targetId]
    if (acc !== "") {
        firstOperand.push(Number(acc));
        acc = "";
    }
}

function handleEqualClick(display) {
    if (acc !== "") {
        firstOperand.push(Number(acc));
        acc = "";
    }

    let total = operate(operator, firstOperand)
    console.log(firstOperand, operator)
    handleDisplay(total, display)

    firstOperand = [total];
}

populate()