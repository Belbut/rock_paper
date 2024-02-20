
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

const weaponsButtons = document.querySelectorAll(".weapons button");
const weapon1 = document.querySelector(".display .player1.weapon");
const weapon2 = document.querySelector(".display .player2.weapon");
const message = document.querySelector(".message");
const healthBar = document.querySelectorAll(".hp");
const player1AvatarImg = document.querySelector(".player1 .avatar");
const player2AvatarImg = document.querySelector(".player2 .avatar");
const weaponsMessage = document.querySelector(".weapons h3")

var sleepSetTimeout_ctrl;
let listenerWeaponClick;


async function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}


onGameStart()


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

}

function removeHitpoint(playerElement) {
    let topHitpointElement = playerElement.querySelector(".health-bar .active-hitpoint");
    topHitpointElement.classList.replace("active-hitpoint", "inactive-hitpoint")
}

function checkGameWinner() {

    if (player_1_hitpoints == 0) {//player 2 won
        player1AvatarImg.style.transform = "rotate(270deg)"
        message.textContent = "You were defeated!"
        onGameEnd()


    }

    if (player_2_hitpoints == 0) {//player 1 won
        player2AvatarImg.style.transform = "rotate(90deg)"
        message.textContent = "You slayed the dragon!"
        onGameEnd()


    }

}

function onGameStart() {
    healthBar.forEach((hp) => {
        hp.classList.add("active-hitpoint")
        hp.classList.remove("inactive-hitpoint")
    });

    message.textContent = "Brace for Battle"

    window.addEventListener('DOMContentLoaded', () => {
        listenerWeaponClick = function () {
            playRound(this.id, getComputerChoice());
        };

        weaponsButtons.forEach((btn) => btn.addEventListener("click", listenerWeaponClick));
    });

    player1AvatarImg.style.transform = ""
    player2AvatarImg.style.transform = ""

    weaponsMessage.textContent = "Pick Your Weapon"

}


async function onGameEnd() {
    weaponsButtons.forEach((btn) => btn.removeEventListener("click", listenerWeaponClick));
    await sleep(1000)
    weaponsMessage.textContent = "Gadder your weapons if you would like to fight again!"
    weaponsButtons.forEach((btn) => btn.addEventListener("click", () => location.reload()));
}


