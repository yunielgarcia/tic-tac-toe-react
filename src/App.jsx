import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";

function derivedActiveP(gameTurns){
    let currentPlayer = 'X'

    if (gameTurns.length && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer;
}

function App() {
    // const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGamesTurns] = useState([]);
    let currentPlayer = derivedActiveP(gameTurns);

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
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
        </div>
        <Log turns={gameTurns}/>
    </main>)
}

export default App
