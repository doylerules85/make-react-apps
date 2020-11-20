import React, {useState} from 'react';
import './App.css';

export default function App() {
  const [timers, setTimers] = useState([
    {time: 1, text: 'first'},
    {time: 4, text: 'second'},
    {time: 8, text: 'third'},
  ])

  function updateTimers(index, time, text){
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers);
  }

  function addTimers(){
    const newTimers = [...timers, {time: 100, text: 'hope this works!'}];
    setTimers(newTimers)
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
      <h2>0</h2>

      {/* buttons */}
      <div className="buttons">
        <button className="start-button">Start</button>
        <button className="stop-button">Stop</button>
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
        <input type="number" value={time} onBlur={handleBlur} onChange={(e) => setTime(e.target.value)}/>
        <input type="text" value={text} onBlur={handleBlur} onChange={(e) => setText(e.target.value)}/>
    </form>
  )
}
