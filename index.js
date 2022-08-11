const body = document.querySelector('body');
const container = body.querySelector('.container');

const themeNumbers = container.querySelectorAll('.theme--numbers');
const themeButtons = container.querySelectorAll('.themeBtn');


themeButtons.forEach((themeButton) => {
    themeButton.addEventListener('click', () => {
        if (themeButton.previousElementSibling !== null) {
            themeButton.previousElementSibling.style.backgroundColor = 'transparent';
        }
        if (themeButton.nextElementSibling !== null) {
            themeButton.nextElementSibling.style.backgroundColor = 'transparent';
        }
        const buttonID = themeButton.id;
        
        switch (buttonID) {
            case 'light-theme':
                body.classList.remove('middleTheme');
                body.classList.add('lightTheme');
                themeButton.style.backgroundColor = 'var(--themeToggleBtn)';
                localStorage.setItem('theme', 'light-theme');
                break;
            case 'middle-theme':
                body.classList.remove('lightTheme');
                body.classList.add('middleTheme');
                themeButton.style.backgroundColor = 'var(--togglePureCyan-keyBCG-Third)';
                localStorage.setItem('theme', 'middle-theme');
                break;
            case 'dark-theme':
                body.classList.remove('lightTheme', 'middleTheme');
                themeButton.style.backgroundColor = 'var(--themeToggleBtn)';
                localStorage.setItem('theme', 'dark-theme');
                break;
            
        }


    })
});




/**
 * ! CALCULATOR FUNCTIONALITY
 */

 class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.currentOperand;

        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.previousOperand} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operand]');
const clearButton = document.querySelector('[data-reset]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((operationButton) => {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerHTML);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})