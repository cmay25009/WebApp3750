const redBtn = document.getElementById("redBtn");
const greenBtn = document.getElementById("greenBtn");
const blueBtn = document.getElementById("blueBtn");

const redCount = document.getElementById("redCount");
const greenCount = document.getElementById("greenCount");
const blueCount = document.getElementById("blueCount");

const redHover = document.getElementById("redHover");
const greenHover = document.getElementById("greenHover");
const blueHover = document.getElementById("blueHover");

let redClicks = 0, greenClicks = 0, blueClicks = 0;
let redSwaps = 0, greenSwaps = 0, blueSwaps = 0;

function updateBackground(color) {
    document.body.style.backgroundColor = color;
}

function addClick(color) {
    if (color === "red") {
        redCount.textContent = `RED count: ${++redClicks}`;
        updateBackground("red");
    } else if (color === "green") {
        greenCount.textContent = `GREEN count: ${++greenClicks}`;
        updateBackground("green");
    } else if (color === "blue") {
        blueCount.textContent = `BLUE count: ${++blueClicks}`;
        updateBackground("blue");
    }
}

function setupButton(button, color, hoverCounter, swapTracker) {
    button.addEventListener("click", () => addClick(color));
    button.addEventListener("mouseover", () => {
        const currentBg = button.style.backgroundColor;
        button.style.backgroundColor = button.style.color;
        button.style.color = currentBg || "black";
        swapTracker();
    });
    button.addEventListener("mouseout", () => {
        const currentBg = button.style.backgroundColor;
        button.style.backgroundColor = button.style.color;
        button.style.color = currentBg;
    });
}

setupButton(redBtn, "red", redHover, () => {
    redHover.textContent = `RED hover swaps: ${++redSwaps}`;
});

setupButton(greenBtn, "green", greenHover, () => {
    greenHover.textContent = `GREEN hover swaps: ${++greenSwaps}`;
});

setupButton(blueBtn, "blue", blueHover, () => {
    blueHover.textContent = `BLUE hover swaps: ${++blueSwaps}`;
});