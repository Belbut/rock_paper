/*

A function named getComputerChoice, that will return 
a random option between "ROCK" "PAPER" "SCISSOR".

-CREATE A CONSTANT VARIABLE NAMED GAME_POSSIBLE_CHOICES_ARRAY OF TYPE ARRAY.
(would be best with a object but we haven't reach that part yet)

-CREATE FUNCTION named getComputerChoice with no needed input variable
    -create a variable named idComputerChoice
        -idComputerChoice will store a random generated number 
        between 1 and 3
    -convert the result int idComputerChoice into a string of available choices
    -return the computer choice
*/

const GAME_POSSIBLE_CHOICES_ARRAY = ["Rock", "Paper", "Scissor"];

function getComputerChoice() {
    let idComputerChoice = Math.floor(Math.random()*3);
    return GAME_POSSIBLE_CHOICES_ARRAY[idComputerChoice]
}

console.log(getComputerChoice())