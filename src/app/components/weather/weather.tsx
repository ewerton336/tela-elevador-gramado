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
        const response = await fetch("/api/weather?woeid=455987");
        if (!response.ok) {
          throw new Error(`Erro ao obter dados da previsão do tempo: ${response.status}`);
        }
        const data = await response.json();
        setWeather({
          current: data.results,
          forecast: data.results.forecast,
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
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Grid container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    {weather.current.city}
                  </Typography>
                  <Typography variant="h5">
                    Temp. Atual: {weather.current.temp}°C
                  </Typography>
                  <Typography variant="h5">
                    {weather.current.description}
                  </Typography>
                  <Typography variant="h5">
                  <DateTime/>
                  </Typography>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', marginTop: 2 }}>
                    <img
                      src={`/weather/icons/${weather.current.condition_slug}.svg`}
                      alt={weather.current.description}
                      style={{ maxWidth: '70%',  height: 'auto' }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {weather.forecast.filter((forecast, index) => index <= 1).map((forecast, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Grid container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      {index === 0 ? 'Previsão para Hoje:' : 'Previsão para Amanhã:'}
                    </Typography>
                    <Typography variant="h5">Máx.: {forecast.max}°C</Typography>
                    <Typography variant="h5">Mín.: {forecast.min}°C</Typography>
                    <Typography variant="h5">{forecast.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', marginTop: 2 }}>
                      <img
                        src={`/weather/icons/${forecast.condition}.svg`}
                        alt={forecast.description}
                        style={{ maxWidth: '70%',  height: 'auto' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Weather;
