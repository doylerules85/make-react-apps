import React, { useReducer, useState } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

function reducer(state, action){

  const { browsers, activeBrowser } = state;
  const { type, payload } = action;

  if(type === 'ADD'){
    const newBrowsers = [...browsers, ''];
    const activeBrowser = newBrowsers.length - 1;
    return {
      browsers: newBrowsers,
      activeBrowser
    }
  }
  if(type === 'CHOOSE'){
    return {
      ...state, 
      activeBrowser: payload
    }
  }
  if(type === 'UPDATE'){

    const newBrowsers = [...browsers];
    newBrowsers[activeBrowser] = payload;

    return{
      ...state,
      browsers: newBrowsers,
    }
  }
  if(action.type === 'CLOSE'){}
}

export default function App() {

  const [{browsers, activeBrowser}, dispatch] = useReducer(reducer, {
    browsers: [
      'https://rmdoyle.com',
      'https://bing.com',
    ],
    activeBrowser: 0
  });

  // no more state -- useReducer
  // const [browsers, setBrowsers] = useState([
  //   'https://rmdoyle.com',
  //   'https://bing.com',
  // ]);
  // const [activeBrowser, setActiveBrowser] = useState(0);

  function chooseBrowser(id){
    dispatch({type: 'CHOOSE', payload: id})
  }

  function addBrowser(){
    dispatch({type: 'ADD'});
  }

  function updateBrowser(url){
    dispatch({type: 'UPDATE', payload: url});
  }

  const url = browsers[activeBrowser];

  return (
    <div className="app">
      <div className="browser">
        <Tabs browsers={browsers} active={activeBrowser} choose={chooseBrowser} add={addBrowser}/>

        <AddressBar update={updateBrowser} url={url} />

        <div className="viewport">
          { url ? (
            <iframe src={url} title="tabz"></iframe>
          ) : (
            <div> nothing here.</div>
          ) 
          }
        </div>
      </div>
    </div>
  );
}
