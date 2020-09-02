const message = document.querySelector(".message");
const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const userPlay = document.querySelector(".userPlay");
const res = document.querySelector(".res");

const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["hearts", "diams", "clubs", "spades"];


let deck = [];
let players = [];
let deals = [];
let round = 0;
let inplay = false;
let total = 0;

let logs = [];



buttons.forEach(function (item) {
    item.addEventListener("click", playGame);
})

function playGame(e) {
    let temp = e.target.textContent;
    if (temp == "Start") {
        message.style.color = "black";
        btnToggle();
        startGame();
    }
    if (temp == "Next round") {
        let tempRuns = document.querySelector("input").value;
        res.innerHTML = "";
        round++;
        console.log(round);
        for (let x = 0; x < tempRuns; x++) {
            if (inplay) {
                makeCards();
            }
        }
    }
}

function btnToggle() {
    buttons[0].classList.toggle("hide");
    buttons[1].classList.toggle("hide");
}

function addLogs(msg)
{
    logs.unshift(msg);
    logsToString = logs.join("\n");
    let txtArea = document.getElementById("logger");
    txtArea.innerHTML = logsToString;
}

function startGame() {
    inplay = true;
    gameplay.innerHTML = "";
    let numberPlayers = document.querySelector("input").value;
    buildDeck();
    setupPlayers(numberPlayers);
    dealCards(0);
    makeCards();
    document.querySelector("input").value = "1";
}

function showCard(el, card){
    // console.log(card);
    UpdateRound();
    if(card != undefined){
        let br = document.createElement("br");
        el.appendChild(br);
        el.style.backgroundColor = "white";
        let html1 =  "&" + card.suit + ";";
        let html2 = card.rank + "&" + card.suit +";";
        let div = document.createElement("div");
        div.classList.add("card");
        if(card.suit === "hearts" || card.suit === "diams"){
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
        // console.log(div);
    }
}


function dealRound(playerList, tempHolder) {
    let curWinner = {
        "high": null
        , "player": playerList[0]
    }
    let playoff = [];
    for (let x = 0; x < playerList.length; x++) {
        let tempPlayerIndex = playerList[x];
        if (deals[tempPlayerIndex].length > 0) {
            let card = deals[tempPlayerIndex].shift();
            if (curWinner.high == card.value) {
                if (playoff.length == 0) {
                    playoff.push(curWinner.player);
                }
                playoff.push(tempPlayerIndex);
            }
            if (!curWinner.high || curWinner.high < card.value) {
                playoff = [];
                curWinner.high = card.value;
                curWinner.player = tempPlayerIndex;
                curWinner.card = card;
            }
            tempHolder.push(card);
            showCard(players[tempPlayerIndex], card);
        }
    }
    if (playoff.length > 0) {
        dealRound(playoff, tempHolder);
    }
    else {
        updater(curWinner.player, tempHolder);
    }
}
function UpdateRound(){
    let roundContainer = document.querySelector(".roundCounter");
    roundContainer.innerHTML = "Round " + (round + 1);
}

function makeCards() {
    let tempHolder = [];
    let playerList = [];
    for (let x = 0; x < players.length; x++) {
        players[x].innerHTML = "";
        if (deals[x].length > 0) {
            playerList.push(x);
        }
    }
    if (playerList.length == 1) {
        winGame();
    }
    dealRound(playerList, tempHolder);
}

function winGame() {
    message.style.color = "red";
    btnToggle();
    inplay = false;
    for (let x = 0; x < players.length; x++) {
        players[x].innerHTML += (deals[x].length >= total) ? "<br>WINNER" : "<br>LOSER";
    }
    message.innerHTML = "Select number of players";
    document.querySelector("input").value = "3";
}

function updater(winner, tempHolder) {

    
    players.forEach(player => player.style.backgroundColor = "#00b846")
    players[winner].style.backgroundColor = "gold";
    tempHolder.sort(function () {
        return .5 - Math.random();
    })
    for (let record of tempHolder) {
        deals[winner].push(record);
    }
    for (let x = 0; x < players.length; x++) {
        let div = document.createElement("div");
        div.classList.add("stats");
        if (deals[x].length == total) {
            div.innerHTML = "Total " + deals[x].length + " cards";
            winGame();
        }
        else {
            div.innerHTML = deals[x].length < 1 ? "Lost" : "Cards:" + (deals[x].length);
        }
        players[x].appendChild(div);
    }
    messageLog = "Player " + (winner + 1) + " won " + tempHolder.length + " cards";
    addLogs(messageLog);
}

function dealCards(playerCard) {
    playerCard = (playerCard >= players.length) ? 0 : playerCard;
    if (deck.length > 0) {
        let randIndex = Math.floor(Math.random() * deck.length);
        let card = deck.splice(randIndex, 1)[0];
        deals[playerCard].push(card);
        playerCard++;
        return dealCards(playerCard);
    }
    else {
        message.textContent = "cards dealt now";
        return;
    }
}

function setupPlayers(num) {
    players = [];
    deals = [];
    for (let x = 0; x < num; x++) {
        let div = document.createElement("div");
        div.setAttribute("id", "player" + (x + 1));
        div.classList.add("player");
        let div1 = document.createElement("div");
        div1.textContent = "Player " + (parseInt(x) + 1);
        players[x] = document.createElement("div");
        players[x].textContent = "Cards";
        div.appendChild(div1);
        div.appendChild(players[x]);
        gameplay.appendChild(div);
        deals.push([]);
    }
}

function buildDeck() {
    deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            let card = {};
            total++;
            card.suit = suits[i];
            card.rank = ranks[j];
            card.value = (j + 1);
            deck.push(card);
        }
    }
}