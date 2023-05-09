import "./styles.css";
import { useState } from "react";

let rows = Array(3).fill(0);
let cols = Array(3).fill(0);
let dia = 0;
let antiDia = 0;

const Board = () => {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [currPlayer, setCurrPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleMove = (row, col) => {
    if (board[row][col]) {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = currPlayer;
    setBoard(newBoard);
    setCurrPlayer(currPlayer === "X" ? "O" : "X");
    setWinner(findWinner(currPlayer, row, col));
  };

  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );

    setWinner(null);
    rows = Array(3).fill(0);
    cols = Array(3).fill(0);
    dia = 0;
    antiDia = 0;
  };

  return (
    <>
      <h2>Tic-Tac-Toe</h2>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleMove(rowIndex, colIndex)}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {winner && <div className="winner">Winner : {winner}</div>}
      {!winner && <div className="player">Current Player : {currPlayer}</div>}
      <button onClick={resetGame}>Reset Game</button>
    </>
  );
};

const findWinner = (player, row, col) => {
  let value = player === "X" ? 1 : -1;

  rows[row] += value;
  cols[col] += value;

  if (row === col) {
    dia += value;
  }

  if (col + row + 1 === 3) {
    antiDia += value;
  }

  if (
    Math.abs(rows[row]) === 3 ||
    Math.abs(cols[col]) === 3 ||
    Math.abs(dia) === 3 ||
    Math.abs(antiDia) === 3
  ) {
    return player;
  }

  return null;
};

export default Board;
