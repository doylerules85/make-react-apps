import React from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

//outside just to show data being outside of component
const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2},
  { id: 2, name: 'paper', component: Paper, losesTo: 3},
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1},
];

//handle wins and losses
//determine winner based on choices
// reset the game

export default function App() {
  const [wins, setWins] = React.useState(0);
  const [losses, setLosses] = React.useState(0);
  const [userChoice, setUserChoice] = React.useState(null);
  const [ computerChoice, setComputerChoice] = React.useState(null);
  const [ gameState, setGameState ] = React.useState(null);

  React.useEffect(() =>{
    restartGame();
  }, []);

  function restartGame(){
    setGameState(null);
    setUserChoice(null);
    
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice)
  }

  function handleUserChoice(choice){
    const chosenChoice = choices.find(c => c.id === choice);
    setUserChoice(chosenChoice);

    //determine winner
    if(chosenChoice.losesTo === computerChoice.id){
      //lose
      setLosses( losses => losses + 1)
      setGameState('lose');
    } else if ( computerChoice.losesTo === chosenChoice.id){
      //win
      setWins( wins => wins + 1)
      setGameState('win');
    } else if ( computerChoice.id === chosenChoice.id) {
      // draw
      setGameState('draw');
    }
  }

  // custom function to render component
  function renderComponent(choice) {
    const Component = choice.component;
    return <Component/>;
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Loss' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/lose/draw */}
      {gameState &&
        <div className={`game-state ${gameState}`}>
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>you {gameState}!</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => restartGame()}> Play Again</button>
          </div>
        </div>
      }

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>

          <button className="rock" onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
