import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import {act} from "react-dom/test-utils";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGamesTurns] = useState([]);

    function handleSelectSquare(rowIdx, colIdx) {
        setActivePlayer((prevState) => {
            return prevState === 'X' ? 'O' : 'X'
        });

        setGamesTurns((prevTurns) => {
            let currentPlayer = 'X'

            if (prevTurns.length && prevTurns[0].player === 'X') {
                currentPlayer = 'O'
            }

            const updatedTurns = [
                {
                    square: {row: rowIdx, col: colIdx},
                    player: currentPlayer
                }, ...prevTurns];

            return updatedTurns;
        })
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className={'highlight-player'}>
                <Player initialName="Player one" symbol='X' isActive={activePlayer === 'X'}></Player>
                <Player initialName="Player two" symbol='O' isActive={activePlayer === 'O'}></Player>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
        </div>
        <Log/>
    </main>)
}

export default App
