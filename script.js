function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    if (b == 0) {
        return 'Denominator cannot be 0';
    } else {
        return a / b;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);

        case '-':
            return sub(a, b);

        case '*':
            return mul(a, b);

        case '/':
            return div(a, b);

        default:
            return null;
    }
}

let firstnumber = "";
let secondnumber = "";
let operator = "";
let result = "";

let display = document.querySelector('.display')

let numButtons = document.getElementsByClassName("numButton");
for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener("click", function () {
        if (operator == "") {
            firstnumber += this.textContent;
            display.textContent = firstnumber;
        } else {
            secondnumber += this.textContent;
            display.textContent = firstnumber+" "+operator + " " + secondnumber;
        }
    });
}

let opButtons = document.getElementsByClassName("opButton");
for (let i = 0; i < opButtons.length; i++) {
    opButtons[i].addEventListener("click", function () {
        operator = this.textContent;
        display.textContent = firstnumber+" "+operator;
    });
}

let eqButton = document.getElementsByClassName("eqButton")[0];
eqButton.addEventListener("click", function () {
    result = operate(operator, parseFloat(firstnumber), parseFloat(secondnumber));
    display.textContent = result;
});

let deciButton = document.getElementsByClassName("deciButton")[0];
deciButton.addEventListener("click", function () {
    if (operator === "") {
        if (!firstnumber.includes('.')) {
            firstnumber += '.';
            display.textContent = firstnumber;
        }
    } else {
        if (!secondnumber.includes('.')) {
            secondnumber += '.';
            display.textContent = firstnumber + " " + operator + " " + secondnumber;
        }
    }
});

let clearButton = document.getElementsByClassName("clearButton")[0];
clearButton.addEventListener("click", function () {
    firstnumber = "";
    secondnumber = "";
    operator = "";
    result = "";
    display.textContent="0";
});

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        if (operator === '') {
            if (key === '.' && firstnumber.includes('.')) {
                return;
            }
            firstnumber += key;
            display.textContent = firstnumber;
        } else {
            if (key === '.' && secondnumber.includes('.')) {
                return;
            }
            secondnumber += key;
            display.textContent = firstnumber + " " + operator + " " + secondnumber;
        }
    } else if (key === '=' || key === 'Enter') {
        result = operate(operator, parseFloat(firstnumber), parseFloat(secondnumber));
        display.textContent = result;
    } else if (key === 'C' || key === 'c') {
        clearCalculator();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else {
        operator += key;
        display.textContent = firstnumber + " " + operator;
    }
});

function handleBackspace() {
    if (secondnumber !== '') {
        secondnumber = secondnumber.slice(0, -1);
        display.textContent = firstnumber + " " + operator + " " + secondnumber;
    } else if (operator !== '') {
        operator = '';
        display.textContent = firstnumber;
    } else if (firstnumber !== '') {
        firstnumber = firstnumber.slice(0, -1);
        display.textContent = firstnumber;
    }
}

function clearCalculator() {
    firstnumber = '';
    secondnumber = '';
    operator = '';
    result = '';
    display.textContent = "0";
}
