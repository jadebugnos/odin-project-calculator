function add(...addends) {
    return addends.reduce((a, b) => a + b, 0)
}


function subtract(...num) {
    return num.length ? num.reduce((a, b) => a - b) : 0;
}

function multiply(...num) {
    return num.length ? num.reduce((a, b) => a * b, 1) : 0;
}

function divide(...num) {
    if (num.includes(0)) {
        alert('You cannot divide by zero')
        return 0;
    }
    return num.length ? num.reduce((a, b) => a / b) : 0;
}

function getPercentage(...num) {
    const [a, b] = num;
    if (num.length === 1) {
        return a / 100;
    } else if (num.length === 2) {
        return a * (b / 100)
    }
}

//calls respective functions to do the calculations
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
        case '%':
            return getPercentage(...operands);
    }
}

//accumulates the number before getting pushed to operands
let acc = '';
let operands = [];
let operator;
const operatorMap = {
    plus: '+',
    minus: '-',
    times: '*',
    divide: '/',
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/"
}

//contains all buttons eventlisteners and call respective functions when clicked
function populate() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('#button-containers');
    const percentButton = document.querySelector('#percent');

    percentButton.addEventListener('click', e => {
        handlePercent(display);
    })

    buttonsContainer.addEventListener('click', (e) => {

        if (e.target !== e.currentTarget) {
            if (e.target.classList.contains('digit')) {
                acc += e.target.value;
                handleDisplay(acc, display)
            } else if (e.target.classList.contains('operator')) {
                handleOperatorClick(e.target.id, display)
            } else if (e.target.id === 'equals' && operands.length && operator) {
                e.stopPropagation()
                handleEqualClick(display)
            } else if (e.target.id === 'clear') {
                handleClearClick(display)
            } else if (e.target.id === 'decimal') {
                handleDecimalClick(display)
            } else if (e.target.id === 'negative') {
                handleNegativeClick(display)
            }
        }
    })

    document.addEventListener('keyup', (e) => handleKeyboardSupport(e, display));

}

//this is for keyboard support. i'll do this later
function handleKeyboardSupport(event, display) {
    const numbers = '1234567890';

    if (numbers.includes(event.key)) {
        acc += event.key;
        handleDisplay(acc, display);
        //check if an operator is pressed
    } else if (event.key === operatorMap[event.key]) {
        handleOperatorClick(event.key, display);
        //the parenthesis makes sure the || comparisons are evaluated first before the && operator
    } else if ((event.key === '=' || event.key === 'Enter') &&
        operands.length && operator) {
        handleEqualClick(display);
    } else if (event.key === '.') {
        handleDecimalClick(display);
    } else if (event.key === 'Backspace') {
        handleBackSpacePress(display);
    } else if (event.key === 'Delete') {
        handleClearClick(display);
    } else if (event.key === '%') {
        handlePercent(display);
    }

}

//updates the display in the UI
function handleDisplay(value, display) {
    display.textContent = value;
}


function handleOperatorClick(targetId, display) {
    //makes sure it doesn't push an empty string into the array
    if (acc !== "") {
        operands.push(Number(acc));
        acc = "";
    }
    console.log(targetId)
    //if operator already has a value, call equal function
    if (operator) {
        handleEqualClick(display)
    }
    //assigns new operator after operate is executed in handleEqualClick
    //avoids using the current targetId in operate execution
    operator = operatorMap[targetId]
    console.log(operands, operator, acc)
}

function handleEqualClick(display) {
    //makes sure it doesn't push an empty string into the array
    if (acc !== "") {
        operands.push(Number(acc));
        acc = "";
    }

    let total;
    //only executes if the operands array has two values
    if (operands.length === 2 && operator) {
        total = operate(operator, operands);
        handleDisplay(total, display);
        operands = [total]; //sets the item of operands array to the total of operation
        operator = "";
    }

    console.log(operands, operator);
}
//resets all values
function handleClearClick(display) {
    display.textContent = "";
    operands.length = 0;
    acc = "";
    operator = "";
}

function handleDecimalClick(display) {
    let lastChar = acc.charAt(acc.length - 1);
    //if the last character is not a decimal point, add one
    if (lastChar !== '.' && acc) {
        acc += '.';
        display.textContent += '.';
        console.log(acc)
        //if it is, remove the decimal point
    } else if (lastChar === '.') {
        acc = acc.slice(0, -1);
        console.log(acc)
        display.textContent = acc;
    }
}

function handleNegativeClick(display) {
    let firstChar = acc.charAt(0);
    //if the first character is negative, remove it
    if (firstChar === '-') {
        acc = acc.slice(1);
        display.textContent = acc;
        console.log(acc)
        //if it isn't add one
    } else {
        acc = '-' + acc;
        display.textContent = acc;
        console.log(acc);
    }
}
//deletes 1 number to the right when backspace is pressed
function handleBackSpacePress(display) {
    if (acc) {
        acc = acc.slice(0, -1);
        display.textContent = acc;
        console.log('bakcspace is pressed')
    } else if (!acc && operands.length > 0) {
        //converts item to string then removes last number then convert back to number
        operands[0] = parseInt(operands[0].toString().slice(0, -1));
        display.textContent = operands[0];
    }
    
    if (isNaN(operands[0]) || operands[0] === "") {
        operands.pop(); // Remove the last element if no digits are left
        display.textContent = ""; // Clear the display
    } else {
        display.textContent = operands[0]; // Update display if valid
    }
}

//this code is buggy i am commenting it out to be fix later
//calls operate() which calls getPercentage() when % is pressed/click
function handlePercent(display) {
    if (acc !== "") {
        operands.push(Number(acc));
        acc = "";
    }
    //if operands is not empty execute all the codes
    if (operands.length) {
        let percentage = operate('%', operands);
        handleDisplay(percentage, display);
        operator = "";
        operands = [percentage];
        console.log(operands);
        console.log(operator)
    }
}

populate()