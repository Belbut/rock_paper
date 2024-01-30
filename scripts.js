
/* -CREATE A CONSTANT VARIABLE NAMED WEAPONS_ARRAY OF TYPE ARRAY.
(would be best with a object but we haven't reach that part yet) */

const WEAPONS_ARRAY = ["Rock", "Paper", "Scissor"];
const GAME_RESULTS_ARRAY = ["PLAYER 1", "PLAYER 2", "DRAW"];
const MAKE_CHOICE_MESSAGE = "Chose your weapon wisely";
const CANCEL_PROMPT_MESSAGE = "Player was afraid to play";
const WONG_WEAPON_MESSAGE ="Wrong weapon please select from \"rock, paper or scissor\""
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
    return WEAPONS_ARRAY[idComputerChoice]
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
    let playerChoice = prompt(MAKE_CHOICE_MESSAGE);
    if (playerChoice === null) {
        console.log(CANCEL_PROMPT_MESSAGE)
        return;
    }
    let standPlayerChoice = playerChoice.trim();
    standPlayerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();

    let isChoiceValid = WEAPONS_ARRAY.includes(standPlayerChoice);
    if (isChoiceValid) {
        return standPlayerChoice;
    } else {
        alert(WONG_WEAPON_MESSAGE)
        return getPlayerChoice()
    }
}

/* 
-CREATE FUNCTION named playRound with 2 input variable playerChoice AND computerChoice
    create variable roundChoices that is (playerChoice,computerChoice) 
        -playerChoice that will receive from getPlayerChoice
        -computerChoice that will receive from getComputerChoice
        
        -create a switch tree for the possible outcomes:
            Define winner based on the choices of each player
            Rock- Scissor : win
            Rock- Paper : loss
            Rock - Rock : draw
            Paper - Rock : win
            Paper - Scissor :loss
            Paper - Paper : draw
            Scissor - Scissor: draw
            Scissor - Paper: win
            Scissor - Rock: loss

        return result from the round
    
*/

function playRound(playerChoice, computerChoice) {
    let roundChoices = [playerChoice, computerChoice];

    switch (roundChoices.toString()) {
        case "Rock,Scissor":
        case "Paper,Rock":
        case "Scissor,Paper":
            return GAME_RESULTS_ARRAY[0];
 
        case "Rock,Paper":
        case "Paper,Scissor":
        case "Scissor,Rock":
            return GAME_RESULTS_ARRAY[1];
 
        case "Rock,Rock":
        case "Paper,Paper":
        case "Scissor,Scissor":
            return GAME_RESULTS_ARRAY[2];
    } 
}

/* -CREATE FUNCTION named presentWinner
 */
console.log(playRound(getComputerChoice(), getComputerChoice()))