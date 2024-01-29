
/* -CREATE A CONSTANT VARIABLE NAMED GAME_POSSIBLE_CHOICES_ARRAY OF TYPE ARRAY.
(would be best with a object but we haven't reach that part yet) */

const GAME_POSSIBLE_CHOICES_ARRAY = ["Rock", "Paper", "Scissor"];

/*
-CREATE FUNCTION named getComputerChoice with no needed input variable
    -create a variable named idComputerChoice
        -idComputerChoice will store a random generated number 
        between 1 and 3
    -convert the result int idComputerChoice into a string of available choices
    -return the computer choice
*/
function getComputerChoice() {
    let idComputerChoice = Math.floor(Math.random() * 3);
    return GAME_POSSIBLE_CHOICES_ARRAY[idComputerChoice]
}

/*
-CREATE FUNCTION named getPlayerChoice with no needed input variable
    -create a variable named playerChoice
        -will store the choice from the player from received input.
        -standardize input to be case insensitive
        -if problem arise due to bad input prompt again.
    return standardized player choice 
*/
function getPlayerChoice() {
    let playerChoice = prompt("Chose your weapon wisely");
    if(playerChoice === null){
        console.log("Player was afraid to play")
        return;
    } 
    let standPlayerChoice = playerChoice.trim();
    standPlayerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();

    let isChoiceValid = GAME_POSSIBLE_CHOICES_ARRAY.includes(standPlayerChoice);
    if (isChoiceValid) {
        return standPlayerChoice;
    } else {
        alert("Wrong weapon please select from \"rock, paper or scissor\"")
        return getPlayerChoice()
    }
}


console.log(getPlayerChoice())