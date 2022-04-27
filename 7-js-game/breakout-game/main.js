const grid = document.querySelector('.grid');
const gridWidth = 600;
const gridHeight = 300;
grid.style.width = gridWidth + 'px';
grid.style.height = gridHeight + 'px';

const blockWidth = 100;
const blockHeight = 20;
const blockColumn = 6;
const blockRow = 4; 
const userWidth = 600;
const userHeight = 20;

const velocity = 10;

class Block {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class User {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    width = 600;
    height = 20;
}


let blocks = [];

const createBlocks = (row, column) => {
    for(let i= 0 ; i < row; i++){
        for(let j = 0; j < column; j++){
            blocks.push(new Block(j*blockWidth, i*blockHeight));
        }
    }
}
createBlocks(blockRow,blockColumn);

const drawBlocks = () => {
    blocks.forEach(blockItem => {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = `${blockItem.x}px`;
        block.style.top = `${blockItem.y}px`;
        blockItem.object = block;
        grid.appendChild(block);
    }); 
}
drawBlocks();

const user = new User((gridWidth - userWidth)/2, gridHeight - userHeight - 30);
const drawUser = () => {
    const block = document.createElement('div');
    block.classList.add('user');
    block.style.left = `${user.x}px`;
    block.style.top = `${user.y}px`;
    block.style.width = `${user.width}px`;
    block.style.height = `${user.height}px`;
    grid.appendChild(block);
    user.object = block;
}
drawUser();

const updateUser = () => {
    user.object.style.left = `${user.x}px`;
    user.object.style.top = `${user.y}px`;
}

const moveUser = (e) => {
    switch(e.key){
        case 'ArrowLeft':
            if(user.x >= velocity){
                user.x -= velocity;
                updateUser();
            } 
            
            break;
        case 'ArrowRight':
            if(user.x <= gridWidth - velocity - blockWidth){
                user.x += velocity;
                updateUser();
            } 
            break;
        case 'ArrowUp' : {
            if(user.y >= 0){
                user.y -= velocity;
                updateUser();
            }
            break;
        }
        case 'ArrowDown' : {
            if(user.y <= gridHeight - blockHeight - 10 ){
                user.y += velocity;
                updateUser();
            }
            break;
        }
        default:
            break;
    }
}

document.addEventListener('keydown', moveUser);


class Ball {
    constructor(x = gridWidth /2 - 10,y = gridHeight - 70){
        this.x = x; 
        this.y = y;
    }
    velocity = 20;
    xDirection = -1;
    yDirection = -1;
    step = 2;
    width = 20;
    height = 20;
}

// render ball
const ball = new Ball();
let gameTimer = null;

const drawBall = () => {
    ball.object = document.createElement('div');
    ball.object.classList.add('ball');
    ball.object.style.left =  ball.x + 'px';
    ball.object.style.top =  ball.y + 'px';
    grid.appendChild(ball.object);
}
drawBall();

// check for collision
const checkCollision = () => {
    // check block collision
    blocks.forEach(block => {
        // Top bottom edge
        if(block.x - ball.width/2 < ball.x && block.x + blockWidth - ball.width/2> ball.x){
            if(block.y + blockHeight >= ball.y && ball.y >= block.y) {
                ball.yDirection = +1;
                block.object.style.display = 'none';
                blocks = blocks.filter(function(item) {
                    return item !== block;
                })
                if(blocks.length == 0) {
                    alert("You win");
                }
            }
        }
    });
    
    //Check user collision
    if(
        user.x - ball.width/2 < ball.x && 
        user.x + user.width + ball.width/2> ball.x &&
        user.y - ball.height <= ball.y &&
        user.y + user.height - ball.height >= ball.y
    ){
        ball.yDirection = -1;
    }


    // check for wall collision
    if(ball.y <= 0) ball.yDirection = 1;
    else if(ball.x >= gridWidth - 20) ball.xDirection = -1;
    else if(ball.x <= 0) ball.xDirection = 1;
    else if(ball.y > gridHeight - 30) {
        alert("Game over");
        clearInterval(gameTimer);
    }

    return false;
}


const updateBall = () => {
    // console.log(checkCollision());
    checkCollision();
    ball.x += ball.step * ball.xDirection;
    ball.y += ball.step * ball.yDirection;
    ball.object.style.left =  ball.x + 'px';
    ball.object.style.top =  ball.y + 'px';
}

gameTimer = setInterval(updateBall, ball.velocity);










