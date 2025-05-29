//Gameboard is an array that is stored inside a Gameboard object

const gameBoard = (function () {
    let board = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];

    const resetBoard = () => {
        board = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];
    }

    const addMark = (mark, location) => {
            board.splice(location, 1, mark);
            console.log(board);
        }
    
    return { addMark, board, resetBoard };
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

    const resetRounds = () => {
        round = 0;
    }

    const checkGame = () => {
        if ((gameBoard.board[0] === 'X' && gameBoard.board[1] === 'X' && gameBoard.board[2] === 'X') 
            || (gameBoard.board[3] === 'X' && gameBoard.board[4] === 'X' && gameBoard.board[5] === 'X')
            || (gameBoard.board[6] === 'X' && gameBoard.board[7] === 'X' && gameBoard.board[8] === 'X')
            || (gameBoard.board[0] === 'X' && gameBoard.board[3] === 'X' && gameBoard.board[6] === 'X')
            || (gameBoard.board[1] === 'X' && gameBoard.board[4] === 'X' && gameBoard.board[7] === 'X')
            || (gameBoard.board[2] === 'X' && gameBoard.board[5] === 'X' && gameBoard.board[8] === 'X')
            || (gameBoard.board[0] === 'X' && gameBoard.board[4] === 'X' && gameBoard.board[8] === 'X')
            || (gameBoard.board[2] === 'X' && gameBoard.board[4] === 'X' && gameBoard.board[6] === 'X')) {
                toggleGameStatus();
                return 'X'
            } else if ((gameBoard.board[0] === 'O' && gameBoard.board[1] === 'O' && gameBoard.board[2] === 'O') 
                || (gameBoard.board[3] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[5] === 'O')
                || (gameBoard.board[6] === 'O' && gameBoard.board[7] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[0] === 'O' && gameBoard.board[3] === 'O' && gameBoard.board[6] === 'O')
                || (gameBoard.board[1] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[7] === 'O')
                || (gameBoard.board[2] === 'O' && gameBoard.board[5] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[0] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[2] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[6] === 'O')) {
                    toggleGameStatus();
                    return 'O'
            } else if (!gameBoard.board.includes(' ')) {
                toggleGameStatus();
                return 'Draw'
            } else {return undefined}
    }
    const playGame = () => {
        playGameButton.textContent = 'Reset';
        playGameButton.style.backgroundColor = 'red'
        


        for (square of gameSquares) {
            square.addEventListener('click', function() {
                if (gameStatus === undefined) {
                    if (!(this.textContent == 'X' || this.textContent == 'O')) {
                        if (round % 2 === 0) {
                            this.textContent = 'X';
                            gameBoard.addMark('X', +this.id);
                            ++round;
                        } else {
                            this.textContent = 'O'
                            gameBoard.addMark('O', +this.id);
                            ++round;
                        }
                    }
                    let winner = checkGame()
                    if (winner != undefined) {
                        console.log(winner);
                    }
                }
        })

        }
    }
    return { playGame, checkGame, gameSquares, toggleGameStatus, resetRounds};
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
    game.toggleGameStatus();
    for (square of game.gameSquares) {
        square.textContent = '';
    }    
    

}


    
