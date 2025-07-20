const box = document.getElementById("box");
const redZone = document.querySelector(".redZone");
const greenZone = document.querySelector(".greenZone");



let currentZone = "red";

box.addEventListener("mouseenter", function () {
    box.classList.add("hovered");
});

box.addEventListener("mouseleave", function () {
    box.classList.remove("hovered");
});

box.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", "Dragging This Box");
});

redZone.addEventListener("dragover", function (e) {
    e.preventDefault();
});

greenZone.addEventListener("dragover", function (e) {
    e.preventDefault();
});

redZone.addEventListener("drop", function (e) {
    e.preventDefault();
    box.style.left = (redZone.offsetLeft + redZone.clientWidth/2 - box.clientWidth/2) + "px";
    box.style.top = (redZone.offsetTop + redZone.clientHeight/2 - box.clientHeight/2) + "px";
    box.classList.add("animate-drop");
    currentZone = "red";
});

greenZone.addEventListener("drop", function (e) {
    e.preventDefault();
    box.style.left = (greenZone.offsetLeft + greenZone.clientWidth/2 - box.clientWidth/2) + "px";
    box.style.top = (greenZone.offsetTop + greenZone.clientHeight/2 - box.clientHeight/2) + "px";
    box.classList.add("animate-drop");
    currentZone = "green";
});

box.addEventListener("animationend", function () {
    box.classList.remove("animate-drop");
});


const opacitySlider = document.getElementById("opacitySlider");
const overlay = document.getElementById("overlay-box");

opacitySlider.addEventListener("focus", function() {
    opacitySlider.style.outline = "3px solid orange";
});

opacitySlider.addEventListener("blur", function() {
    opacitySlider.style.outline = "none";
});

opacitySlider.addEventListener("input", function() {
    const percent = opacitySlider.value;
    overlay.style.background = `rgba(0,0,0,${percent/100})`;
});
