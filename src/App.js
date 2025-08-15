import React, { useState, useEffect } from "react";
import "./App.css";

export default function WeatherAppAlternative() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Using OpenMeteo API which doesn't require authentication
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      setHourlyForecast(null);
      setDailyForecast(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First, get coordinates for the city using geocoding API
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeather(null);
        setHourlyForecast(null);
        setDailyForecast(null);
        setError("City not found. Please try a different city name.");
        return;
      }

      const { latitude, longitude, country, name, timezone } = geoData.results[0];

      // Get comprehensive weather data including hourly and daily forecasts
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code,visibility&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=${timezone}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.current) {
        const current = weatherData.current;
        const weatherInfo = {
          name: name,
          sys: { country: country },
          timezone: timezone,
          weather: [{ 
            description: getWeatherDescription(current.weather_code),
            icon: getWeatherIcon(current.weather_code),
            code: current.weather_code
          }],
          main: {
            temp: current.temperature_2m,
            feels_like: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            pressure: Math.round(current.pressure_msl)
          },
          wind: {
            speed: current.wind_speed_10m,
            direction: current.wind_direction_10m
          },
          visibility: current.visibility * 1000 // Convert km to meters
        };
        
        setWeather(weatherInfo);
        setHourlyForecast(weatherData.hourly);
        setDailyForecast(weatherData.daily);
      } else {
        setWeather(null);
        setHourlyForecast(null);
        setDailyForecast(null);
        setError("Weather data not available");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather(null);
      setHourlyForecast(null);
      setDailyForecast(null);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const getWeatherDescription = (weatherCode) => {
    const weatherDescriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail"
    };
    return weatherDescriptions[weatherCode] || "Unknown";
  };

  const getWeatherIcon = (weatherCode) => {
    const weatherIcons = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      48: "🌫️",
      51: "🌦️",
      53: "🌧️",
      55: "🌧️",
      56: "🌨️",
      57: "🌨️",
      61: "🌧️",
      63: "🌧️",
      65: "🌧️",
      66: "🌨️",
      67: "🌨️",
      71: "❄️",
      73: "❄️",
      75: "❄️",
      77: "❄️",
      80: "🌦️",
      81: "🌧️",
      82: "🌧️",
      85: "🌨️",
      86: "🌨️",
      95: "⛈️",
      96: "⛈️",
      99: "⛈️"
    };
    return weatherIcons[weatherCode] || "🌤️";
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCurrentLocalTime = (timezone) => {
    try {
      return new Date().toLocaleString('en-US', { timeZone: timezone });
    } catch {
      return new Date().toLocaleString();
    }
  };



  return (
    <div className="weather-app">
      <div className="container">
        <h1 className="app-title">🌤️ Weather App</h1>
        
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="search-button"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-container">
            {/* Current Weather */}
            <div className="current-weather">
              <div className="city-header">
                <h2 className="city-name">
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="local-time">
                  Local Time: {getCurrentLocalTime(weather.timezone)}
                </p>
              </div>
              
              <div className="weather-main">
                <div className="weather-icon">
                  {getWeatherIcon(weather.weather[0].code)}
                </div>
                <div className="weather-info">
                  <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                  <p className="description">{weather.weather[0].description}</p>
                  <p className="feels-like">Feels like {Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind Speed</span>
                  <span className="detail-value">{weather.wind.speed.toFixed(1)} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind Direction</span>
                  <span className="detail-value">{getWindDirection(weather.wind.direction)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pressure</span>
                  <span className="detail-value">{weather.main.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Visibility</span>
                  <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            {hourlyForecast && (
              <div className="forecast-container">
                <h3>24-Hour Forecast</h3>
                <div className="hourly-forecast">
                  {hourlyForecast.time.slice(0, 24).map((time, index) => (
                    <div key={index} className="hourly-item">
                      <p className="hourly-time">{formatTime(time)}</p>
                      <div className="hourly-icon">
                        {getWeatherIcon(hourlyForecast.weather_code[index])}
                      </div>
                      <p className="hourly-temp">{Math.round(hourlyForecast.temperature_2m[index])}°</p>
                      <p className="hourly-precip">{hourlyForecast.precipitation_probability[index]}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Forecast */}
            {dailyForecast && (
              <div className="forecast-container">
                <h3>7-Day Forecast</h3>
                <div className="daily-forecast">
                  {dailyForecast.time.map((date, index) => (
                    <div key={index} className="daily-item">
                      <p className="daily-date">{formatDate(date)}</p>
                      <div className="daily-icon">
                        {getWeatherIcon(dailyForecast.weather_code[index])}
                      </div>
                      <div className="daily-temps">
                        <span className="daily-max">{Math.round(dailyForecast.temperature_2m_max[index])}°</span>
                        <span className="daily-min">{Math.round(dailyForecast.temperature_2m_min[index])}°</span>
                      </div>
                      <p className="daily-precip">{dailyForecast.precipitation_probability_max[index]}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
