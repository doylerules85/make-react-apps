import React from 'react';
import Frodo from '../img/frodo.png';

export default function Dashboard() {
  return (
    <div className="page dashboard">
      <div>
        <img src={Frodo} alt="Frodo" />
        <h2>We're Going on an adventure!</h2>
      </div>
    </div>
  );
}
