//Gameboard is an array that is stored inside a Gameboard object

const gameBoard = (function () {
    let board = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];
    const addMark = (mark, location) => {
            board.splice(location, 1, mark);
            console.log(board);
        }
    
    return { addMark, board};
})();

//players must also be stored in objects

//object to control the flow of the game itself

const game = (function () {
    let gameStatus = undefined;
    let round = 0;
    const playTurn = () => {
        if (round % 2 === 0) {
            if (gameBoard.board.at(location) === ' ') {
            gameBoard.addMark('X', location);
            ++round;
            } else {
                playTurn()
            }
        } else {
            if (gameBoard.board.at(location) === ' ') {
                gameBoard.addMark('X', location);
                ++round;
                } else {
                    playTurn()
                }
        }
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
                gameStatus = true;
                return 'X'
            } else if ((gameBoard.board[0] === 'O' && gameBoard.board[1] === 'O' && gameBoard.board[2] === 'O') 
                || (gameBoard.board[3] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[5] === 'O')
                || (gameBoard.board[6] === 'O' && gameBoard.board[7] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[0] === 'O' && gameBoard.board[3] === 'O' && gameBoard.board[6] === 'O')
                || (gameBoard.board[1] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[7] === 'O')
                || (gameBoard.board[2] === 'O' && gameBoard.board[5] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[0] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[8] === 'O')
                || (gameBoard.board[2] === 'O' && gameBoard.board[4] === 'O' && gameBoard.board[6] === 'O')) {
                    gameStatus = true;
                    return 'O'
            } else if (!(' ' in gameBoard.board)) {
                gameStatus = true;
                return 'Draw'
            }
    }
    const playGame = () => {
        while (gameStatus === undefined) {
            console.log(gameBoard.board);
            const winner = checkGame();
        }
        alert('Winner is ', winner, "'s")
    }
    return { playGame, checkGame, playTurn, round, gameStatus };
})();


const playGameButton = document.querySelector('.playGame');
playGameButton.addEventListener('click', () => {
    playGameButton.textContent = 'Restart';
    game.playGame
})

const gameSquares = document.querySelectorAll('.gameSquare');

for (square of gameSquares) {
    square.addEventListener('click', function() {
        if (!(this.textContent == 'X' || this.textContent == 'O')) {
            if (game.round % 2 === 0) {
                this.textContent = 'X';
                gameBoard.addMark('X', +this.id);
                ++game.round;
            } else {
                this.textContent = 'O'
                gameBoard.addMark('O', +this.id);
                ++game.round;
            }
        }
    })
}
