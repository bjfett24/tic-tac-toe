//Gameboard is an array that is stored inside a Gameboard object

const gameBoard = (function () {
    let board = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];
    const addMark = (mark, location) => {
            board.splice(location, 1, mark);
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
            location = prompt('Where do you want to put your X?');
            if (gameBoard.board.at(location) === ' ') {
            gameBoard.addMark('X', location);
            ++round;
            } else {
                alert('Not an open spot. Try again');
                playTurn()
            }
        } else {
            location = prompt('Where do you want to put your O');
            if (gameBoard.board.at(location) === ' ') {
                gameBoard.addMark('X', location);
                ++round;
                } else {
                    alert('Not an open spot. Try again');
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
            playTurn();
            const winner = checkGame();
        }
        alert('Winner is ', winner, "'s")
    }
})

game.playGame();