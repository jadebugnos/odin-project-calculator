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


let operands = [];
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
               handleOperatorClick(e.target.id, display)
            } else if (e.target.id === 'equals' && operands.length) {
                handleEqualClick(display)
            } else if (e.target.id === 'clear') {
                handleClearClick(display)
            }
        }
    })
}

function handleDisplay(value, display) {
    display.textContent = value;
}


function handleOperatorClick(targetId, display) {
    if (acc !== "") {
        operands.push(Number(acc));
        acc = "";
    }
    console.log(operands)
    if (operator) {
        handleEqualClick(display)
    }
    operator = operatorMap[targetId]
}

function handleEqualClick(display) {
    if (acc !== "") {
        operands.push(Number(acc));
        acc = "";
    }
    let total;
    if (operands.length >= 2) {
       total = operate(operator, operands);
       handleDisplay(total, display);
       operands = [total];
    }


    console.log(operands, operator);
}

function handleClearClick(display) {
    display.textContent = "";
    operands = [];
    acc = "";
}

populate()