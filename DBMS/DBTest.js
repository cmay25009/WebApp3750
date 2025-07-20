function addName() {
    const userInput = document.getElementById("name");
    const name = userInput.value;
    userInput.value = "";

    const data = new FormData();
    data.append("name", name);
    
    fetch("DBTest.php", {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(data => {
        document.getElementById("output").innerHTML = data;
    });
}

function showNames() {
    fetch("DBTest.php")
    .then(res => res.text())
    .then(data => {
        document.getElementById("output").innerHTML ="";
        document.getElementById("output").innerHTML = data;
    });
}