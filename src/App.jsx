import React, { useState } from "react";
import "./App.css";

function App() {
  const defaultCity = "TORONTO";
  const [cityName, serCityName] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="App">
      {" "}
      <header className="app-header">
        <h1>COMP3123 Lab Test 2 – Weather App</h1>
        <p>Claire Lee, 100882058</p>
      </header>
    </div>
  );
}

export default App;
