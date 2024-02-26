import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DateTime from "../datetime/dateTime";

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
    <Box sx={{ flexGrow: 1, padding: 2  }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {weather.current.city}
              </Typography>
              <Typography variant="h5">Temperatura Atual: {weather.current.temp}°C</Typography>
              <Typography variant="h5">Condição: {weather.current.description}</Typography>
              <Typography variant="h5"><DateTime/></Typography>
              <img
                src={`/weather/icons/${weather.current.condition_slug}.svg`}
                alt={weather.current.description}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Previsão para Hoje:
              </Typography>
              <Typography variant="h5">Máxima: {weather.forecast[0].max}°C</Typography>
              <Typography variant="h5">Mínima: {weather.forecast[0].min}°C</Typography>
              <Typography variant="h5">Condição: {weather.forecast[0].description}</Typography>
              <img
                src={`/weather/icons/${weather.forecast[0].condition}.svg`}
                alt={weather.forecast[0].description}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Previsão para Amanhã:
              </Typography>
              <Typography variant="h5">Máxima: {weather.forecast[1].max}°C</Typography>
              <Typography variant="h5">Mínima: {weather.forecast[1].min}°C</Typography>
              <Typography variant="h5">Condição: {weather.forecast[1].description}</Typography>
              <img
                src={`/weather/icons/${weather.forecast[1].condition}.svg`}
                alt={weather.forecast[1].description}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
