const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const dropDown = document.getElementById("drop-down");
const sunMoonContainer = document.querySelector(".sun-moon");
const subContainer = document.querySelector(".sub-container");
const buttonContainer = document.querySelector(".buttons-container");
const btn = document.querySelectorAll(".btn");
const operationDiv = document.querySelector(".operation");
const checkEntry = document.querySelector(".check-entry");
const resulta = document.querySelector(".result");
const history = document.querySelector(".history-calculator");
const clock = document.querySelector("#history");
const nombres = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "(",
  ")",
];

const operator = ["+", "-", "*", "/", "%"];

function countPoints(text) {
  var regex = /\./g;
  var matches = text.match(regex);
  return matches ? matches.length : 0;
}
function checkEntryValidity(text) {
  return /^(?!00)/.test(text);
}

operationDiv.innerHTML = "0";

document.addEventListener("keydown", function (e) {
  if (nombres.includes(e.key) && operationDiv.innerHTML !== "0") {
    var dummyText = document.createTextNode(e.key);
    checkEntry.appendChild(dummyText);
    var hasPoint = countPoints(checkEntry.innerHTML);
    if (
      hasPoint <= 1 ||
      e.key !== "." ||
      (checkEntryArray[0] === "0" && checkEntryArray[1] === "." && text === "0")
    ) {
      if (checkEntryValidity(checkEntry.innerHTML)) {
        var operationDivTextNode = document.createTextNode(e.key);
        operationDiv.appendChild(operationDivTextNode);
        var checkEntryArray = checkEntry.innerHTML.split("");
        if (checkEntryArray[1] !== undefined) {
          if (checkEntryArray[0] === "0" && checkEntryArray[1] !== ".") {
            console.log("invalide");
            checkEntryArray.shift();
          }
        }
      } else {
        checkEntry.removeChild(dummyText);
      }
    }
  }
  if (operationDiv.innerHTML === "0" && nombres.includes(e.key)) {
    operationDiv.innerHTML = e.key;
  } else if (e.key === "Backspace") {
    let str = operationDiv.innerHTML;
    let newStr = str.slice(0, -1);
    operationDiv.innerHTML = newStr;
  } else if (operator.includes(e.key)) {
    var dummyText = document.createTextNode(e.key);
    operationDiv.appendChild(dummyText);
    checkEntry.innerHTML = "";
  } else if (e.key === "Enter") {
    equal();
  } else if (e.key === "R" || e.key === "r") {
    racineCarree();
  } else if (e.key === "L" || e.key === "l") {
    logarithme();
  } else if (e.key === "X" || e.key === "x") {
    puissanceCarre();
  } else if (e.key === "E" || e.key === "e") {
    exponential();
  } else if (e.key === "Y" || e.key === "y") {
    puissance();
  } else if (e.key === "Space" || e.key === " ") {
    plusMinus();
  }
  else if (e.key === "Esc" || e.key === "Escape") {
    check()
  }
  else if (e.key === "n" || e.key === "N") {
    isPrime();
  }
});

btn.forEach(function (button) {
  button.addEventListener("click", function (e) {
    let text = "";
    if (
      nombres.includes(e.target.innerText) &&
      operationDiv.innerHTML !== "0"
    ) {
      text = e.target.innerText;
    } else if (e.target.innerText === "←") {
      let str = operationDiv.innerHTML;
      let newStr = str.slice(0, -1);
      operationDiv.innerHTML = newStr;
    } else if (e.target.innerText === "/") {
      checkEntry.innerHTML = "";
      text = "/";
    } else if (e.target.innerText === "*") {
      checkEntry.innerHTML = "";
      text = "*";
    } else if (e.target.innerText === "+") {
      checkEntry.innerHTML = "";
      text = "+";
    } else if (e.target.innerText === "-") {
      checkEntry.innerHTML = "";
      text = "-";
    } else if (e.target.innerText === "%") {
      checkEntry.innerHTML = "";
      text = "%";
    }
    if (
      operationDiv.innerHTML === "0" &&
      nombres.includes(e.target.innerText)
    ) {
      operationDiv.innerHTML = e.target.innerText;
    }
    var dummyText = document.createTextNode(text);
    checkEntry.appendChild(dummyText);
    var hasPoint = countPoints(checkEntry.innerHTML);

    if (
      hasPoint <= 1 ||
      text !== "." ||
      (checkEntryArray[0] === "0" && checkEntryArray[1] === "." && text === "0")
    ) {
      if (checkEntryValidity(checkEntry.innerHTML)) {
        var operationDivTextNode = document.createTextNode(text);
        operationDiv.appendChild(operationDivTextNode);
        var checkEntryArray = checkEntry.innerHTML.split("");
        if (checkEntryArray[1] !== undefined) {
          if (checkEntryArray[0] === "0" && checkEntryArray[1] !== ".") {
            console.log("invalide");
            checkEntryArray.shift();
          }
        }
      } else {
        checkEntry.removeChild(dummyText);
      }
    }
  });
});

function logarithme() {
  const expression = `Math.log10(${operationDiv.innerHTML})`;
  const result = eval(expression);
  if (isNaN(result)) {
    resulta.innerHTML = "Impossible";
    checkEntry.innerHTML = "";
  } else {
    resulta.innerHTML = eval(expression);
    operationDiv.innerHTML = "log" + operationDiv.innerHTML;
    checkEntry.innerHTML = "";
    setHistory(result);
  }
}

function puissance() {
  operationDiv.innerHTML = operationDiv.innerHTML + "**";
  checkEntry.innerHTML = "";
}

function exponential() {
  const expression = `Math.exp(${operationDiv.innerHTML})`;
  const result = eval(expression);
  if (isNaN(result)) {
    resulta.innerHTML = "Impossible";
    checkEntry.innerHTML = "";
  } else {
    resulta.innerHTML = eval(expression);
    operationDiv.innerHTML = "exp" + operationDiv.innerHTML;
    checkEntry.innerHTML = "";
    setHistory(result);
  }
}

function puissanceCarre() {
  const squareResult = eval(operationDiv.innerHTML) ** 2;
  if (isNaN(squareResult)) {
    checkEntry.innerHTML = "";
    resulta.innerHTML = "Impossible";
  } else {
    resulta.innerHTML = eval(operationDiv.innerHTML ** 2);
    operationDiv.innerHTML = operationDiv.innerHTML + "^2";
    checkEntry.innerHTML = "";
    setHistory(squareResult);
  }
}

function racineCarree() {
  const sqrtResult = eval(operationDiv.innerHTML) ** (1 / 2);
  if (isNaN(sqrtResult)) {
    checkEntry.innerHTML = "";
    resulta.innerHTML = "Impossible";
  } else {
    resulta.innerHTML = sqrtResult;
    operationDiv.innerHTML = "√" + operationDiv.innerHTML;
    checkEntry.innerHTML = "";
    setHistory(sqrtResult);
  }
}

function equal() {
  checkEntry.innerHTML = "";
  let result = "";
  result = eval(operationDiv.innerHTML);
  checkEntry.innerHTML = "";
  resulta.innerHTML = result;
  setHistory(result);
}

function setHistory(result) {
  const objDuLocalStorage = localStorage.getItem("operation");
  const objParse = objDuLocalStorage ? JSON.parse(objDuLocalStorage) : {};
  objParse[operationDiv.innerHTML] = result;
  const objEnJSON = JSON.stringify(objParse);
  localStorage.setItem("operation", objEnJSON);
}

function check() {
  operationDiv.innerHTML = "0";
  resulta.innerHTML = "";
  checkEntry.innerHTML = "";
}

function plusMinus() {
  operationDiv.innerHTML = eval(operationDiv.innerHTML);
  if (parseFloat(operationDiv.innerHTML) >= 0) {
    operationDiv.innerHTML = parseFloat(operationDiv.innerHTML) * -1;
  } else if (parseFloat(operationDiv.innerHTML) < 0) {
    operationDiv.innerHTML = parseFloat(operationDiv.innerHTML) * -1;
  }
}
function isPrime() {
  const number = parseInt(operationDiv.innerHTML);
  if (number < 2) {
    resulta.innerHTML = "Faux";
    checkEntry.innerHTML = "";
    setHistory(false);
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      resulta.innerHTML = "Faux";
      checkEntry.innerHTML = "";
      setHistory(false);
      return false;
    }
  }
  resulta.innerHTML = "Vrai";
  checkEntry.innerHTML = "";
  setHistory(true);
  return true;
}

function showHistory() {
  const jsonObj = JSON.parse(localStorage.getItem("operation"));
  const keys = Object.keys(jsonObj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const operationName = `Opération ${i + 1}  :  `;
    const operationResult = `${key} = ${jsonObj[key]}`;

    const operationNameNode = document.createTextNode(operationName);
    const operationResultNode = document.createTextNode(operationResult);
    const lineBreakNode = document.createElement("br");

    history.appendChild(operationNameNode);
    history.appendChild(operationResultNode);
    history.appendChild(lineBreakNode);
  }
}
showHistory();
history.style.display = "none";
clock.addEventListener("click", () => {
  if (history.style.display === "none") {
    history.style.display = "block";
  } else {
    history.style.display = "none";
  }
});
document.addEventListener("click", (e) => {
  if (history.style.display === "block" && e.target.id !== "history") {
    history.style.display = "none";
  }
});
