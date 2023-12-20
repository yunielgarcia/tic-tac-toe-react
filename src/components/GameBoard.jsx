import {useState} from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard( {onSelectSquare, turns}) {
    //todo: we uplifted the state to app.js and this is a derived state from app.js' state
    let gameBoard = initialBoard;

    for (let turn of turns) {
        const {player, square} = turn;
        const {row, col } = square;

        gameBoard[row][col] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialBoard);
    //
    // function handleSelectSquare(row, col) {
    //     // WRONG: see bellow
    //     // setGameBoard((prevGameBoar) => {
    //     //     prevGameBoar[row][col] = 'X';
    //     //     return prevGameBoar;
    //     // })
    //     //todo: if the state is an object or array you should update immutably by creating a copy of that obj.
    //     setGameBoard((prevGameBoard) => {
    //         // todo: deep copy of the by-dimensional array
    //         const copyOfPrevGameBoard = [...prevGameBoard.map(row => [...row])];
    //         copyOfPrevGameBoard[row][col] = activePlayer;
    //         return copyOfPrevGameBoard;
    //     })
    //     onSelectSquare();
    // }

    return (
        <ol id={'game-board'}>
            {gameBoard.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIdx) => {
                            return <li key={colIdx}>
                                <button onClick={() => onSelectSquare(rowIndex, colIdx)}>{playerSymbol}</button></li>
                        })}
                    </ol>
                </li>
            })}
        </ol>
    )
}