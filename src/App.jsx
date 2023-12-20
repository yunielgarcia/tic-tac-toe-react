import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGamesTurns] = useState([]);

    function handleSelectSquare() {
        setActivePlayer((prevState) => {
            return prevState === 'X' ? 'O' : 'X'});
    }

    return (<main>
            <div id="game-container">
                <ol id="players" className={'highlight-player'}>
                <Player initialName="Player one" symbol='X' isActive={activePlayer === 'X'} ></Player>
                <Player initialName="Player two" symbol='O' isActive={activePlayer === 'O'}></Player>
                </ol>
                <GameBoard onSelectSquare={()=> {handleSelectSquare()}} activePlayer={activePlayer}/>
            </div>
        <Log/>
        </main>)
}

export default App
