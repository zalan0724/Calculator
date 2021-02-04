let firstNumber = '';
let secondNumber = '';
let result = '';
let operationType = '';
let equalType = '';
let isOperationPressed= false;
let numberButtons = document.querySelectorAll('.numberButton');
let operatorButtons = document.querySelectorAll('.operator');
let equalButton = document.querySelector('#equal');
let calculatingDisplay = document.querySelector('#calculating');
let resultDisplay = document.querySelector('#result');
let operators = ['+','-','/','*'];

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function add(){
    return parseInt(firstNumber)+parseInt(secondNumber);
}
function subtrack(){
    return parseInt(firstNumber)-parseInt(secondNumber);
}
function multiply(){
    return parseInt(firstNumber)*parseInt(secondNumber);
}
function divide(){
    return parseInt(firstNumber)/parseInt(secondNumber);
}

function updateDisplay(){
    calculatingDisplay.innerHTML = firstNumber + ' ' + operationType + ' ' + secondNumber + ' ' + equalType;
    resultDisplay.innerHTML = result;
}

function equal(){
    switch(operationType){
        case '+':
            result = add()
            break;
        case '-':
            result = subtrack();
            break;
        case '*':
            result = multiply();
            break;
        case '/':
            result = divide();
            break;
    }
    updateDisplay();
    console.log('szai');
}

function reset(){
    
}
function typing(value){
    //First Number
    if(!isOperationPressed){
        //Not operator
        if(!(operators.includes(value))){
            firstNumber+=value;
        }
        //Operator
        else{
            operationType+=value;
            isOperationPressed=true;
        }
    }
    //Second Number
    else if(isNumeric(value)) secondNumber+=value;

    updateDisplay();
}
numberButtons.forEach(element => element.addEventListener('click',() => typing(element.value)));
operatorButtons.forEach(element => element.addEventListener('click',() => typing(element.value)));
equalButton.addEventListener('click', equal);
