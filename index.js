// Require inquirer and the Word constructor
var inquirer = require("inquirer");
var Word = require("./word");

// Global variables
var guessesLeft = 10;
var arrayWords = ['GOALKEEPER', 'FORWARD', 'CHAMPION', 'GOAL', 'REFEREE', 'EXTRA TIME',
'MATCH BALL', 'FAIR PLAY', 'OFFSIDE', 'SIDELINE', 'SUBSTITUTION', 'INJURY', 'FREE KICK',
'PENALTY KICK', 'CORNER FLAG', 'MIDFIELDER', 'WORLD CUP', 'RED CARD', 'YELLOW CARD', 'FINAL',
'WINGER', 'TROPHY', 'SHINGUARDS', 'CLEATS', 'TOURNAMENT', 'GLORY', 'STOPPER', 'STRIKER',
'STADIUM', 'GROUP STAGE', 'SWEEPER', 'FULL BACK', 'CENTRE BACK', 'JERSEY', 'WHISTLE'];
var secretWord = new Word(arrayWords[Math.floor(Math.random() * arrayWords.length)]);

// Prompt the user to guess a letter
function promptUser() {
  console.log(secretWord.returnString());
  inquirer.prompt([
    {
      type: "input",
      message: "Guess a letter",
      name: "character"
    }
  ]).then(function(response) {
    var responseUpper = response.character.toUpperCase();
    var guessedCorrectly = false;

    secretWord.guess(responseUpper);
    
    for (let i = 0; i < secretWord.wordObjects.length; i++) {
      console.log(secretWord.wordObjects[i].guessed);
      
      if (secretWord.wordObjects[i].character === responseUpper) {
        guessedCorrectly = true;
      };
    };

    if (guessedCorrectly) {
      console.log(`You got that one right! Keep going
      `);
    } else {
      guessesLeft --;
      console.log(`Not in the word. You've got ${guessesLeft} guesses left
    `);
    }
    
    guessedCorrectly = false;
    promptUser();
  });  
};

promptUser();

// console.log('\x1b[33m%s\x1b[0m', "Yellow");
// console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
// console.log('\x1b[46m', secretWord.returnString());