import React, { useState } from 'react';
import GeoForm from './components/GeoForm';
import WeatherChart from './components/WeatherChart';

import './App.css';

// openweathermap.org
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547

export default function App() {
  const [latLng, setLatLng] = useState(null);

  return (
    <div className="app">
      {/* form goes here */}
      <GeoForm setLatLng={setLatLng} />
      {/* chart goes here */}
      {latLng && <WeatherChart latLng={latLng} />}
    </div>
  );
}