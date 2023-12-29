import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations.jsx";
import GameOver from "./components/GameOver";

function derivedActiveP(gameTurns){
    let currentPlayer = 'X'

    if (gameTurns.length && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer;
}

function checkForWinner(gameBoard) {
    for (const combination of WINNING_COMBINATIONS) {
        const firstSqrSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondtSqrSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSqrSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSqrSymbol &&
            secondtSqrSymbol === firstSqrSymbol &&
            firstSqrSymbol === thirdSqrSymbol) {
            return firstSqrSymbol;
        }
    }
    return null;
}

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function App() {
    // const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGamesTurns] = useState([]);
    let currentPlayer = derivedActiveP(gameTurns);
    // todo: we need to do a deep copy here since arrays like object are reference in js.
    // todo: tha's why restart didn't work since initialBoard was being updated by reference
    let gameBoard = [...initialBoard.map((array) => [...array])];


    for (let turn of gameTurns) {
        const {player, square} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner = checkForWinner(gameBoard);

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleRestart() {
        setGamesTurns([]);
    }


    function handleSelectSquare(rowIdx, colIdx) {
        // setActivePlayer((prevState) => {
        //     return prevState === 'X' ? 'O' : 'X'
        // });
        setGamesTurns((prevTurns) => {
            currentPlayer = derivedActiveP(prevTurns);

            return [
                {
                    square: {row: rowIdx, col: colIdx},
                    player: currentPlayer
                }, ...prevTurns];
        })
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className={'highlight-player'}>
                <Player initialName="Player one" symbol='X' isActive={currentPlayer === 'X'}></Player>
                <Player initialName="Player two" symbol='O' isActive={ currentPlayer === 'O'}></Player>
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart} />}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
    </main>)
}

export default App
