class Grid {
    width = 360;
    height = 360;
}
const grid = new Grid();
const gridDisplay = document.querySelector('.grid');
gridDisplay.style.width = grid.width + 'px';
gridDisplay.style.height = grid.height + 'px';

class Cell {
    width = 40;
    height = 40;
}

const cells = [];

const createBlankCell = (count) => {
    for(var i = 0; i < count; i++){
        var cell = new Cell();
        cell.object = document.createElement('div');
        cell.object.classList.add('cell');
        cell.object.style.width = cell.width + 'px';
        cell.object.style.height = cell.height + 'px';
        cells.push(cell);
    }
}

const createLeftCell = (count) => {
    for(var i = 0; i < count; i++){
        var cell = new Cell();
        cell.object = document.createElement('div');
        cell.object.classList.add('log-left');
        cell.object.classList.add('cell');
        cell.object.classList.add(`l${i%5 + 1}`)
        
        cell.object.style.width = cell.width + 'px';
        cell.object.style.height = cell.height + 'px';
        cells.push(cell);
    }
}

const createRightCell = (count) => {
    for(var i = 0; i < count; i++){
        var cell = new Cell();
        cell.object = document.createElement('div');
        cell.object.classList.add('log-right');
        cell.object.classList.add('cell');
        cell.object.classList.add(`l${(i+4)%5 + 1}`);
        
        cell.object.style.width = cell.width + 'px';
        cell.object.style.height = cell.height + 'px';
        cells.push(cell);
    }
}

const createLeftCar = (count) => {
    for(var i = 0; i < count; i++){
        var cell = new Cell();
        cell.object = document.createElement('div');
        cell.object.classList.add('car-left');
        cell.object.classList.add('cell');
        cell.object.classList.add(`c${i%3 + 1}`);

        cell.object.style.width = cell.width + 'px';
        cell.object.style.height = cell.height + 'px';
        cells.push(cell);
    }
}

const createRightCar = (count) => {
    for(var i = 0; i < count; i++){
        var cell = new Cell();
        cell.object = document.createElement('div');
        cell.object.classList.add('car-right');
        cell.object.classList.add('cell');
        cell.object.classList.add(`c${(i+2)%3 + 1}`);


        cell.object.style.width = cell.width + 'px';
        cell.object.style.height = cell.height + 'px';
        cells.push(cell);
    }
}

const createEndingCell = () => {
    var cell = new Cell();
    cell.object = document.createElement('div');
    cell.object.classList.add('ending-block');
    cell.object.classList.add('cell');
    cell.object.style.width = cell.width + 'px';
    cell.object.style.height = cell.height + 'px';
    cells.push(cell);
}

const createStartCell = () => {
    var cell = new Cell();
    cell.object = document.createElement('div');
    cell.object.classList.add('starting-block');
    cell.object.classList.add('cell');
    cell.object.style.width = cell.width + 'px';
    cell.object.style.height = cell.height + 'px';
    cells.push(cell);
}

const createAllCell = () => {
    createBlankCell(4);
    createEndingCell();
    createBlankCell(13);
    createLeftCell(9);
    createRightCell(9);
    createBlankCell(9);
    createLeftCar(9);
    createRightCar(9);
    createBlankCell(13);
    createStartCell(); 
    createBlankCell(4); 
}

createAllCell();

const renderAllCell = () => {
    cells.forEach((cell) => {
       gridDisplay.appendChild(cell.object);
   }); 
}

renderAllCell();


const timerDisplay = document.querySelector('.time-left');
let timeLeft = 4;
var timerID = null;

const updateTimer = () => {
    
    if(timeLeft>0) timeLeft --;
    else{
        clearInterval(timerID);
        isEndGame = true;
        resultDisplay.textContent = "You lose!";
    } 
    timerDisplay.textContent = timeLeft;
}

const startTimer = () => {
    timerID = setInterval(updateTimer, 1000);
}

startTimer();

const resultDisplay = document.querySelector('.result');
const startPauseButton = document.querySelector('.start-pause-button');

class Frog {
    currentX = 4;
    currentY = 8; 
}

const cellLength = 9;

let frog = new Frog();
const renderFrog = () => {
    cells[frog.currentY * cellLength + frog.currentX].object.classList.add('frog');
}
renderFrog();
let isEndGame = false;

const moveFrog = (e) => {
    if(isEndGame) return;
    cells[frog.currentY * cellLength + frog.currentX].object.classList.remove('frog');
    switch(e.key){
        case "ArrowLeft": {
            if(frog.currentX>0) frog.currentX--;
            break;
        }
        case "ArrowRight": {
            if(frog.currentX<cellLength-1) frog.currentX++;
            break;
        }
        case "ArrowUp": {
            if(frog.currentY>0) frog.currentY--;
            break;
        }
        case "ArrowDown": {
            if(frog.currentY<cellLength-1) frog.currentY++;
            break;
        }
    }
    cells[frog.currentY * cellLength + frog.currentX].object.classList.add('frog');
    checkForEndGame();
}

document.addEventListener('keydown', (e) => moveFrog(e))

const logLefts = document.querySelectorAll('.log-left');
const logRights = document.querySelectorAll('.log-right');
const carLefts = document.querySelectorAll('.car-left');
const carRights = document.querySelectorAll('.car-right');

let timerMoveLog = null;

const autoMoveLogs = () => {
    logLefts.forEach((logLeft)=>{
        moveLogLeft(logLeft);
        
    })
    logRights.forEach((logRight)=> {
        moveLogRight(logRight);  
    })

    carLefts.forEach((carLeft)=>{
        moveCarLeft(carLeft);   
    })
    carRights.forEach((carRight)=>{
        moveCarRight(carRight);   
    })
    checkForEndGame();
}

const moveLogLeft = (logLeft) => {
    // console.log(logLeft.classList[1])
    let currentIndex;
    for(const element of logLeft.classList){
        if(element.indexOf('l')!=-1){
            currentIndex = element;
        }
    }
    logLeft.classList.remove(currentIndex); 
    var num = ((parseInt(currentIndex[1])) % 5 + 1);
    currentIndex = 'l' + num;
    logLeft.classList.add(currentIndex); 
}

const moveLogRight = (logRight) => {
    let currentIndex;
    for(const element of logRight.classList){
        if(element.indexOf('l')!=-1){
            currentIndex = element;
        }
    }
    
    logRight.classList.remove(currentIndex); 
    var num = ((parseInt(currentIndex[1]) + 3) % 5 + 1);
    currentIndex = 'l' + num;
    logRight.classList.add(currentIndex); 
}

const moveCarLeft = (carLeft) => {
    let currentIndex;
    for(const element of carLeft.classList){
        if(element.indexOf('c')!=-1){
            currentIndex = element;
        }
    }
    
    carLeft.classList.remove(currentIndex); 
    var num = ((parseInt(currentIndex[1])) % 3 + 1);
    currentIndex = 'c' + num;
    carLeft.classList.add(currentIndex); 
}

const moveCarRight = (carRight) => {
    let currentIndex;
    for(const element of carRight.classList){
        if(element.indexOf('c')!=-1){
            currentIndex = element;
        }
    }
    
    carRight.classList.remove(currentIndex); 
    var num = ((parseInt(currentIndex[1])+ 1) % 3 + 1);
    currentIndex = 'c' + num;
    carRight.classList.add(currentIndex); 
}

const startButton = document.querySelector('.start-pause-button');

const checkForEndGame = () => {
    var frogClass = cells[frog.currentY * cellLength + frog.currentX].object.classList;

    if (frogClass.contains('c3') || frogClass.contains('l4') || frogClass.contains('l5')){
        resultDisplay.textContent = "You lose!";
        clearInterval(timerMoveLog);
        clearInterval(timerID);
        startButton.textContent = 'Restart!';
        document.removeEventListener('keydown', (e) => moveFrog(e));
        isEndGame = true;
    }

    if (frogClass.contains('ending-block')){
        resultDisplay.textContent = "You win!";
        clearInterval(timerMoveLog);
        clearInterval(timerID);
        startButton.textContent = 'Play again!';
        document.removeEventListener('keydown', (e) => moveFrog(e));
        isEndGame = true;
    } 
}

timerMoveLog = setInterval(autoMoveLogs, 1000);

startButton.addEventListener(('click'), (e) => {
    location.reload();
})


