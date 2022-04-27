const gridDisplay = document.querySelector('.grid');
for(var i = 0 ; i < 56; i++){
    const cell = document.createElement('div');
    if(i>48){
        cell.classList.add('taken');
    }else {
        cell.classList.add('cell');
    }
    gridDisplay.appendChild(cell);
}

// document.addEventListener('DOMContentLoaded', (e) => {
//     console.log("loaded")
//     const squares = document.querySelectorAll('.grid div');
// })

let squares = document.querySelectorAll('.grid div');
const resultDisplay = document.querySelector('#result');   
let currentPlayerDisplay = document.querySelector('.player');
let currentPlayer = 1;

for(var index = 0 ; index < 49; index++) {  
    const i = index;
    squares[index].onclick= () => {
        if(squares[i+7].classList.contains('taken') && !squares[i].classList.contains('taken')){
            if(currentPlayer == 1){
                squares[i].classList.add('taken');
                squares[i].classList.add('player-one');
                currentPlayer = 2;
                currentPlayerDisplay.textContent = '2';
            }
            else if(currentPlayer == 2){
                squares[i].classList.add('taken');
                squares[i].classList.add('player-two');
                currentPlayer = 1;
                currentPlayerDisplay.textContent = '1';
            }
            checkingWin(i);
        }   
        else
        {
            Toastify({
                text: "Ô không hợp lệ",
                style: {
                    background: '#ed2939'
                }
            }).showToast();
        }
    }
}

const checkingWin = (index) => {
    var x = Math.floor(index % 7);
    var y = Math.floor(index / 7);
    // Check hàng dọc
    let counter = 0;
    for(var i = 0; i < 7; i++){
        if(squares[i*7+x].classList.contains('player-one')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }
    counter = 0;
    for(var i = 0; i < 7; i++){
        if(squares[i*7+x].classList.contains('player-two')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(2);
            break;
        }
    }

    
    // Check hàng ngang 
    
    counter = 1;
    for(var i = 0; i < 7; i++){
        if(squares[y*7+i].classList.contains('player-one')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }
    
    counter = 0;
    for(var i = 0; i < 7; i++){
        if(squares[y*7+i].classList.contains('player-two')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(2);
            break;
        }
    }

    // Check đường chéo
    counter = 0;
    var maxSum = Math.min(6, x+y);
    for(var i  = 0 ; i <= maxSum; i++){
        if(squares[ i*7 + (maxSum-i) ].classList.contains('player-one')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }

    counter = 0;
    for(var i  = 0 ; i <= maxSum; i++){
        if(squares[ i*7 + (maxSum-i) ].classList.contains('player-two')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }

    counter = 0;
    var startX = 0;
    var startY = 0;
    if(x>y) startX = x - y;
    else startY = y - x;

    for(var i  = 0 ; i < 7 - Math.max(startX, startY); i++){
        console.log()
        if(squares[ (startY+i)*7 + startX + i].classList.contains('player-one')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }
    
    counter = 0;
    for(var i  = 0 ; i < 7 - Math.max(startX, startY); i++){
        if(squares[ (startY+i)*7 + startX + i].classList.contains('player-two')){
            counter++;   
        }   
        else counter = 0;
        if(counter == 4){
            gameOver(1);
            break;
        }
    }
}

const gameOver = (player) => {
    if(player==1)
        resultDisplay.textContent = "Play one win!";
    else 
        resultDisplay.textContent = "Play two win!";
    squares.forEach(square => {
        square.onclick = null;
    });
}
