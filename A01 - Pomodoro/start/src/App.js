import React from 'react';
import './App.css';

function padTime(time){
return time.toString().padStart(2,'0');
}

export default function App() {

  const [title, setTitle] = React.useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(Math.floor(timeLeft - (minutes * 60)));
  let intervalRef = React.useRef(null);

  function startTimer(){
    if(intervalRef.current !== null){
      return;
    }
    setTitle('And away we go!');
    setIsRunning(true);
    intervalRef.current = setInterval(() =>{
      setTimeLeft(timeLeft =>{
        if(timeLeft >= 1){
          return timeLeft - 1;
        }
        return 0;
      });
    },1000);
    console.log(intervalRef.current)
  }

  function resetTimer(){
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Anotha One?!');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  function stopTimer(){
    if(intervalRef.current === null){
      return;
    }
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('keep it going!');
    setIsRunning(false);
  }

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{ minutes }</span>
        <span>:</span>
        <span>{ seconds }</span>
      </div>

      <div className="buttons">
        { !isRunning && <button onClick={startTimer}>Start</button>}
        { isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}