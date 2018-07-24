function Letter(character) {
  this.character = character;
  this.guessed = false;
};

Letter.prototype.reveal = function() {
  // reveal character if guessed correctly. display a letter or a "_"
  if (this.guessed) {
    return this.character.toUpperCase();
  } else {
    return "_";
  }
};

Letter.prototype.updateBoolean = function(char) {
  // letter has already been guessed
  if (char === this.character.toUpperCase()) {
    this.guessed = true;
  }
};

module.exports = Letter;