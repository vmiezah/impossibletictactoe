
//element selector
const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover")

//button selectors
const computerBtn = options.querySelector(".computer");
const friendBtn = options.querySelector(".friend");
const xBtn = options.querySelector(".x");
const oBtn = options.querySelector(".o");
const playBtn = options.querySelector(".play");

const player = new Object;
let OPPONENT;

function switchActive (off, on){
    off.classList.remove("active");
    on.classList.add("active");
}

//button event listeners
computerBtn.addEventListener("click", function(){
    //onClick, opponent is assigned to computer
    OPPONENT = "computer";
    switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function(){
    //onCLick, opponent is assigned to friend
    OPPONENT = "friend";
    switchActive(computerBtn, friendBtn);
});

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    switchActive(oBtn, xBtn);
});

playBtn.addEventListener("click", function(){
    //if opponent isnt (clicked)assigned, then opponent buttons turn red
    if(!OPPONENT){
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }
    if(!player.man){
        xBtn.style.backgroundColor = "red";
        oBtn.style.backgroundColor = "red";
        return;
    }
    //onCLick, calls init function and hides the options menu to start game
    init(player, OPPONENT);
    options.classList.add("hide");

});
