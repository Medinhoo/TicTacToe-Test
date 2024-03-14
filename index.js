class Player{

    constructor(userName){
        this.userName = userName;
        this.team;
        this.firstToPlay = false;
        this.cpt = 0;
    }

    set team(side){
        this._team = side;
    }

    get team(){
        return this._team;
    }

    set firstToPlay(bool){
        this._firstToPlay = bool;
    }

    get firstToPlay(){
        return this._firstToPlay;
    }
}

let player1, player2;
let userName = "";

function start(){

    // Create Player 1
    while(userName === "" || userName === null || userName.length < 3){
        userName = window.prompt("Enter a username of 3 characters min. for Player 1: ");
    }
    player1 = new Player(userName);
    userName = "";

    // Create Player 2
    while(userName === "" || userName === null || userName.length < 3){
        userName = window.prompt("Enter a username of 3 characters min. for Player 2: ");
        if(player1.userName === userName){
            alert("Your username has to be different of Player 1! Try Again.");
            userName = "";
        }
    }  
    player2 = new Player(userName);

    //GUESSING GAME --------------------------------------------------------------------------------------

    // Drawing the team via a guessing number game
    const draw = Math.floor(Math.random() * 10) + 1;

    let running = true;
    let turnGuessing = 1;

    while(running){

        if(turnGuessing % 2 === 1){
            guessing(player1, player2);
            turnGuessing++
        }
        else{
            guessing(player2, player1);
            turnGuessing++;
        }

    }

    document.getElementById("helloP1").textContent = `Hi ${player1.userName}!`; 
    document.getElementById("teamP1").textContent =`You are team ${player1.team}`;

    document.getElementById("helloMessage").style.backdropFilter = "blur(5px)";

    document.getElementById("helloP2").textContent = `Hi ${player2.userName}!`; 
    document.getElementById("teamP2").textContent =`You are team ${player2.team}`;

    //Assigning a team to the players 
    function assignTeam(winner, loser){
        winner._team = "cross";
        winner._firstToPlay = true;
        loser._team = "circle";
    }

    // Logical of guessing
    function guessing(playerGuessing, otherPlayer){

        let guess = window.prompt(`${playerGuessing.userName} : Guess the number between 1 and 10 to start the game or type 'quit' to exit: `);

        if(guess === 'quit'){
            assignTeam(otherPlayer, playerGuessing);
            running = false;
        }
        
        guess = Number(guess);

        if(guess === draw){
            window.alert(`Congratulations ${playerGuessing.userName}! You are the first to play`);
            assignTeam(playerGuessing, otherPlayer);
            running = false;
        }
    }

    play();
}

// TIC TAC TOE GAME ----------------------------------------------------------------------------------
const endBox = document.getElementById("endBox");

function play(){

    const startBtn = document.getElementById("startBtn");
    startBtn.style.opacity = "0";
    startBtn.style.pointerEvents = "none";
    
    first = player1.firstToPlay ? player1 : player2;
    second = player2.firstToPlay ? player1 : player2;
    let turnPlaying = 1;

    let matrix = [];
    let value = [];
    const gridItems = document.querySelectorAll('.grid-item');
    let index = 0;

    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        value[i] = [];
        for (let j = 0; j < 3; j++) {

            matrix[i][j] = gridItems[index];
            value[i][j] = "";
            
            matrix[i][j].addEventListener("click", ()=> {

                if(turnPlaying % 2 == 1){ 
                    matrix[i][j].innerHTML = `<img src="images/cross.jpg" alt="cross">`;
                    value[i][j] = first.team;
                    turnPlaying++;
                    win = checkWin();
                    if(win){
                        setTimeout(()=> showAlert(first, win),300);
                        showEndBox(first, win);
                    }
                    else if(!win && turnPlaying >= 9){
                        showEndBox(first, win);
                    }
                    else{
                        setTimeout(()=> showAlert(second),300);
                    } 
                }
                else{
                    matrix[i][j].innerHTML = `<img src="images/circle.png" alt="cross">`; 
                    value[i][j] = second.team;
                    turnPlaying++;
                    win = checkWin();
                    if(win){
                        setTimeout(()=> showAlert(second, win),300);
                        showEndBox(second, win);
                    }
                    else {
                        setTimeout(()=> showAlert(first),300);
                    }
                }

            })

            index++;
        }
    }

    function showAlert(player, win=false){
        if(win){
            window.alert(`Congratulations ${player.userName} !!!!!! YOU WON !`);
        }
        else{
            setTimeout(window.alert(`${player.userName}, your turn!`),5000);
        }
    }

    function checkWin(){

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (value[i][0] !== "" && value[i][0] === value[i][1] && value[i][1] === value[i][2]) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (value[0][j] !== "" && value[0][j] === value[1][j] && value[1][j] === value[2][j]) {
                return true;
            }
        }

        // Check diagonals
        if (value[0][0] !== "" && value[0][0] === value[1][1] && value[1][1] === value[2][2]) {
            return true;
        }
        if (value[0][2] !== "" && value[0][2] === value[1][1] && value[1][1] === value[2][0]) {
            return true;
        }

        return false;

    }  
}

function quit(){
    window.location.reload();
}

function restart(){
    endBox.style.opacity = '0';
    endBox.style.pointerEvents = "none";
    window.location.reload();
}

function showEndBox(player, win){
    endBox.style.opacity = '1';
    endBox.style.pointerEvents = "all";

    if(win){
        document.getElementById("endMessage").textContent = 
        `${player.userName} was better this time! Do you want to retry ?..`;
        endBox.style.backgroundImage = "url(images/Congratulations.gif)"
    }
    else{
        document.getElementById("endMessage").textContent = 
        `It's a draw! Nobody won.. Do you want to retry ?..`;
        endBox.style.backgroundImage = "url(images/draw.gif)"
        endBox.style.backgroundPosition = "right"
    }
    
}