var clearBtn = document.getElementById("clear");
var backSpaceBtn = document.getElementById("backSpace");
var dotBtn = document.getElementById("dot");

var eqlBtn = document.getElementById("equal");

var numBtns = document.getElementsByClassName("digit");
var oprBtns = document.getElementsByClassName('operator');
var bracketBtn = document.getElementsByClassName("bracket");

var oneOpr = false;

var canAddDot = true;

maxOpr = false;


var operators = ["+", "-", "*", "/"];

var display = document.getElementById('screen');
var answer = document.getElementsByClassName("expressionResult")[0];

var result = "0";

var expression = "";


var updateDisplay = (clickObj) => {

    var btnNum = clickObj.target.innerText;

    if ((result === "Infinity") || (result === "-Infinity") || (result === "Error")) {
        clearBtn.onclick();
    }

    var lastChar = expression.charAt(expression.length - 1);

    oneOpr = (operators.indexOf(lastChar) > -1);


    if (btnNum === "-" && !maxOpr) {
        maxOpr = true;
    } else if (clickObj.target.className === "operator" && maxOpr) {
        btnNum = "";
    } else if (btnNum !== "-") {
        maxOpr = false;
    }


    if (clickObj.target.className === "operator" && oneOpr && !maxOpr) {
        backSpaceBtn.onclick();
    } else if (btnNum === "." && canAddDot) {
        canAddDot = false;
    } else if (btnNum === "." && !canAddDot) {
        btnNum = "";
    }

    expression += btnNum;


    if (clickObj.target.className === "operator" && !maxOpr) {
        canAddDot = true;
    } else if (result === "0" && !(clickObj.target.className === "operator"))
        result = "";            // Clear 0 before adding num


    if (btnNum !== "" && clickObj.target.className === "operator") {
        btnNum = " " + btnNum + " ";
    }

    result += btnNum;
    display.value = result;

    if (expression.charAt(expression.length - 1) === "x") {
        expression = expression.slice(0, -1) + "*";
    } else if (expression.charAt(expression.length - 1) === "÷") {
        expression = expression.slice(0, -1) + "/";
    }

};


for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener("click", updateDisplay, false);
}

for (let i = 0; i < oprBtns.length; i++) {
    oprBtns[i].addEventListener("click", updateDisplay, false);
}

for (let i = 0; i < bracketBtn.length; i++) {
    bracketBtn[i].addEventListener("click", updateDisplay, false);
}

dotBtn.addEventListener("click", updateDisplay, false);


// Backspace
backSpaceBtn.onclick = () => {

    if ((result === "Infinity") || (result === "-Infinity") || (result === "Error"))
        clearBtn.onclick();

    var length = display.value.length;

    var lastChar = display.value.charAt(length - 1);

    var slice = -1;

    // deleting an operator
    if (lastChar === " ") {
        slice = -3;
        canAddDot = !canAddDot;
        maxOpr = false;
    } else if (lastChar === ".")
        canAddDot = true;


    result = result.slice(0, slice);

    expression = expression.slice(0, -1);

    if (result === "")
        result = "0";

    display.value = result;

};

// Reset display Clear button
clearBtn.onclick = () => {
    result = "0";
    expression = "";
    answer.innerHTML = "0 + 0 =";
    display.value = result;
    canAddDot = true;
    maxOpr = false;
};


eqlBtn.onclick = () => {

    var firstChar = result.charAt(0);

    if (firstChar === "0" && expression.charAt(0) !== "0")
        expression = "0" + expression;

    answer.innerHTML = result + " =";

    try {
        result = expression = eval(expression.toString()).toString();
    } catch (e) {
        result = display.value = "Error";
        return;
    }

    canAddDot = !(result.includes("."));
    maxOpr = false;

    display.value = result;
};



