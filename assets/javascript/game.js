var wins = 0;
var guesses = 15;
var words = ["lantern", "prank", "costume", "sweets", "darkness", "monster", "shadows", "decorations", "moonlight", "spiderweb", "disguise", "night", "supernatural", "October", "superstition", "holiday", "orange", "party", "trick", "treat"];
var lettersGuessed = [];
var answerWord = "";
var shown = "";

// Choose a random word from word array.
function chooseWord() {
    return words[Math.floor(Math.random() * words.length)];
}

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

answerWord = chooseWord();
shown = blanks(answerWord);


document.onkeypress = function(event) {
    var userGuess = event.key.toLowerCase;
    // Checking if letter has already been guessed.
    for (i = 0; i < lettersGuessed.length; i++) {
        // Alert to guess a different letter, if already guessed.
        if (userGuess === lettersGuessed[i]) {
            return alert("Already guessed " + userGuess + ".");
        } else {
            // Adding newly guess letter to lettersGuessed.
            lettersGuessed.push(userGuess);
            // For each letter in the answer...
            for (var i = 0; i < answer.length; i++) {
                // ...checking if letter matches a letter in the answer...
                if (userGuess === answerWord[i]) {
                    // ...and showing the letter guess if there is a match. 
                    shown = alterAt(i, userGuess, shown);
                }
                // Checking if successfully guessed word.
                if (shown === answer) {
                    alert("You correctly guessed: " + answerWord);
                    wins++;
                    answerWord = chooseWord(blanks());
                } else {
                    guesses--;
                }

                if (guesses === 0) {
                    alert("Out of guesses! Reload the page to play again.")
                }
            }
            document.getElementById('wins').innerHTML = wins;
            document.getElementById('guesses').innerHTML = guesses;
        }

    }
}