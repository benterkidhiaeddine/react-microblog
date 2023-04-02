
import React, { useState } from "react"


export default function Game(){
 
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const [isAscending,setIsAscending] = useState(true);
  const currentSquares = history[currentMove];

  const isXNext = currentMove % 2 === 0 ;
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    
  }
  
  //this jumps to a particular state of the board
  function jumpTo(nextMove){
    
    setCurrentMove(nextMove);
    
  }

  let moves = history.map((squares,move)=>{
    let description;
    if (move > 0){
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }
    if (move !== currentMove){
      return (
    
        <li key={move}>
          <button onClick={()=> jumpTo(move)}>{description}</button>  
        </li>
      );
    }

    return ( 
      <li key ={move}>
        <p>You are at move #{move}</p>
      </li>
    )
   
    
  })

  //this checks if the the order of the moves is ascending or not and sort them accordingly 
  moves = isAscending? moves : moves.reverse();
  
  function handleToggleOrder(){
   setIsAscending(!isAscending);
  }

  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board isXNext = {isXNext} squares = {currentSquares} onPlay = {handlePlay} />

      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <button onClick = {handleToggleOrder}>toggleOrder</button>
    </div>
    </>
  )
}

function Square ({value,onSquareClick}){
 
  return (

    <button class="square" onClick={onSquareClick} >{value}</button>
  )

}



function Board({isXNext,squares,onPlay}) {
  

 
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
    onPlay(nextSquares);

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
  
  const boardRows = [];
  for (let i=0;i<9;i=i+3){
    const boardRow = [];
    for (let j=i;j<i+3;j++){
      
        if (j === winingSquaresIndexs()[0] || j === winingSquaresIndexs()[1] || j === winingSquaresIndexs()[2]){
          boardRow.push(
            <Square className = "winning-square" onSquareClick={() => handleClick(j)} value={squares[j]} />
          )
        }
        else{
          boardRow.push(
            <Square onSquareClick={() => handleClick(j)} value={squares[j]} />
          )
        }
        
      
    }
    boardRows.push(
      <div className="board-row">
          {boardRow}
      </div>
      );
    
  }
  return (
    <>
      <div className="gameState">{status}</div>
      
      
      {boardRows}

     
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

//return winning squares 
function winingSquaresIndexs(squares){
    //winning lines
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
      return [a,b,c]
    }
  }
  return null
}

