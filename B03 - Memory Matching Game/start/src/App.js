import React, { useEffect, useState } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {

  const [opened, setOpened] = useState([]); // using index
  const [matched, setMatched] = useState([]) // using pokemon.id
  const [moves, setMoves] = useState(0);

  // heck if there is a match
  // if two in open array - check if they match
  useEffect(() =>{
    if (opened.length < 2) return;
    const firstPokemon =  doublePokemon[opened[0]];
    const secondPokemon =  doublePokemon[opened[1]];

    if(firstPokemon.name === secondPokemon.name){
      setMatched((matched) =>[...matched,firstPokemon.id]);
    }
  }, [opened])

  // effect for when opened array changes and 2 cards are shown
  useEffect(() =>{
    if(opened.length === 2){
      setTimeout(() => {
        setOpened(opened => []);
      }, 1000);
    }
  }, [opened])

  // check if there is a winner
  useEffect(() =>{
    if(matched.length === pokemon.length){
      alert('you won!');
    }
  },[matched])

  // handle flip function
  function flipCard(index){
    setMoves((moves) => moves + 1);
    setOpened(opened => [...opened, index])
  }

  function handleRedo(){
    setMatched([]);
    setMoves(0);
    shuffle(doublePokemon);
  }

  return <div className="app">
    { matched.length > 0 && <button className="redo-btn" onClick={() => handleRedo()}>RE-DO</button>}
    <p>MOVES:{moves}</p>
    <div className="cards">
      {doublePokemon.map((pokemon,index) =>{
        let isFlipped = false;
        let isDisabled = false;
        //do logic if card is Flipped
        if(opened.includes(index)) {isFlipped = true; isDisabled = true};
        if(matched.includes(pokemon.id)) {isFlipped = true; isDisabled = true};

        return (
          <PokemonCard pokemon={pokemon} key={index} isFlipped={isFlipped} index={index} flipCard={flipCard} isDisabled={isDisabled}/>
        )
      })}
    </div>
  </div>;
}


// Pokemon Card Component
function PokemonCard({pokemon, isFlipped, index, flipCard,isDisabled}){
  return (
    <button disabled={isDisabled} onClick={() =>flipCard(index)} className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="inner">
        <div className="front">
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={pokemon.name} width="100"/>
        </div>
        <div className="back">
          ?
        </div>
      </div>
    </button>
  )
}
