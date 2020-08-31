function init(player, OPPONENT){
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE = 150;

    let board = [];
    let GAME_OVER = false;
    
    function drawBoard(){ 
        let id = 0;
        for(let i = 0; i < ROW; i++){
            board [i] = [];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
                id++
            }
        }
    }
    drawBoard();

    let gameData = new Array(9);
    let currentPlayer = player.man;

    const xImg = new Image();
    xImg.src = "images/x.png";
    const oImg = new Image();
    oImg.src = "images/o.png";

    function drawOnBoard(player, i, j){
        let img = player == "X"? xImg : oImg;

        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
    }
                        /**
                         * 0 1 2
                         * 3 4 5
                         * 6 7 8
                         */
    const WIN_COMBOS = [[0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,4,8],
                        [2,4,6]
    ];
    function isWinner(player, gameData){
        for(let i = 0; i < WIN_COMBOS.length; i++){
            let won = true;
            for(let j = 0; j < WIN_COMBOS[i].length; j++){
                let position = WIN_COMBOS[i][j];
                //checks if each position in WIN_COMBOS sublists are the same
                won = gameData[position] == player && won;
            }
            if (won){
                return true;
            }
        }
        return false;
    }
    function isTie(gameData){
        let isBoardFull = true;
        //iterates through gamedata to check if all positions are occupied
        for (let i = 0; i < gameData.length; i++){
            isBoardFull = gameData[i] && isBoardFull
        }
        if(isBoardFull) {
            return true;
        }
        return false;
    } 
    
    function showGameOver(player){
        let imgSrc = `img/{$player}.png`;
        
        let message = player == "tie" ?"Haha... No Winner":"The Winner Is ";
        
        gameOverElement.innerHTML = `
            <h1>${message}</h1>
            <img class="winner-img" src=${imgSrc} alt="">
            <div class="play" onclick="location.reload();">PLAY AGcomputerN!</div>
            
        `;
        gameOverElement.classList.remove("hide");
    }
    //onClick for player
    canvas.addEventListener("click", function(event){
        //check if game is still valid before we play
        if(GAME_OVER) return;
        // determine the click coordinates by subtracting the canvas bounddary x/y from the event client x/y
        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;
        // to retrieve position in array from click coordinates we do floor division of XorY divided by SPACE_SIZE(150)
        let i = Math.floor(Y/SPACE_SIZE);
        let j = Math.floor(X/SPACE_SIZE);

        let position = board[i][j];
        //to avoid repeating moves, if position isnt empty we return
        if (gameData[position]) return;
        gameData[position] = currentPlayer;
        drawOnBoard(currentPlayer, i, j);
        if(isWinner()){
            showGameOver();
            GAME_OVER = true;
            return;
        }
        if(isTie()){
            showGameOver();
            GAME_OVER = true;
            return;
        } 
        // changes turns
        currentPlayer = currentPlayer == player.man? player.friend: player.man;
    });
}

