// Require inquirer and the Word constructor
var inquirer = require("inquirer");
var Word = require("./word");

// Global variables
var userWins = 0;
var userLoss = 0;
var acceptedInput = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var guessesLeft = 10;
var arrayWords = ['GOALKEEPER', 'FORWARD', 'CHAMPION', 'GOAL', 'REFEREE', 'EXTRA TIME',
'MATCH BALL', 'FAIR PLAY', 'OFFSIDE', 'SIDELINE', 'SUBSTITUTION', 'INJURY', 'FREE KICK',
'PENALTY KICK', 'CORNER FLAG', 'MIDFIELDER', 'WORLD CUP', 'RED CARD', 'YELLOW CARD', 'FINAL',
'WINGER', 'TROPHY', 'SHINGUARDS', 'CLEATS', 'TOURNAMENT', 'GLORY', 'STOPPER', 'STRIKER',
'STADIUM', 'GROUP STAGE', 'SWEEPER', 'FULL BACK', 'CENTRE BACK', 'JERSEY', 'WHISTLE'];
var secretWord;
var pickedLetters = [];

function printLogo() {
console.log(`                                             ##
                                             ####
                                 @@@@@@@@&    ##
                                         @@@@@@
                                        @@@@@@ @
                                 @     @@@@@    @
                                  @   @@@@@      @
                                  @ @@@@@@
                                   @  %@@
                                     @@
                                   @&
                                  @    @@@
                                        @`);
console.log("\u001b[36m",`   @@&&&@@      @@&&&@@      @@&&&&@\\\      %@@&&&@\\\  @&&&&&&&@ @@&&&&&&@@
  @@@@@@@@@@@  @@@@@@@@@@@  @@@@@@@@@@@   @@@@@@@@@&@ @@@@@@@@@ @@@@@@@@@@@@
 @@@@@    @@/  @@@@   @@@@  @@@@%  @@@@@ @@@@@  %@@@@ @@@@      @@@@@   @@@@
  @@@@@@@      @@@@   @@@@  @@@@%        @@@@@        @@@@      @@@@@  @@@@@
   @@@@@@@@@   @@@@   @@@@  @@@@%        @@@@@        @@@@@@@@  @@@@@@@@@@@
        @@@@@  @@@@   @@@@  @@@@%  @&@@@ @@@@@  %&&@@ @@@@      @@@@@  @@@@@
  @@@@  @@@@@  @@@@@@@@@@@  @@@@@  @@@@@ @@@@@  @@@@@ @@@@      @@@@@   @@@@
   @@@@@@@@@    @@@@@@@@@    &@@@@@@@@@   &@@@@@@@@@  @@@@@@@@@ @@@@@   @@@@
                                                                          \\\@@
  @@    @@    .&&.    @&\\\    &@   /@@@@|   @@%    .@@    .&&.    @&\\\    &@
  @@    @@    /@@\\\    @@@\\\   @@  @     &@  @@@@  /@@@    /@@\\\    @@@\\\   @@
  @@    @@    @)(@    @@ @\\\  @@  @         @@  @/@ @@    @)(@    @@ @\\\  @@
  @@@@@@@@   &&  @&   @@  @\\\ @@  @   @@@@  @@  *%  @@   &&  @&   @@  @\\\ @@
  @@    @@   @@@@@@   @@   @\\\@@  @     @/  @@      @@   @@@@@@   @@   @\\\@@
  @@    @@  &@    @#  @@    @@@   @@@@@@   @@      @@  &@    @#  @@    @@@`);
}

function pickRandomWord() {
  secretWord = new Word(arrayWords[Math.floor(Math.random() * arrayWords.length)]);
};

// Prompt the user to guess a letter
function promptUser() {
  console.log(`\x1b[37;40m
  ${secretWord.returnString()}
  `);
  inquirer.prompt([
    {
      type: "input",
      message: `
  Pick a letter`,
      name: "character"
    }
  ]).then(function(response) {
    var responseUpper = response.character.toUpperCase();

    if (responseUpper.length < 1) {
      console.log(`\x1b[31;40m ►> \x1b[37;40mPlease enter a letter \x1b[31;40m<◄ `);
      promptUser();
    } else if (responseUpper.length > 1) {
      console.log(`\x1b[31;40m ►> \x1b[37;40mPlease enter only one letter at a time \x1b[31;40m<◄ `);
      promptUser();
    } else if (acceptedInput.indexOf(responseUpper) === -1) {
      console.log(`\x1b[31;40m ►> \x1b[37;40mPlease enter a valid character \x1b[31;40m<◄ `);
      promptUser();
    } else if (pickedLetters.indexOf(responseUpper) !== -1) {
      console.log(`\x1b[31;40m ►> \x1b[37;40mYou've already picked that letter. Try another one \x1b[31;40m<◄ `);
      promptUser();
    } else {
      var guessedCorrectly = false;

      pickedLetters.push(responseUpper);
      secretWord.guess(responseUpper);
      
      for (let i = 0; i < secretWord.wordObjects.length; i++) {
        if (secretWord.wordObjects[i].character === responseUpper) {
          guessedCorrectly = true;
        };
      };

      if (guessedCorrectly) {
        // Check for a win
        if (!secretWord.returnString().includes("_")) {
          console.log("\x1b[30;42m", `You win!!! The secret word was ${secretWord.wordOriginal} `);
          userWins++;
          restartGame();
          return;
        } else {
          console.log(`You got that one right! Keep going
          `);
        }

      } else {
        guessesLeft --;
        console.log(`Not in the word. You've got ${guessesLeft} guesses left
      `);
      
        // Check for a loss
        if (guessesLeft === 0) {
          console.log("\x1b[97;41m", `You lost! The secret word was ${secretWord.wordOriginal} `);
          userLoss++;
          restartGame();
          return;
        }
      };
      
      guessedCorrectly = false;
      promptUser();
    };
  });  
};

function restartGame() {
  setTimeout(() => {
    console.log(`\x1b[33;40m
  ╔══════════════════════════════════╗
  ║ SCOREBOARD ->  Won: ${userWins} / Lost: ${userLoss}  ║
  ╚══════════════════════════════════╝`);
    pickRandomWord();
    promptUser();
    guessesLeft = 10;
    pickedLetters.length = 0;
  }, 3000);
}

printLogo();
pickRandomWord();
promptUser();

// console.log('\x1b[33m%s\x1b[0m', "Yellow");
// console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
// console.log('\x1b[46m', secretWord.returnString());