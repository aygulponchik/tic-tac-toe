import './App.css';
import {useState, useEffect} from 'react';
import Square from './Components/Square';
import { Patterns } from './Patterns';


function App() {
  const [board, setBoard] = useState(["","","","","","","","",""])
  const [player, setPlayer] = useState("O")
  const [result, setResult] = useState({winner: "none", state: "none"})

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board])

  useEffect(() => {
    if (result.state !== "none") {
      if (result.winner === "X") {
        alert(`Game Finished! Winning Player: X`);
      } else if (result.winner === "O") {
        alert(`Game Finished! Winning Player: O`);
      } else {
        alert(`Game Finished! It's a Tie!`);
      }
    }
  }, [result]);



  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
        if (idx == square  && val == "") {
          return player
        }

        return val;
    }));


  }

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({winner: player, state: "Won"});
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({winner:"No One", state:"Tie"})
    }
  };

  return (
    <div className="App">
      <div className='board'>
        <div class="row">
          <Square val={board[0]} chooseSquare={() => {chooseSquare(0);}}></Square>
          <Square val={board[1]} chooseSquare={() => {chooseSquare(1);}}></Square>
          <Square val={board[2]} chooseSquare={() => {chooseSquare(2);}}></Square>
          </div>
        <div class="row">
          <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}}></Square>
          <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}}></Square>
          <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}}></Square>
          </div>
        <div class="row">
          <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}}></Square>
          <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}}></Square>
          <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}}></Square>
          </div>
        
      </div>
    </div>
  );
}

export default App;
