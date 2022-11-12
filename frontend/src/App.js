import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('');

  const getWeatherForecast = async () => {
    const res = await fetch(`https://qq7ffg82t5.execute-api.us-east-1.amazonaws.com/dev/`)
      .then(res => {
        setMessage(res.message);
      }).catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Message: {message}</h2>
      <button onClick={getWeatherForecast}>Get weather reccomendation for tomorrow</button>
    </div>
  );
}

