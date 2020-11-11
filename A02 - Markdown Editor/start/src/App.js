import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default function App() {

  const [markdown, setMarkDown] = useState('# supp');

  function handleChange(e){
    setMarkDown(e.target.value);
  }

  return (
    <div className="app">
      <textarea onChange={handleChange} value={markdown}/>
      <ReactMarkdown className="preview" children={markdown}></ReactMarkdown>
    </div>
  );
}
