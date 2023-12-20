import {useState} from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard( {onSelectSquare, activePlayer}) {
    const [gameBoard, setGameBoard] = useState(initialBoard);

    function handleSelectSquare(row, col) {
        // WRONG: see bellow
        // setGameBoard((prevGameBoar) => {
        //     prevGameBoar[row][col] = 'X';
        //     return prevGameBoar;
        // })
        //todo: if the state is an object or array you should update immutably by creating a copy of that obj.
        setGameBoard((prevGameBoard) => {
            // todo: deep copy of the by-dimensional array
            const copyOfPrevGameBoard = [...prevGameBoard.map(row => [...row])];
            copyOfPrevGameBoard[row][col] = activePlayer;
            return copyOfPrevGameBoard;
        })
        onSelectSquare();
    }

    return (
        <ol id={'game-board'}>
            {gameBoard.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIdx) => {
                            return <li key={colIdx}>
                                <button onClick={() => {handleSelectSquare(rowIndex, colIdx)}}>{playerSymbol}</button></li>
                        })}
                    </ol>
                </li>
            })}
        </ol>
    )
}