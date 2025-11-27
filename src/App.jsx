import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard";

const API_KEY = process.env.REACT_APP_APIKEY;

function App() {
  const defaultCity = "TORONTO,CA";
  const [cityName, setCityName] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherData = async (query) => {
    if (!query || !API_KEY) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("City not found. Try another one.");
        } else {
          setError("Could not fetch weather data.");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();

      const nextWeather = {
        city: data.name.toUpperCase(),
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        windSpeed: data.wind.speed,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      setWeather(nextWeather);
      setCityName(data.name.toUpperCase());
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(cityName);
  }, []);

  const handleSearch = (input) => {
    if (!input) return;
    const query = input.trim().toUpperCase();
    getWeatherData(query);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>COMP3123 Lab Test 2 – Weather App</h1>
        <p>Claire Lee, 100882058</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {weather && !loading && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
