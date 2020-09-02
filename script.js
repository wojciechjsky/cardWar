const message = document.querySelector(".message");
const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const userPlay = document.querySelector(".userPlay");
const res = document.querySelector(".res");

let deck = [];
let players = [];
let deals = [];
let round = 0;
let inplay = false;


const ranks = [2,3,4,5,6,7,8,9,10, "J", "Q", "K", "A"];
const figures = ["hearts", "diams", "clubs", "spades"];

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
    if(temp == "Next round"){
        let tempRuns = document.querySelector("input").value;
        res.innerHTML = "";
        round = 0;
        for(let x = 0; x<tempRuns; x++){
            if(inplay){
                message.innerHTML ="Round " + (x+1);
                makeCards();
            }
        }

    }
}

function btnToggle(){
    buttons[0].classList.toggle("hide");
    buttons[1].classList.toggle("hide");
}

function startGame(){
    inplay = true;
    buildDeck();

    let numberPlayers = document.querySelector("input").value;
    createPlayers(numberPlayers);
    dealCards(0);
    makeCards();
    playGame();
    console.log(deck);
    console.log(players);
    document.querySelector("input").value = "1";
}




function makeCards(){
    let tempHolder = [];
    let currWinner = {
        "high": null,
        "player":null
    }
    let playoff = [];
    for(let x=0; x < players.length; x++){
        players[x].innerHTML = "";
        let card = deals[x].shift();
        if(currWinner.high == card.value){
            if(playoff.length == 0){
                playoff.push({
                    "player":currWinner.player,
                    "card": currWinner.card
                })
                playoff.push({
                    "player":x,
                    "card": card
                })
            }
            console.log("tie");
        }
        if(!currWinner.high || currWinner.high < card.value){
            currWinner.high = card.value;
            currWinner.player = x;
            currWinner.card = card;
        }
        tempHolder.push(card);
        showCard(players[x], card);
    }
    console.log("currWinner", currWinner);
    console.log("tempHolder", tempHolder);
    updater(currWinner.player, tempHolder);

}
//TODO: Loosers on red


function updater(winner, tempHolder){
    players.forEach(player => {
        // player.style.border = "2px solid red";
        player.style.border = "none";
        player.style.backgroundColor= "#00b846";
    });
    
    players[winner].style.border = "2px solid green";
    players[winner].style.backgroundColor= "gold";

    console.log(tempHolder);
    tempHolder.sort(function(){
        return 0.5 - Math.random();
    })

    console.log(tempHolder);

    for(let record of tempHolder){
        deals[winner].push(record);
    }
    for(let x =0; x < players.length; x++){
        let div = document.createElement("div");
        div.classList.add("stats");
        div.innerHTML = deals[x].length < 1? "Lost" : "Left:"+(deals[x].length-1);
        players[x].appendChild(div);
        
    }

    res.innerHTML = "Player " + (winner + 1)+ "won " + tempHolder.length +" cards<br>";
}

function showCard(el, card){
    console.log(card);
    if(card != undefined){
        el.style.backgroundColor = "white";
        let html1 =  "&" + card.figure + ";";
        let html2 = card.rank + "&" + card.figure +";";
        let div = document.createElement("div");
        div.classList.add("card");
        if(card.figure === "hearts" || card.suit === "diams"){
            div.classList.add("red");
        }

        let span1 = document.createElement("span");
        span1.innerHTML = html2;
        span1.classList.add("tinyTopLeft")
        div.appendChild(span1);

        let span2 = document.createElement("span");
        span2.innerHTML = html1;
        span2.classList.add("big");
        div.appendChild(span2);

        let span3 = document.createElement("span");
        span3.innerHTML = html2;
        span3.classList.add("tinyBotRight");

        div.appendChild(span3);

        el.appendChild(div);
        console.log(div);
    }
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

            card.figure = figures[i]
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
        let br = document.createElement("br");
        div.setAttribute("id", "player"+(x+1));
        div.classList.add("player");
        let div1 = document.createElement("div");
        div.textContent = "Player " + (x+1);
        players[x] = document.createElement("div");
        players[x].appendChild(br);
        div.appendChild(div1);
        div.appendChild(players[x]);
        gameplay.appendChild(div);
        deals.push([]);
        console.log(deals);


        console.log(div);
    }

}