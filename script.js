let firstNumber = '';
let secondNumber = '';
let operatorType = '';
let equalSign = '';
let result = 0;
let factorialSign = '';
let operators = ['+','-','*','/','%'];

//Switches
let isFirstNumber = true;
let isfirstDigit1 = true;
let isfirstDigit2 = true;
let canBeFloat = false;
let canBeOperator = false;
let canBeFactorial = false;
let canBeEqual = false;
let finished = false;

let numberButtons = document.querySelectorAll('.numberButton');
let operatorButtons = document.querySelectorAll('.operator');
let calculatingLine = document.querySelector('#calculating');
let resultLine = document.querySelector('#result');
let floatButton = document.querySelector('#float');
let equalButton = document.querySelector('#equal');
let factorialButton = document.querySelector('#factorial');
let clearEntryButton = document.querySelector('#clearEntry');
let clearButton = document.querySelector('#clear');

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

//Operations
function add(){
    return Number(firstNumber) + Number(secondNumber);
}
function subtrack(){
    return Number(firstNumber) - Number(secondNumber);
}
function multiply(){
    return Number(firstNumber) * Number(secondNumber);
}
function divide(){
    return Number(firstNumber) / Number(secondNumber);
}
function modulo(){
    return Number(firstNumber) % Number(secondNumber);
}
function factorial(){
    let resultTemp = 1;
    for(let i =1; i<=Number(firstNumber);i++){
        resultTemp*=i;
    }
    result=resultTemp;
    factorialSign='!';
    equalSign='=';
    finished = true;
}

//Main functions

function clearEntry(){
    firstNumber = '';
    secondNumber = '';
    operatorType = '';
    equalSign = '';
    result = 0;
    factorialSign = '';

    isFirstNumber = true;
    isfirstDigit1 = true;
    isfirstDigit2 = true;
    canBeFloat = false;
    canBeOperator = false;
    canBeEqual = false;
    canBeFactorial = false;
    finished = false;

    updateDisplay();
}

function clear(){
    //Finished
    if(finished){
        result = 0;
        finished = false;
        equalSign = '';

        if(factorialSign==='!') canBeFactorial = true;
        factorialSign = '';

        if(secondNumber.charAt(secondNumber.length-1)==='.') canBeFloat = true;

        secondNumber=secondNumber.slice(0,-1);

        if(secondNumber===''){
            canBeFloat=false;
            isfirstDigit2 = true;
            canBeEqual = false;
        }
    }
    //Second Number
    else if(!isFirstNumber && secondNumber!==''){
        if(secondNumber.charAt(secondNumber.length-1)==='.') canBeFloat = true;

        secondNumber=secondNumber.slice(0,-1);

        if(secondNumber===''){
            canBeFloat=false;
            isfirstDigit2 = true;
            canBeEqual = false;
        }
    }
    //Operator
    else if(!isFirstNumber && secondNumber===''){
        operatorType = '';
        isFirstNumber = true;
        canBeOperator = true;
        canBeFactorial = true;
    }
    //First Number
    else if(isFirstNumber && firstNumber!==''){
        if(firstNumber.charAt(firstNumber.length-1)==='.') canBeFloat = true;
        
        firstNumber = firstNumber.slice(0,-1);
        if(firstNumber==='') clearEntry();
    }
    updateDisplay();
}

function updateDisplay(){
    calculatingLine.innerHTML = firstNumber + factorialSign + ' ' + operatorType + ' ' + secondNumber + ' ' + equalSign;
    resultLine.innerHTML = result;
}

function makeEqual(){
    switch(operatorType){
        case '+':
            result = Math.round(Number(add())*1000)/1000;
            break;
        case '-':
            result = Math.round(Number(subtrack())*1000)/1000;
            break;
        case '*':
            result = Math.round(Number(multiply())*1000)/1000;
            break;
        case '/':
            result = Math.round(Number(divide())*1000)/1000;
            break;
        case '%':
            result = Math.round(Number(modulo())*1000)/1000;
    }
    equalButton.removeEventListener('click', ()=>typing(equalButton.value));
    finished = true;
    equalSign = '=';
    updateDisplay();
}

function typing(inputValue){
    if(!finished){
        //First Number
        if(isFirstNumber){
            //Number
            if(isNumeric(inputValue)){
                if(isfirstDigit1){
                    canBeFactorial = true;
                    canBeOperator = true;
                    canBeFloat = true;
                    isfirstDigit1 = false;
                }
                firstNumber+=inputValue;
            }
            //Float
            else if(inputValue==='.' && canBeFloat){
                canBeFloat = false;
                firstNumber+=inputValue;
            }
            //Factorial
            else if(inputValue==='!' && canBeFactorial){
                canBeFactorial = false;
                factorial();
            }
            //Operator
            else if(operators.includes(inputValue) && canBeOperator){
                canBeOperator = false;
                isFirstNumber = false;
                operatorType = inputValue;
            }
        }
        //Second Number
        else if(!isFirstNumber){
            if(isNumeric(inputValue)){
                if(isfirstDigit2){
                    canBeFloat = true;
                    canBeEqual = true;
                    isfirstDigit2 = false;
                }
                secondNumber+=inputValue;
            }
            else if(inputValue==='.' && canBeFloat){
                canBeFloat = false;
                secondNumber+=inputValue;
            }
            else if(inputValue==='=' && canBeEqual) makeEqual();
        }
    }
    else if(finished){
        if(isNumeric(inputValue)){
            clearEntry();
            canBeFactorial = true;
            canBeOperator = true;
            canBeFloat = true;
            isfirstDigit1 = false;
            firstNumber+=inputValue;
        }
        else if(operators.includes(inputValue)){
            let resultBackUp = result;
            clearEntry();
            firstNumber = resultBackUp;
            operatorType = inputValue;
            isFirstNumber = false; 
            isfirstDigit1 = false;
        }
    }
    else console.log('Van baj szatyorral :(');
    updateDisplay();
}
//Adding eventListeners
numberButtons.forEach(element => element.addEventListener('click',()=>typing(element.value)));
operatorButtons.forEach(element => element.addEventListener('click', () => typing(element.value)));
floatButton.addEventListener('click', () => typing(floatButton.value));
factorialButton.addEventListener('click', () => typing(factorialButton.value));
equalButton.addEventListener('click', ()=>typing(equalButton.value));
clearEntryButton.addEventListener('click',clearEntry);
clearButton.addEventListener('click',clear);

//Theme
let zalan = document.querySelector('#Zalan');
let lili = document.querySelector('#Lili');
let body = document.querySelector('body');

zalan.addEventListener('click', ()=>body.style.backgroundColor='rgb(146, 184, 255)');
lili.addEventListener('click', ()=>body.style.backgroundColor='rgb(252, 189, 243)');