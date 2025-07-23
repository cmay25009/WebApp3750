let vowelMap = {};
let dropCount = 0;

fetch("words.php")
    .then(res => res.json())
    .then(data => {
        vowelMap = data;
        const buttons = document.getElementById("buttons");
        Object.keys(vowelMap).forEach(count => {
            const btn = document.createElement("button");
            btn.textContent = count;
            btn.onclick = () => renderList(vowelMap[count]);
            buttons.appendChild(btn);
        });
    });

function renderList(words) {
    const container = document.getElementById("list-container");
    container.innerHTML = "";
    const sorted = words.sort((a, b) => a.length - b.length);
    sorted.forEach(word => {
        const btn = document.createElement("button");
        btn.className = "column";
        btn.draggable = true;
        btn.textContent = word;
        DragDrop(btn);
        container.appendChild(btn);
    });
}

function DragDrop(elem) {
    elem.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/html", elem.outerHTML);
        elem.classList.add("dragElem");
    });
    elem.addEventListener("dragover", e => {
        e.preventDefault();
        elem.classList.add("over");
    });
    elem.addEventListener("dragleave", () => elem.classList.remove("over"));

    elem.addEventListener("dragend", () => elem.classList.remove("dragElem"));
}

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/html");
    const columns = document.getElementById("columns");
    columns.insertAdjacentHTML("beforeend", data);
    console.log("Adding: " + data);
    DragDrop(columns.lastElementChild);
    dropCount++;
    document.getElementById("dropCount").textContent = dropCount;
    dropZone.classList.remove("over");
});