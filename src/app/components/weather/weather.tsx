import React from "react";
import { useQuery } from '@tanstack/react-query';
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

const fetchWeather = async (): Promise<WeatherData> => {
  const response = await fetch("/api/weather?woeid=455987");
  if (!response.ok) {
    throw new Error(`Erro ao obter dados da previsão do tempo: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    current: data.results,
    forecast: data.results.forecast,
  };
};

const Weather = () => {
  const { isLoading, error, data: weather } = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  if (isLoading) {
    return <div>Carregando Previsão do tempo...</div>;
  }

  if (error instanceof Error) {
    return <div>Ocorreu um erro ao carregar previsão: {error.message}</div>;
  }

  if (weather){
    return (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {weather.current.city}
                </Typography>
                <Typography variant="h5">
                  Temperatura Atual: {weather!.current.temp}°C
                </Typography>
                <Typography variant="h5">
                  Condição: {weather.current.description}
                </Typography>
                <Typography variant="h5">
                  <DateTime />
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <img
                    src={`/weather/icons/${weather.current.condition_slug}.svg`}
                    alt={weather.current.description}
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Previsão Hoje:
                </Typography>
                <Typography variant="h5">
                  Máxima: {weather.forecast[0].max}°C
                </Typography>
                <Typography variant="h5">
                  Mínima: {weather.forecast[0].min}°C
                </Typography>
                <Typography variant="h5">
                  Condição: {weather.forecast[0].description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <img
                    src={`/weather/icons/${weather.forecast[0].condition}.svg`}
                    alt={weather.forecast[0].description}
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Previsão Amanhã:
                </Typography>
                <Typography variant="h5">
                  Máxima: {weather.forecast[1].max}°C
                </Typography>
                <Typography variant="h5">
                  Mínima: {weather.forecast[1].min}°C
                </Typography>
                <Typography variant="h5">
                  Condição: {weather.forecast[1].description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <img
                    src={`/weather/icons/${weather.forecast[1].condition}.svg`}
                    alt={weather.forecast[1].description}
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
};

export default Weather;
