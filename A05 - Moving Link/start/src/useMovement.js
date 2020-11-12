import React, {useState, useEffect} from 'react';

export default function useMovement(){
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [direction, setDirection] = useState('down');

    // event listener to window to listen to window keys
  useEffect(() =>{
        window.addEventListener('keydown', handleKeyDown);

        function handleKeyDown(e){
        if(e.key === 'ArrowUp') move('up');
        if(e.key === 'ArrowLeft') move('left');
        if(e.key === 'ArrowRight') move('right');
        if(e.key === 'ArrowDown') move('down');
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    function move(dir){
        setDirection(dir);
            if(dir === 'up') setY((y) => y - 20);
            if(dir === 'left') setX((x) => x - 20);
            if(dir === 'right') setX((x) => x + 20);
            if(dir === 'down') setY((y) => y + 20);
    }

    return { x,y,direction,move }
}