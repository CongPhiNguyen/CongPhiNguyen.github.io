const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

const timeLeftDisplay = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerID = null;
let mainTimerID = null;

const randomSquare = () => {
    squares.forEach(square => {
        square.style.backgroundImage = "none";
    })
    let randomSquarePos = squares[Math.floor(Math.random()*9)];
    randomSquarePos.style.backgroundImage = "url('./assets/raiden-1.png')";
    hitPosition = randomSquarePos.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
            square.style.backgroundImage = "url('./assets/raiden-2.jpg')";
            setTimeout(()=>{
                square.style.backgroundImage = "none";
            }, 400)
        }
    })
})


const moveMole = () => {
    
    timerID = setInterval(randomSquare, 500);
}

moveMole();

const countDown = () => {
    currentTime --;
    if(currentTime==0){
        clearInterval(mainTimerID);
        clearInterval(timerID);
    }
    timeLeftDisplay.textContent = currentTime;
}

mainTimerID = setInterval(countDown, 1000);