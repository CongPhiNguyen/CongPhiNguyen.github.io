const cardArray = [
    {
        name: 'Kurisu1',
        img: './assets/kurisu-1.jpg'
    },
    {
        name: 'Kurisu2',
        img: './assets/kurisu-2.jpg'
    },
    {
        name: 'Raiden1',
        img: './assets/raiden-1.png'
    },
    {
        name: 'Raiden2',
        img: './assets/raiden-2.jpg'
    },
    {
        name: 'Kagari1',
        img: './assets/kagari-1.jpg'
    },
    {
        name: 'Hyjayo1',
        img: './assets/hyjayo-1.jpg'
    },
    {
        name: 'Yaemiko1',
        img: './assets/yae-miko.jpg'
    },
    {
        name: 'Kurisu1',
        img: './assets/kurisu-1.jpg'
    },
    {
        name: 'Kurisu2',
        img: './assets/kurisu-2.jpg'
    },
    {
        name: 'Raiden1',
        img: './assets/raiden-1.png'
    },
    {
        name: 'Raiden2',
        img: './assets/raiden-2.jpg'
    },
    {
        name: 'Kagari1',
        img: './assets/kagari-1.jpg'
    },
    {
        name: 'Hyjayo1',
        img: './assets/hyjayo-1.jpg'
    },
    {
        name: 'Yaemiko1',
        img: './assets/yae-miko.jpg'
    },
];

cardArray.sort(() => 0.5 - Math.random());


const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#result');

var score = 0;
var selectingCard = [];
var selectedCards = [];

const createBoard = () => {
    var innerHTML = ``;
    for(var i = 0; i < cardArray.length; i++){
        innerHTML+=
        `<img 
            src='./assets/blank.jpg'
            data-id=${i}
            class='img-display'
            onclick='flipBoard(this)'
        ></img>`;
    }
    gridDisplay.innerHTML = innerHTML;
}

createBoard();

function checking(){
    console.log("check", selectingCard);
    while(selectingCard.length>2){
        selectingCard[selectingCard.length-1].setAttribute('src','./assets/blank.jpg');
        selectingCard.pop();
    }
    if(cardArray[selectingCard[0].getAttribute('data-id')].name == 
        cardArray[selectingCard[1].getAttribute('data-id')].name
            && selectingCard[0].getAttribute('data-id') != selectingCard[1].getAttribute('data-id')
        ){
        selectedCards.push(selectingCard[0]);
        selectedCards.push(selectingCard[1]);
        selectingCard[0].className+=' disable';
        selectingCard[1].className+=' disable';
        score++;
        scoreDisplay.innerHTML=`${score}`;
        Toastify({
            text: `Bạn chọn đúng rồi`,
            style: {
                background: '#1a926f'
            }
        }).showToast();
        if(selectedCards.length == cardArray.length){
            gridDisplay.innerHTML = 
            `<h1>You have won the game!!!</h1>`
        }
    }
    else {
        selectingCard[0].setAttribute('src','./assets/blank.jpg');
        selectingCard[1].setAttribute('src','./assets/blank.jpg');
        Toastify({
            text: `Bạn chọn sai rồi`,
            style: {
                background: '#ed2939'
            }
        }).showToast();
    }
    selectingCard = [];
}

function flipBoard(e)
{
    if(e.className.indexOf('disable') !=-1) return;
    console.log(e.className);
    let cardId = e.getAttribute('data-id');
    e.setAttribute('src',cardArray[cardId].img);
    selectingCard.push(e);
    if(selectingCard.length == 2){
        setTimeout(checking, 700);
    }
}