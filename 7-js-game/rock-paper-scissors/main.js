const computerChoice = document.querySelector('.computer-choice');
const userChoiceDisplay = document.querySelector('.user-choice');
const resultDisplay = document.querySelector('.result');
const possibleChoices = document.querySelectorAll('.button');
let userChoice;
let currentUserChoice;
let currentComputerChoice;

let choice = ['rock', 'paper', 'scissors'];
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=>{
    userChoice = e.target.id;
    if(userChoice == 'rock'){
        currentUserChoice = 0;
    }
    else if(userChoice == 'paper'){
        currentUserChoice = 1;
    }
    else {
        currentUserChoice = 2;
    }
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
}))

const generateComputerChoice = () => {
    var randomNum = Math.floor(Math.random() * 3);    
    currentComputerChoice = randomNum;
    computerChoice.innerHTML = choice[randomNum];
}

const getResult = () => {
    if(currentUserChoice == currentComputerChoice){
        resultDisplay.innerHTML = "Draw!!!";
    }
    else if(currentComputerChoice == 0 && currentUserChoice == 1){
        resultDisplay.innerHTML = "You win!!";
    }
    else if(currentComputerChoice == 0 && currentUserChoice == 2){
        resultDisplay.innerHTML = "You lose!!";
    }
    else if(currentComputerChoice == 1 && currentUserChoice == 2){
        resultDisplay.innerHTML = "You win!!";
    }
    else if(currentComputerChoice == 1 && currentUserChoice == 0){
        resultDisplay.innerHTML = "You lose!!";
    }
    else if(currentComputerChoice == 2 && currentUserChoice == 0){
        resultDisplay.innerHTML = "You win!!";
    }
    else if(currentComputerChoice == 2 && currentUserChoice == 1){
        resultDisplay.innerHTML = "You lose!!";
    }

}