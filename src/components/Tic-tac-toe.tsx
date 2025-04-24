import { useState } from "react";
import "./styles.css";
import Cell from "./cell/Cell";

interface Props {
  size?: number;
}

type Row = (string | null)[];

type Board = Row[];

const getBoard = (size: number) => {
  return new Array(size).fill(null).map(() => new Array(size).fill(null));
};

const TicTacToe = ({ size = 3 }: Props) => {
  const [board, setBoard] = useState<Board>(getBoard(size));
  const [isXTern, setIsXTern] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null | undefined>(null);

  const handleClick = (rowIndex: number, cellIndex: number) => {
    if (!board[rowIndex][cellIndex]) {
      const cellValue = isXTern ? "X" : "O";
      const boardCopy = [...board];
      boardCopy[rowIndex][cellIndex] = cellValue;
      setBoard(boardCopy);
      setIsXTern((prev) => !prev);
      setWinner(calculateWinner(boardCopy));
    }
  };

  const calculateWinner = (board: Board) => {
    const N = board.length;
    if (!winner) {
      //check for row and column
      for (let i = 0; i < N; i++) {
        // row
        if (new Set(board[i]).size === 1 && board[i][0] !== null) {
          return board[i][0]; // row winner
        }

        const cellSet = new Set();
        let j = 0;
        while (j < N) {
          cellSet.add(board[j][i]);
          j++;
        }
        if (cellSet.size === 1 && board[0][i] !== null) {
          return board[0][i]; // row winner
        }
      }

      // check main diagonal
      let diagonalSet = new Set();
      for (let i = 0; i < N; i++) {
        diagonalSet.add(board[i][i]);
      }
      if (diagonalSet.size === 1 && board[0][0] !== null) {
        return board[0][0]; // main diagonal winner
      }

      // check for other diagonal
      diagonalSet = new Set();
      for (let i = 0; i < N; i++) {
        diagonalSet.add(board[i][N - i - 1]);
      }
      if (diagonalSet.size === 1 && board[0][N - 1] !== null) {
        return board[0][N - 1]; // other diagonal winner
      }

      // check for running game
      if (board.flat().includes(null)) {
        return null; // game is still going on
      }

      return "draw";
    }
  };

  const getWinner = () => {
    if (!winner) {
      return null;
    } else if (winner && winner !== "draw") {
      return `${winner} is Winner`;
    } else {
      return "Game is draw";
    }
  };

  const handleReset = () => {
    setBoard(getBoard(size));
    setWinner(null);
    setIsXTern(true);
  };

  return (
    <div className="container">
      {board.map((row: (string | null)[], rowIndex: number) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((cell: string | null, cellIndex: number) => {
              return (
                <Cell
                  key={cellIndex}
                  value={cell}
                  handleClick={() => handleClick(rowIndex, cellIndex)}
                />
              );
            })}
          </div>
        );
      })}
      <div>{getWinner()}</div>
      <div>{winner && <button onClick={handleReset}>Reset</button>}</div>
    </div>
  );
};

export default TicTacToe;
