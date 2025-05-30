//Gameboard is an array that is stored inside a Gameboard object
const heading = document.querySelector('.ticTacToeHead');

function gameSquareAction() {
        if (game.getGameStatus() === undefined) {
            if (!(this.textContent == 'X' || this.textContent == 'O')) {
                if (game.getRound() % 2 === 0) {
                    this.textContent = 'X';
                    gameBoard.addMark('X', +this.id);
                    game.incRound();
                    players.switchTurn();

                } else {
                    this.textContent = 'O'
                    gameBoard.addMark('O', +this.id);
                    game.incRound();
                    players.switchTurn();
                }
            }
            let winner = game.checkGame()
            if (winner != undefined) {
                heading.textContent = `${winner}'s Won!`;
                heading.style.color = 'blue';
                players.resetPlayerColor();
            }
        }
}

const gameBoard = (function () {
    let board = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];

    const getGameBoard = () => {
        return board;
    }

    const resetBoard = () => {
        for (items of board) {
            board.pop();
            board.unshift(' ');
        }
        return board
    }

    const addMark = (mark, location) => {
            board.splice(location, 1, mark);
            //console.log(board);
        }
    
    return { addMark, resetBoard, getGameBoard };
})();

//players must also be stored in objects

//object to control the flow of the game itself

const game = (function () {
    let gameStatus = undefined;
    const gameSquares = document.querySelectorAll('.gameSquare');
    let round = 0;

    const toggleGameStatus = () => {
        if (gameStatus === undefined) {
            gameStatus = true;
        } else {
            gameStatus = undefined
        }
    }

    const getGameStatus = () => gameStatus

    const getRound = () => round

    const incRound = () => {
        round++
    }
    

    const resetRounds = () => {
        round = 0;
    }

    const checkGame = () => {
        let checkBoard = gameBoard.getGameBoard();
        //console.log(checkBoard);
        if ((checkBoard[0] === 'X' && checkBoard[1] === 'X' && checkBoard[2] === 'X') 
            || (checkBoard[3] === 'X' && checkBoard[4] === 'X' && checkBoard[5] === 'X')
            || (checkBoard[6] === 'X' && checkBoard[7] === 'X' && checkBoard[8] === 'X')
            || (checkBoard[0] === 'X' && checkBoard[3] === 'X' && checkBoard[6] === 'X')
            || (checkBoard[1] === 'X' && checkBoard[4] === 'X' && checkBoard[7] === 'X')
            || (checkBoard[2] === 'X' && checkBoard[5] === 'X' && checkBoard[8] === 'X')
            || (checkBoard[0] === 'X' && checkBoard[4] === 'X' && checkBoard[8] === 'X')
            || (checkBoard[2] === 'X' && checkBoard[4] === 'X' && checkBoard[6] === 'X')) {
                toggleGameStatus();
                return 'X'
            } else if ((checkBoard[0] === 'O' && checkBoard[1] === 'O' && checkBoard[2] === 'O') 
                || (checkBoard[3] === 'O' && checkBoard[4] === 'O' && checkBoard[5] === 'O')
                || (checkBoard[6] === 'O' && checkBoard[7] === 'O' && checkBoard[8] === 'O')
                || (checkBoard[0] === 'O' && checkBoard[3] === 'O' && checkBoard[6] === 'O')
                || (checkBoard[1] === 'O' && checkBoard[4] === 'O' && checkBoard[7] === 'O')
                || (checkBoard[2] === 'O' && checkBoard[5] === 'O' && checkBoard[8] === 'O')
                || (checkBoard[0] === 'O' && checkBoard[4] === 'O' && checkBoard[8] === 'O')
                || (checkBoard[2] === 'O' && checkBoard[4] === 'O' && checkBoard[6] === 'O')) {
                    toggleGameStatus();
                    return 'O'
            } else if (!checkBoard.includes(' ')) {
                toggleGameStatus();
                return 'Draw'
            } else {return undefined}
    }
    const playGame = () => {
        playGameButton.textContent = 'Reset';
        playGameButton.style.backgroundColor = 'red'

        const playerX = players.getPlayerX();

        const playerO = players.getPlayerO();

        playerX.style.color = 'blue';
        playerO.style.color = 'grey';
        


        for (square of gameSquares) {
            square.addEventListener('click', gameSquareAction);

        }
    }
    return { playGame, checkGame, gameSquares, toggleGameStatus, getGameStatus, resetRounds, getRound, incRound};
})();


const playGameButton = document.querySelector('.action');
playGameButton.addEventListener('click', function() {
    if (playGameButton.textContent === 'Play Game') {
        game.resetRounds();
        gameBoard.resetBoard();
        game.playGame()
    } else {
        resetGame()
    }
});

function resetGame() {
    playGameButton.textContent = 'Play Game';
    playGameButton.style.backgroundColor = 'green';
    heading.textContent = 'Tic Tac Toe';
    heading.style.color = 'black';
    
    players.resetPlayerColor()

    

    for (square of game.gameSquares) {
        square.removeEventListener('click', gameSquareAction);
    }

    game.toggleGameStatus();
    for (square of game.gameSquares) {
        square.textContent = '';
    }    
    

}

const players = (function() {
    const players = document.querySelector('.players');
    const playerX = document.querySelector('.playerX');


    const playerO = document.querySelector('.playerO');

    const getPlayerX = () => playerX;

    const getPlayerO = () => playerO;
    
    const switchTurn = () => {
            if (game.getRound() % 2 == 0) {
                playerX.style.color = 'blue';
                playerO.style.color = 'grey';
            } else {
                playerX.style.color = 'grey';
                playerO.style.color = 'blue';
            }
        }

    const resetPlayerColor = () => {
        playerX.style.color = 'black';
        playerO.style.color = 'black';
    }

    return { getPlayerX, getPlayerO, switchTurn, resetPlayerColor };

    



})();


    
