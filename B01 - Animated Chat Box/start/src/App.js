import React, {useState} from 'react';
import useInterval from '@use-it/interval';
import {motion} from 'framer-motion';
import './App.css';

const messages = [
  { text: 'How do I get better at React?' },
  { text: 'Just build something!' },
  { text: 'OK! What should I build?' },
  { text: 'Iono. Just Google it?' },
  { text: 'Oh! This course looks cool!' },
  { text: 'Send me the link?!' },
  { text: '20ReactApps.com!' },
];

export default function App() {

  const [messageToShow, setMessageToShow] = useState(0);

  useInterval(() =>{
    setMessageToShow(messageToShow => messageToShow + 1);
  },2000);

  return (
    <div className="app">
      <div className="walkthrough">
        {messages.map((message, index) => {
          const even = index % 2 === 0;

          // when we show the type indicator
          if(messageToShow + 1 === index){
            return <TypeIndicator  key={index} even={even}/>
          }

          // when we show the message
          if( index > messageToShow) return <div key={index}/>

          return (
            <Message key={index} message={message}/>
          );

        })}
      </div>
    </div>
  );
}

function TypeIndicator({even}){
  return (
    <motion.div style={{width: '100%'}} initial={{rotate: 10, scale: 0}} animate={{rotate: 0, scale: 1}}>
      <div className={`typing ${even ? 'is-right' : 'is-left'}`}>
        <div className="dots">
          <div/>
          <div/>
          <div/>
        </div>
      </div>
    </motion.div>
  )
}

function Message({message}) { 
  return (
    <motion.div className="message" initial={{scale: 0.8, y: 100}} animate={{scale: 1, y: 0}}>
      <div className="avatar">🦋</div>
      <motion.div className="text" whileHover={{scale: 1.05}}>{message.text}</motion.div>
      <div className="avatar">🐛</div>
    </motion.div>
  )
}
