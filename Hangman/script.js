
let wrongGuesses = 0;
let currentWord = '';

function startGame() {
    // Fetch a new word from the server
    const cheatsEnabled = document.getElementById('cheatMode').checked;
    fetch('getWord.php')
        .then(response => response.json())
        .then(data => {
            if (data.word) {
                data.word = data.word.toUpperCase();
                if (cheatsEnabled) {
                    alert(data.word);
                }
                setupGame(data.word);
            } else {
                console.error('Error fetching word:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

function setupGame(word) {
    currentWord = word;
    const wordToGuess = document.getElementById('wordToGuess');
    wordToGuess.innerHTML = '_ '.repeat(word.length).trim();
    wrongGuesses = 0;
    generateLetterButtons();
    document.getElementById('gallowsImage').src = `gallows/1.png`;
}

function generateLetterButtons() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = ''; // Clear previous buttons
    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.setAttribute("id", letter);
        button.onclick = () => guessLetter(letter);
        lettersDiv.appendChild(button);
        
    });
}



function guessLetter(letter) {
    letter = letter.toUpperCase();

    let found = false;
    let wordDisplayArray = document.getElementById('wordToGuess').innerHTML.split(' ');

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            wordDisplayArray[i] = letter;
            found = true;
        }
    }

    document.getElementById('wordToGuess').innerHTML = wordDisplayArray.join(' ');


    const button = document.getElementById(letter);
    if (button) {
        button.disabled = true;
    }

    if (found) {
        if (!wordDisplayArray.includes('_')) {
            alert("You Win!");
        }
    } else {
        wrongGuesses++;
        const nextImage = Math.min(wrongGuesses, 10);
        document.getElementById('gallowsImage').src = `gallows/${nextImage}.png`;

        if (nextImage === 10) {
            alert(`Game Over! The word was: ${currentWord}`);
        }
    }

    console.log('Guessed letter:', letter);
}


document.addEventListener("keydown", function (e) {
    const letter = e.key.toUpperCase();
    if (letter >= 'A' && letter <= 'Z') {
        guessLetter(letter);
    }
});

startGame();
