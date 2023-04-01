
import { useState } from "react"

function Square ({value,onSquareClick}){
 
  return (
    <button class="square" onClick={onSquareClick} >{value}</button>
  )

}



export default function Board() {
  //state for the whole board 
  const [squares,setSquares] = useState(Array(9).fill(null));
  //state for if the next player is going to use X or O
  const [isXNext,setIsXNext] = useState(true);
  //state for game history 
  const [gameHistory,setGameHistory] = useState(squares);
 
  function handleClick(index){


    //create a copy of the board state array
    const nextSquares = squares.slice();
    //if the square is already filled or there is already a winner don't do anything
    if (squares[index] || calculateWinner(squares)){
      return
    }
    
    if (isXNext){
      nextSquares[index] = "X";
    }
    else{
      nextSquares[index] = "O";
    }
    setSquares(nextSquares);
    setIsXNext(!isXNext);

  }

  // to display the game state
  const winner = calculateWinner(squares)
  let status;
  if (winner){
     status = `the winner is ${winner}`;
  
  }
  else{
     status = `Next player is ${isXNext?"X":"0"}`
  }
  return (
    <>
      <div className="gameState">{status}</div>
      <div className="board-row">
          <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
          <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
          <Square onSquareClick={() => handleClick(2)} value={squares[2]} />

      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
        
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)}  value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
        
      </div>

     
    </>
  );
}

//function to calculate the winner 
function calculateWinner(squares){
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ];

  for (let i = 0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  // if the whole loop  runs and all possibilities of a wining condition are not met the function return null no winner
  return null
}