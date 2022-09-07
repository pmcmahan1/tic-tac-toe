// Setting variables, selecting DOM
const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#gameStatus");
const reset = document.querySelector("#reset");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// On load initialize game
startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    reset.addEventListener("click", restartGame);
    gameStatus.textContent = `${currentPlayer}'s turn`;
    running = true;
}

// Function for if a space is clicked
function cellClicked(){
    const gameIndex = this.getAttribute("gameIndex");
    // If the space is NOT empty, stops the function here with return
    if(options[gameIndex] != "" || !running){
        return;
    }
    // If the space is valid, calls the updateGame function 
    updateGame(this, gameIndex);
    checkWinner();
}

function updateGame(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        gameStatus.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    // if there are no blank cells, ends the game with a draw
    else if(!options.includes("")){
        gameStatus.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
