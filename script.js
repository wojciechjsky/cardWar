const message = document.querySelector(".message");
const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const userPlay = document.querySelector(".userPlay");
const res = document.querySelector(".res");
let players = [];
let deals = [];

let deck = [];
const ranks = [2,3,4,5,6,7,8,9,10, "J", "Q", "K", "A"];
const figures = ["hearts", "diamonds", "clubs", "spades"];

buttons.forEach( button => {
   button.addEventListener("click", playGame);
});

function playGame(e){
    let temp = e.target.textContent;
    console.log(temp)
    if(temp == "Start"){
        btnToggle();
        startGame();
    }
}

function btnToggle(){
    buttons[0].classList.toggle("hide");
    buttons[1].classList.toggle("hide");
}

function startGame(){
    buildDeck();

    let numberPlayers = document.querySelector("input").value;
    createPlayers(numberPlayers);
    dealCards(0);
    console.log(deck);
    console.log(players);
    document.querySelector("input").value = "1";
}


function dealCards(playerCard){
    playerCard = (playerCard >= players.length) ? 0: playerCard;
    console.log(playerCard);
    if(deck.length > 0){
        let randIndex = Math.floor(Math.random()* deck.length);
        let card = deck.splice(randIndex, 1)[0];
        deals[playerCard].push(card)
        playerCard++;
        return dealCards(playerCard);
        console.log(card)
    }else{
        message.textContent= "cards dealt now";
        return;
    }
}



function buildDeck(){
    deck =[];
    for(let i = 0; i<figures.length; i++){
        for(let j = 0; j < ranks.length; j++){
            let card = {};

            card.figures = figures[i]
            card.rank = ranks[j];
            card.value = (j+1);;
            deck.push(card)
        }
    }
}

function createPlayers(num){
    players = [];
    deals = [];
    for(let x=0; x<num; x++){
        let div = document.createElement("div");
        div.setAttribute("id", "player"+(x+1));
        div.classList.add("player");
        let div1 = document.createElement("div");
        div.textContent = "Player " + (x+1);
        players[x] = document.createElement("div");
        players[x].textContent ="Cards";
        div.appendChild(div1);
        div.appendChild(players[x]);
        gameplay.appendChild(div);
        deals.push([]);
        console.log(deals);


        console.log(div);
    }

}