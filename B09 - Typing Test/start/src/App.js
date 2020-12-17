import React, { useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import './App.css';

// to calculate typing speed
// words typed / minutes
// words typed = (characters - typos) / 5

const secondsToCount = 10;
const paragraph = `Coding is the best. We are able to build something from scratch. It is literally imagination incarnate. Solving our own problems through coding is one of the coolest things we could do!`;

function findTypos(str1, str2){
  let typos = [];
  str2.split('').forEach(function(character, index){
    if( character !== str1.charAt(index)){
      typos.push(index);
    }
  });
  return typos;
}

export default function App() {

  // for Timer
  const [timeLeft, { start, reset }] = useCountDown(secondsToCount * 1000, 100);

  // type state
  const [typedText, setTypedText] = useState('');
  const [typoIndexes, setTypoIndexes] = useState([]);

  // finding typos
  useEffect(() =>{
    setTypoIndexes(findTypos(paragraph,typedText))
  }, [typedText]);

  useEffect(() =>{
    if(typedText.length === 0){
      return;
    }
    if(timeLeft !== 0) {
      return;
    }

    // claculate words typed 
    const wordsTyped = (typedText.length - typoIndexes.length) / 5;
    const minuteCalc = 60 / secondsToCount;
    const wordsPerMinute = wordsTyped * minuteCalc;

    alert(`you type ${wordsPerMinute} words per minute`);
  }, [timeLeft]);

const startTimer = () => {
  setTypedText('')
  start();
}

const resetTimer = () => {
  setTypedText('');
  reset();
}
  return (
    <div className="app">
      {/* sidebar */}
      <div className="sidebar">
        <div className="timer">{(timeLeft / 1000).toFixed(2)}</div>
        <button className="start" onClick={() => startTimer()}>Start</button>
        <button className="reset" onClick={() => resetTimer()}>Reset</button>
      </div>

      <div className="content">
        {/* show the paragraph */}
        <p>{paragraph.split('').map((c, i) =>{
          // check class to apply each character
          let characterClass = '';
          const hasBeenTyped = typedText.length > i;
          
          if(hasBeenTyped){
            // if included in the index its incorrect
            characterClass = typoIndexes.includes(i) ? 'incorrect' : 'correct';
          }

          return <span className={characterClass} key={i}>{c}</span>
        })}</p>

        {/* show the textarea */}
        <form>
          <textarea value={typedText} onChange={(e) => setTypedText(e.target.value)} rows="10" placeholder="Test your typing skills..." />
        </form>
      </div>
    </div>
  );
}
