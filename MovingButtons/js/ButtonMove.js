/*
  File: ButtonMove.js
  Author: Christopher May
  Date: 2025-06-19
  Course: CPSC 3750 – Web Application Development
  Purpose: This is the javascript file responsible for creating the buttons and handling their color 
  and movement logic
*/


document.addEventListener('DOMContentLoaded', () => {
        fetch('../navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav').innerHTML = data;
            });
        });
        
const makeButton = document.getElementById("makeBtn");
const colorSelect = document.getElementById("colorSelect");
const viewingArea = document.getElementById("viewing-area");
const totalDisplay = document.getElementById("totalDisplay");
const moveToggle = document.getElementById("moveBtn");

let runningTotal = 0;
let buttonObjects = [];
let isMoving = false;
let moveInterval = null;

makeButton.addEventListener("click", () => {
  const randomValue = Math.floor(Math.random() * 100) + 1;

  const btn = document.createElement("button");
  
  btn.innerText = randomValue;
  btn.style.backgroundColor = colorSelect.value;
  btn.style.position = "absolute";

    if(colorSelect.value === "white" || colorSelect.value === "yellow") {
        btn.style.color = "black";
    }
    else {
        btn.style.color = "white";
    }

  const btnWidth = 45;
  const btnHeight = 30;

  const maxX = viewingArea.clientWidth - btnWidth;
  const maxY = viewingArea.clientHeight - btnHeight;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  btn.style.left = `${randX}px`;
  btn.style.top = `${randY}px`;
  btn.style.width = `${btnWidth}px`;
  btn.style.height = `${btnHeight}px`;

  const dx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
  const dy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

  buttonObjects.push({ element: btn, dx, dy });

  btn.addEventListener("click", () => {
    btn.style.backgroundColor = colorSelect.value;
    const number = parseInt(btn.innerText);

    runningTotal += number;
    totalDisplay.innerText = `Total: ${runningTotal}`;

    if(colorSelect.value === "white" || colorSelect.value === "yellow") {
      btn.style.color = "black";
    }
    else {
      btn.style.color = "white";
    }
  });

  viewingArea.appendChild(btn);
});

moveToggle.addEventListener("click", () => {
  isMoving = !isMoving;
  moveToggle.innerText = isMoving ? "PAUSE" : "MOVE";

  if (isMoving) {
    moveInterval = setInterval(() => {
      moveButtons();
    });
  } else {
    clearInterval(moveInterval);
  }
});

function moveButtons() {
  const areaWidth = viewingArea.clientWidth;
  const areaHeight = viewingArea.clientHeight;
  const buttonWidth = 45;
  const buttonHeight = 30;

  for (const obj of buttonObjects) {
    let btn = obj.element;

    let x = parseFloat(btn.style.left);
    let y = parseFloat(btn.style.top);

    if (isNaN(x) || isNaN(y)) {
      x = Math.random() * (areaWidth - buttonWidth);
      y = Math.random() * (areaHeight - buttonHeight);
    }

    if (x + obj.dx > areaWidth - buttonWidth || x + obj.dx < 0) obj.dx *= -1;
    if (y + obj.dy > areaHeight - buttonHeight || y + obj.dy < 0) obj.dy *= -1;

    x += obj.dx;
    y += obj.dy;

    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  }
}
