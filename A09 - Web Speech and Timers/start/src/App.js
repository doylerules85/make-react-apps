import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import { useStopwatch } from 'react-timer-hook';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function App() {
  const [timers, setTimers] = useState([
    {time: 1, text: 'first'},
    {time: 4, text: 'second'},
    {time: 8, text: 'third'},
  ])

  const {seconds, isRunning, start, reset} = useStopwatch();
  const { speak,speaking, supported, cancel } = useSpeechSynthesis();

  const doReset = useCallback(() => reset(),[]);

  // pass props down and use callback so React knows it's not a new function but updates in our useEffect
  const doSpeak = useCallback((...p) => speak(...p),[]);

  // effect to find and match the timers
  useEffect(() =>{
    
    const foundTimer = timers.find((timer) => timer.time === seconds);
    
    if(foundTimer){
      doSpeak({text: foundTimer.text})
    }

    // chek if seconds is greater than the last timers time
    if(seconds > timers[timers.length - 1].time) {
      return reset();
    }

    console.log(foundTimer);
  }, [seconds, timers, doReset, doSpeak]);

  // update timers when altered
  function updateTimers(index, time, text){
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers);
  }

  // add timer - wired to add button
  function addTimers(){
    const newTimers = [...timers, {time: 100, text: 'hope this works!'}];
    setTimers(newTimers)
  }

  if( !supported){
    return <div> Your Browser is not supported</div>  
  }

  return (
    <div className="app">
      <h2>Talk the Talk</h2>

      <div className="timers">
        {/* timers go here */}
        {timers.map((timer, index) =>(
          <TimerSlot timer={timer} index={index} key={index} updateTimers={updateTimers}/>
        ))}

        <button onClick={addTimers} className="add-button">Add</button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}
      <div className="buttons">
        { !isRunning && (
          <button className="start-button" onClick={start}>Start</button>
        )}
        { isRunning && (
          <button className="stop-button" onClick={reset}>Stop</button>
        )}
        {speaking && <p>i am speaking</p>}
      </div>
    </div>
  );
}

function TimerSlot({timer, index, updateTimers}){

  const [time, setTime] = useState(timer.time);
  const [text, setText] = useState(timer.text);

  function handleBlur(){
    updateTimers(index, time, text);
  }

  return (
    <form className="timer" key={index}>
        <input type="number" value={time} onBlur={handleBlur} onChange={(e) => setTime(Number(e.target.value))}/>
        <input type="text" value={text} onBlur={handleBlur} onChange={(e) => setText(e.target.value)}/>
    </form>
  )
}
