
const WEAPONS_ARRAY = ["Rock", "Paper", "Scissor"];
const PLAYER_1_NAME = ["Player 1"]; //WILL NOT BE A CONST FOR LONG
const PLAYER_2_NAME = ["Player 2"];
const ROUND_RESULTS_ARRAY = [PLAYER_1_NAME, PLAYER_2_NAME, "Draw"];
const MAKE_CHOICE_MESSAGE = "Chose your weapon wisely";
const CANCEL_PROMPT_MESSAGE = "Player was afraid to play";
const WONG_WEAPON_MESSAGE = "Wrong weapon please select from \"rock, paper or scissor\""
const ROUND_RESULT_0_MESSAGE = `The battle was won by ${ROUND_RESULTS_ARRAY[0]}`;
const ROUND_RESULT_1_MESSAGE = `The battle was won by ${ROUND_RESULTS_ARRAY[1]}`;;
const ROUND_RESULT_2_MESSAGE = "The battle was a Draw";
const WEAPON_SELECTED_MESSAGE = "Player weapon: ";
let player_1_victories = 0;
let player_2_victories = 0;
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
-CREATE FUNCTION named getPlayerChoiceByPrompt with no needed input variable
    -create a variable named playerChoice
        -will store the choice from the player from received input.
        -standardize input to be case insensitive
        -if problem arise due to bad input prompt again.
    return standardized player choice 
*/
function getPlayerChoiceByPrompt() {
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
        return getPlayerChoiceByPrompt()
    }
}

/* 
-CREATE FUNCTION named playRound with 2 input variable playerChoice AND computerChoice
    create variable roundChoices that is (playerChoice,computerChoice) 
        -playerChoice that will receive from getPlayerChoiceByPrompt
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

const weapon1 = document.querySelector(".display-results .player1")
const weapon2 = document.querySelector(".display-results .player2")

function displayRoundWeapons(roundChoices) {
    weapon1.textContent = roundChoices[0]
    weapon2.textContent = roundChoices[1]
}

function playRound(playerChoice, computerChoice) {
    let roundChoices = [playerChoice, computerChoice];

    displayRoundWeapons(roundChoices)

    let gameResult;
    switch (roundChoices.toString()) {
        case "Rock,Scissor":
        case "Paper,Rock":
        case "Scissor,Paper":
            gameResult = ROUND_RESULTS_ARRAY[0];
            break;

        case "Rock,Paper":
        case "Paper,Scissor":
        case "Scissor,Rock":
            gameResult = ROUND_RESULTS_ARRAY[1];
            break

        case "Rock,Rock":
        case "Paper,Paper":
        case "Scissor,Scissor":
            gameResult = ROUND_RESULTS_ARRAY[2];
            break;

    }
    return presentWinner(gameResult);

}

/* -CREATE FUNCTION named presentWinner() with one variable gameResult that should be one of the 3 possible game Results

    -Create simple 3 case switch statement for the results and directing to the messages
 
    */

const message = document.querySelector(".message")

function presentWinner(gameResult) {
    switch (gameResult) {
        case ROUND_RESULTS_ARRAY[0]: //PLAYER 1 WON
            player_1_victories++;
            message.textContent = ROUND_RESULT_0_MESSAGE;
            break;

        case ROUND_RESULTS_ARRAY[1]://PLAYER 2 WON
            player_2_victories++;
            message.textContent = ROUND_RESULT_1_MESSAGE;

            break;

        case ROUND_RESULTS_ARRAY[2]://DRAW
            message.textContent = ROUND_RESULT_2_MESSAGE;

            break;
    }
    return gameResult
}

function playComputerGame(numberOfRounds = 5) {
    for (let i = 0; i < numberOfRounds; i++) {
        playRound(getComputerChoice(), getComputerChoice())
    }
    console.log(`Final result player1= ${player_1_victories} and player2= ${player_2_victories} from a total of ${numberOfRounds} games.`)
}

const weaponsButtons = document.querySelectorAll(".weapon");

weaponsButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        playRound(btn.textContent, getComputerChoice())
    }
    )
)

