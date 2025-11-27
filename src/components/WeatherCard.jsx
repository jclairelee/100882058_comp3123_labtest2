import React from "react";

function WeatherCard({ data }) {
  if (!data) return null;

  const {
    city,
    country,
    temp,
    feelsLike,
    humidity,
    windSpeed,
    tempMin,
    tempMax,
    main,
    description,
    icon,
  } = data;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-top">
        <div>
          <h2>
            {city}, {country}
          </h2>
          <p className="weather-text">
            {main} – {description}
          </p>
        </div>
        <img src={iconUrl} alt="weather icon" />
      </div>

      <div className="temperature">{Math.round(temp)}°C</div>

      <div className="weather-extra">
        <div>Feels like: {feelsLike}°C</div>
        <div>Humidity: {humidity}%</div>
        <div>Wind: {windSpeed} m/s</div>
        <div>Min: {Math.round(tempMin)}°C</div>
        <div>Max: {Math.round(tempMax)}°C</div>
        <div>Country Code: {country}</div>
      </div>
    </div>
  );
}

export default WeatherCard;
