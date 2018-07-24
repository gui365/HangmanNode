// Require Letter
var Letter = require ("./letter");

function Word(newWord) {
  this.word = newWord.split("");
  this.wordObjects = [];
  for (let i = 0; i < this.word.length; i++) {
    if (this.word[i] === " ") {
      this.wordObjects.push(" ");
    } else {
      var letter = new Letter(this.word[i]);
      this.wordObjects.push(letter);
    }
  };
}

Word.prototype.returnString = function() {
  // call Letter.reveal for each letter of the word, and concatenate the letters into a string
  var wordString = [];

  for (let i = 0; i < this.wordObjects.length; i++) {
    if (this.wordObjects[i] === " ") {
      wordString.push(" ");
    } else {
      wordString.push(this.wordObjects[i].reveal());
    }
  };

  return wordString.join(" ");
}

Word.prototype.guess = function(char) {
  // call Letter.updateBoolean for each letter of the word
  for (let i = 0; i < this.wordObjects.length; i++) {
    this.wordObjects[i].updateBoolean(char.toUpperCase());
    // console.log(this.wordObjects[i].guessed);
  };
}

module.exports = Word;

