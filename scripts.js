
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
let player_1_hitpoints = 3;
let player_2_hitpoints = 3;

function getComputerChoice() {
    let idComputerChoice = Math.floor(Math.random() * 3);
    return WEAPONS_ARRAY[idComputerChoice]
}

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

const weapon1 = document.querySelector(".display .player1.weapon")
const weapon2 = document.querySelector(".display .player2.weapon")

function displayRoundWeapons(roundChoices) {
    var img1 = createElementImageWeapon(roundChoices[0])
    var img2 = createElementImageWeapon(roundChoices[1])
    weapon1.replaceChildren(img1)
    weapon2.replaceChildren(img2)
}

function createElementImageWeapon(weapon) {
    var img = document.createElement("img")

    switch (weapon) {
        case WEAPONS_ARRAY[0]://rock
            img.src = "./img/rock.png"
            img.alt = weapon
            break;

        case WEAPONS_ARRAY[1]://paper
            img.src = "./img/paper.png"
            img.alt = weapon
            break;

        case WEAPONS_ARRAY[2]://scissor
            img.src = "./img/scissor.png"
            img.alt = weapon
            break;
    }

    return img
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

    
    presentRoundWinner(gameResult);
    checkGameWinner();

}

const message = document.querySelector(".message")

function presentRoundWinner(gameResult) {
    let player1 = document.querySelector(".player1") 
    let player2 = document.querySelector(".player2") 
    switch (gameResult) {
        case ROUND_RESULTS_ARRAY[0]: //PLAYER 1 WON
            player_2_hitpoints--;
            removeHitpoint(player2)
            message.textContent = ROUND_RESULT_0_MESSAGE;
            break;

        case ROUND_RESULTS_ARRAY[1]://PLAYER 2 WON
            player_1_hitpoints--;
            removeHitpoint(player1)
            message.textContent = ROUND_RESULT_1_MESSAGE;
            break;

        case ROUND_RESULTS_ARRAY[2]://DRAW
            message.textContent = ROUND_RESULT_2_MESSAGE;
            break;
    }

    
/*     return gameResult
 */}

function removeHitpoint(playerElement){
   let topHitpointElement = playerElement.querySelector(".health-bar .active-hitpoint");
   topHitpointElement.classList.replace("active-hitpoint" , "inactive-hitpoint")
}

function checkGameWinner(){

}

/* function playComputerGame(numberOfRounds = 5) {
    for (let i = 0; i < numberOfRounds; i++) {
        playRound(getComputerChoice(), getComputerChoice())
    }
    console.log(`Final result player1= ${player_1_victories} and player2= ${player_2_victories} from a total of ${numberOfRounds} games.`)
} */

const weaponsButtons = document.querySelectorAll(".weapons button");

weaponsButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        playRound(btn.id, getComputerChoice())
    }
    )
)

