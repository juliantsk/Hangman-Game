var wins = 0;
var guesses = 15;
var words = ["lantern", "prank", "costume", "sweets", "darkness", "monster", "shadows", "decorations", "moonlight", "spiderweb", "disguise", "night", "supernatural", "october", "superstition", "holiday", "orange", "party", "trick", "treat"];
var usedWords = [];
var lettersGuessed = [];
var answerWord = "";
var shown = "";
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var imageList = ["assets/images/ghost.png", "assets/images/moon.png", "assets/images/pumpkin.png", "assets/images/spiderweb.png"];
var lastImage = "";

// Choose a random word from word array.
function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function chooseWord() {
    var result = randomWord();
    while (usedWords.indexOf(result) > -1) {
        var result = randomWord();
    }
    return result;
}

// Place an image randomly from list.
function randomImg() {
    var img = document.getElementById("header");
    img.src = imageList[Math.floor(Math.random() * imageList.length)];
    img.alt = img.src.slice(img.src.indexOf("images/"), img.src.indexOf("."));
}
randomImg();

// Convert a word into blanks.
function blanks(wordToBlank) {
    var result = "";

    for (var i = 0; i < wordToBlank.length; i++) {
        result += "-";
    }
    return result;

}


function alterAt(index, char, str) {
    return str.substr(0, index) + char + str.substr(index + 1);
}

// Initiating first word to guess.
function initiate() {
    answerWord = chooseWord();
    randomImg();
    shown = blanks(answerWord);
    guesses = 15;
    lettersGuessed = [];
}
initiate();

// Sending new blanked word to HTML document.
document.getElementById("shown").textContent = shown;


document.onkeypress = function(event) {
    var userGuess = event.key.toLowerCase();
    // Checking if letter has already been guessed.
    if (guesses <= 0) {
        alert("Out of guesses! The correct answer was " + answerWord.toUpperCase() + ".");
        initiate();
        return;
    } else if (usedWords.length >= 20) {
        alert("You guessed all of the words! Reload the page to Play again.")
        return;
    } else if (!(alphabet.indexOf(userGuess) > -1)) {
        alert("Please type a letter.");
        return;
    } else {
        for (var i = 0; lettersGuessed[i]; i++) {
            // Alert to guess a different letter, if already guesseds
            console.log("i:" + i);
            if (userGuess === lettersGuessed[i]) {
                alert("Already guessed " + userGuess + ".");
                return;
            }
        }
    }
    // Adding newly guess letter to lettersGuessed.
    lettersGuessed.push(userGuess);
    document.getElementById("lettersGuessed").textContent = lettersGuessed;
    // For each letter in the answerWord...
    for (var i = 0; answerWord[i]; i++) {
        // ...checking if letter matches a letter in the answer...
        if (userGuess === answerWord[i]) {
            // ...and showing the letter guess if there is a match. 
            shown = alterAt(i, userGuess, shown);
        }
    }
    // Checking if successfully guessed word.
    if (shown === answerWord) {
        alert("You correctly guessed: " + answerWord.toUpperCase() + ".");
        usedWords.push(answerWord);
        initiate();
        console.log(usedWords);
        wins++;
    } else {
        guesses--;
    }

    document.getElementById("shown").textContent = shown;
    document.getElementById('wins').textContent = wins;
    document.getElementById('guesses').textContent = guesses;
    document.getElementById('lettersGuessed').textContent = lettersGuessed;
}