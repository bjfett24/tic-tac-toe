//Gameboard is an array that is stored inside a Gameboard object
const heading = document.querySelector('.ticTacToeHead');



function gameSquareAction() {
        const playerXName = players.getPlayerNames().at(0);
        const playerOName = players.getPlayerNames().at(1);
        if (game.getGameStatus() === undefined) {
            if (!(this.textContent == '❌' || this.textContent == '⭕️')) {
                if (game.getRound() % 2 === 0) {
                    this.textContent = '❌';
                    gameBoard.addMark('X', +this.id);
                    game.incRound();
                    players.switchTurn();

                } else {
                    this.textContent = '⭕️'
                    gameBoard.addMark('O', +this.id);
                    game.incRound();
                    players.switchTurn();
                }
            }
            let winner = game.checkGame()
            if (winner != undefined) {
                if (winner === 'X') {
                    heading.textContent = `${playerXName} Won!`;
                } else if (winner === 'O') {
                    heading.textContent = `${playerOName} Won!`;
                } else {
                    heading.textContent = 'Draw!';
                }
                heading.style.color = 'gold';
                heading.style.backgroundColor = 'rgb(13, 71, 13)';
                heading.style.border = '5px solid gold';
                heading.style.borderRadius = '30px';
                heading.style.boxShadow = '4px 8px 12px 5px rgb(0, 0, 0, 0.15)'
                heading.style.padding = '1rem';
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

    const resetGame = () => {
        playGameButton.textContent = 'Play Game';
        playGameButton.style.backgroundColor = 'rgb(13, 71, 13)';
        heading.textContent = 'Tic Tac Toe';
        heading.style.color = 'antiquewhite';
        heading.style.backgroundColor = 'rgb(13, 71, 13)';
        heading.style.border = '5px solid black'
        
        players.resetPlayerColor()
    
        
    
        for (square of gameSquares) {
            square.removeEventListener('click', gameSquareAction);
            square.removeEventListener('mouseenter', gameSquareEnter);
            square.removeEventListener('mouseleave', gameSquareLeave);
        }
    
        toggleGameStatus();
        for (square of gameSquares) {
            square.textContent = '';
        }    
        
    
    }

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

    const gameSquareEnter = function() {
        if (gameStatus === undefined && !(this.textContent === '❌' || this.textContent === '⭕️')) {
            this.classList.add('hover-effect');
        }
    }
    
    const gameSquareLeave = function() {
        this.classList.remove('hover-effect');
    }
    const playGame = () => {
        playGameButton.textContent = 'Reset';
        playGameButton.style.backgroundColor = 'red'

        const playerX = players.getPlayerX();

        const playerO = players.getPlayerO();

        players.switchTurn();
        


        for (square of gameSquares) {
            square.addEventListener('mouseenter', gameSquareEnter);
            square.addEventListener('mouseleave', gameSquareLeave);
            square.addEventListener('click', gameSquareAction);

        }
    }
    return { playGame, checkGame, gameSquares, toggleGameStatus, getGameStatus, resetRounds, getRound, incRound, resetGame};
})();


const playGameButton = document.querySelector('.action');
playGameButton.addEventListener('click', function() {
    if (playGameButton.textContent === 'Play Game') {
        game.resetRounds();
        gameBoard.resetBoard();
        game.playGame()
    } else {
        game.resetGame()
    }
});



const players = (function() {
    const players = document.querySelector('.players');
    const playerX = document.querySelector('.player.X');
    const playerO = document.querySelector('.player.O');

    playerX.style.fontSize = '2rem';
    playerO.style.fontSize = '2rem';

    const changePlayerNames = (name1, name2) => {
        playerX.textContent = name1;
        playerO.textContent = name2;
    }

    const getPlayerNames = () => [playerX.textContent, playerO.textContent];

    const newPlayerNameDialog = () => {
        const popUp = document.createElement('dialog');
        popUp.classList.add('popUp');
        document.body.appendChild(popUp);
    
        const dialogContainer = document.createElement('div');
        dialogContainer.classList.add('dialogContainer');
        popUp.appendChild(dialogContainer);
    
        const dialogHead = document.createElement('div');
        dialogHead.classList.add('dialogHead');
        dialogHead.textContent = 'Change Names';
        dialogContainer.appendChild(dialogHead);
    
        const nameForm = document.createElement('form');
        nameForm.classList.add('nameForm');
        nameForm.action = '#';
        nameForm.method = 'dialog';
        dialogContainer.appendChild(nameForm);
    
        const name1Label = document.createElement('label');
        name1Label.classList.add('name1', 'label');
        name1Label.for = 'name1';
        name1Label.textContent = 'Rename Player 1';
        nameForm.appendChild(name1Label);
    
        const name1Input = document.createElement('input');
        name1Input.classList.add('name1', 'input');
        name1Input.type = 'text';
        name1Input.id = 'name1';
        nameForm.appendChild(name1Input);
    
        const name2Label = document.createElement('label');
        name2Label.classList.add('name2', 'label');
        name2Label.for = 'name2';
        name2Label.textContent = 'Rename Player 2';
        nameForm.appendChild(name2Label);
    
        const name2Input = document.createElement('input');
        name2Input.classList.add('name2', 'input');
        name2Input.type = 'text';
        name2Input.id = 'name2';
        nameForm.appendChild(name2Input);
    
        const doneButton = document.createElement('button');
        doneButton.type = 'submit';
        doneButton.classList.add('doneButton')
        doneButton.textContent = 'Done';
        nameForm.appendChild(doneButton);
    
        nameForm.addEventListener('submit', function() {
    
            if (name1Input.value.length > 0 && name2Input.value.length > 0) {
                popUp.close(); // Close the dialog
                changePlayerNames(name1Input.value, name2Input.value);
                
             
            } else {
                const messageBox = document.createElement('div');
                messageBox.style.cssText = `
                    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                    background-color: #ffdddd; color: #d8000c; padding: 10px 20px;
                    border: 1px solid #d8000c; border-radius: 5px; z-index: 1001;
                    font-family: sans-serif;
                `;
                messageBox.textContent = 'New name must have a length of 1 or more.';
                document.body.appendChild(messageBox);
                setTimeout(() => {
                    messageBox.remove();
                }, 3000); // Remove after 3 seconds
            }
        })
    
        popUp.showModal();
    
    }

    const bothPlayers = document.querySelectorAll('.player');
    for (p of bothPlayers) {
        p.addEventListener('click', newPlayerNameDialog);
    }

    const getPlayerX = () => playerX;

    const getPlayerO = () => playerO;
    
    const switchTurn = () => {
            if (game.getRound() % 2 == 0) {
                playerX.style.backgroundColor = 'gold'
                playerX.style.color = 'rgb(13, 71, 13)';
                playerO.style.backgroundColor = 'grey'
                playerO.style.color = 'white';
            } else {
                playerX.style.backgroundColor = 'grey'
                playerX.style.color = 'white';
                playerO.style.backgroundColor = 'gold'
                playerO.style.color = 'rgb(13, 71, 13)';
            }
        }

    const resetPlayerColor = () => {
        playerX.style.color = 'white';
        playerO.style.color = 'white';
        playerX.style.backgroundColor = 'black';
        playerO.style.backgroundColor = 'black';
    }

    return { getPlayerX, getPlayerO, switchTurn, resetPlayerColor, newPlayerNameDialog, getPlayerNames};


})();

    
