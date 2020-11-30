import React, { useState } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useDrag, useDrop} from 'react-dnd'

export default function App() {

  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(1)
  const [operator, setOperator] = useState('*')

  function handleDrop(spot, item){
    console.log(item);
    if (spot === 'num1'){
      setNum1(item.text);
    }
    if (spot === 'num2'){
      setNum2(item.text);
    }
    if (spot === 'operator'){
      setOperator(item.text);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="app">
        {/* math card */}
        <div className="math-card">
          <Spot type="number" text={num1} spot="num1" handleDrop={handleDrop}/>
          <Spot type="number" text={num2} spot="num2" handleDrop={handleDrop}/>
          <Spot type="operator" text={operator} spot="operator" handleDrop={handleDrop}/>
          <div className="total">{(Math.round(eval(`${num1}${operator}${num2}`) * 100) / 100).toFixed(2)}</div>
        </div>

        <div>
          <div className="cards numbers">
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Number text={i} key={i}/>
              ))}
          </div>

          <div className="cards operators">
            {['*', '-', '+', '/'].map((o, i) => (
              <Operator key={i} text={o}/>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function Spot({type, text, spot, handleDrop}){
  const [{canDrop, isOver}, dropRef] = useDrop({
    accept: type,
    // method of what happens on drop
    drop: item => { 
      handleDrop(spot,item);
    },
    // create methods and apply them as props to be used in component
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  // adding dropzone colors
  let backgroundColor = '#bada55';
  if(canDrop){ backgroundColor = '#222'};
  if(isOver){ backgroundColor = '#505050'};

  return (
    // app ref and then BG color variants
    <div className="spot" ref={dropRef} style={{backgroundColor}}>
      {text}
    </div>
  )
}

function Number({text}){

  const [{opacity}, dragRef] = useDrag({
    item: { type: 'number', text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={dragRef} className="card" style={{opacity}}>
      {text}
    </div>
  )
}

function Operator({text}){

  const [{opacity}, dragRef] = useDrag({
    item: { type: 'operator', text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <div ref={dragRef} className="card" style={{opacity}}>
      {text}
    </div>
  )
}
