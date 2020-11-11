import React, {useState} from 'react';

export default function Tab({children}){

    const [highlightStyle, setHighlightStyle] = useState({ left: 0, opacity: 0})
  
    function moveHighlight(e){
      setHighlightStyle({
        left: e.nativeEvent.layerX - 150
      });
    }
  
    function removeHighlight(e){
      setHighlightStyle({
        opacity: 0
      });
    }
  
    return (
      <div className="tab" onMouseLeave={removeHighlight} onMouseMove={moveHighlight}>
        <div className="highlight" style={highlightStyle}/>
        {children}
      </div>
    )
  }