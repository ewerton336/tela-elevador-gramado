import React, { useEffect, useState } from "react";
import axios from "axios";

interface CurrentWeatherData {
  temp: number;
  city: string;
  description: string;
  date: string;
  time: string;
  condition_slug: string;
}

interface DailyForecast {
  date: string;
  weekday: string;
  max: number;
  min: number;
  description: string;
  condition: string;
}

interface WeatherData {
  current: CurrentWeatherData;
  forecast: DailyForecast[];
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("/api/weather?woeid=455987");
        console.log(response.data);
        setWeather({
          current: response.data.results,
          forecast: response.data.results.forecast,
        });
      } catch (error) {
        console.error("Erro ao obter dados da previsão do tempo:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <div>Carregando previsão do tempo...</div>;
  }

  return (
    <div>
      <h2>Previsão do Tempo para {weather.current.city}</h2>
      <p>Temperatura Atual: {weather.current.temp}°C</p>
      <p>Condição: {weather.current.description}</p>
      <img
        src={`/weather/icons/${weather.current.condition_slug}.svg`}
        alt={weather.current.description}
      />
      <h3>Previsão para Hoje:</h3>
      <p>Máxima: {weather.forecast[0].max}°C</p>
      <p>Mínima: {weather.forecast[0].min}°C</p>
      <p>Condição: {weather.forecast[0].description}</p>
      <img
        src={`/weather/icons/${weather.forecast[0].condition}.svg`}
        alt={weather.current.description}
      />
      <h3>Previsão para amanhã:</h3>
      <p>Máxima: {weather.forecast[1].max}°C</p>
      <p>Mínima: {weather.forecast[1].min}°C</p>
      <p>Condição: {weather.forecast[1].description}</p>
      <img
        src={`/weather/icons/${weather.forecast[1].condition}.svg`}
        alt={weather.current.description}
      />
    </div>
  );
};

export default Weather;
