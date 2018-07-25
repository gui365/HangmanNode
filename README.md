# Soccer Hangman - Node app

This project was the homework for week 11 of the Penn Coding Boot Camp.

## Goal
To build a hangman game using constructor functions and node packages.

## Installation and Set-up
Make sure to run *npm install* at the root directory after cloning the project.

## Functionality
This application can be run by typing *node index.js*, or by executing the *hangman* script (npm run hangman).
When the game starts, it shows the game logo and prompts the user for a letter. If the letter is part of the secret word, it will be revealed. Otherwise, the user loses a life and the game goes on until one of two things happen:
1. **The user runs out of lives**: When the user's lives are equal to 0, the game ends. The secret word is revealed and the game restarts after 3 seconds.
2. **The user guesses correctly all the letters in the word**: When all of the letters in the word are revealed, the user wins and the game restarts after 3 seconds.
To exit the game press **Ctrl+C**.

## Objective
* To find, research and implement npm packages.
* To build objects by using constructor functions.
* To understand the concept of prototypical inheritance and apply it to this assignment.

## Built using:
* JavaScript
* NodeJS

## Authors
**Guillermo Barila** - *Author*