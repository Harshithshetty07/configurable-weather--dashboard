// WeatherWidget.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import { FaTimes as CloseIcon, FaSun as SunIcon, FaCloud as CloudIcon, FaCloudRain as RainIcon } from 'react-icons/fa';
import { TemperatureContext } from './TemperatureContextType'; 
import axios from 'axios';

interface WeatherWidgetProps {
    id: string;
    city: string;
    onRemove: () => void;
}

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
}

const API_KEY = 'a8dc08fe85a3d32008133cd813af4f63';

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ id, city, onRemove }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { unit } = useContext(TemperatureContext);
  
    useEffect(() => {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          const data = response.data;
          setWeather({
            temperature: data.main.temp,
            condition: data.weather[0].main.toLowerCase(),
            city: data.name,
          });
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Failed to fetch weather data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchWeather();
      const interval = setInterval(fetchWeather, 600000); 
  
      return () => clearInterval(interval);
    }, [city]); 
  
    const convertTemperature = (temp: number): number => {
      if (unit === 'fahrenheit') {
        return Math.round((temp * 9) / 5 + 32);
      }
      return Math.round(temp);
    };
  
    const getWeatherIcon = (condition: string) => {
      switch (condition) {
        case 'clear':
          return <SunIcon />;
        case 'clouds':
          return <CloudIcon />;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
          return <RainIcon />;
        default:
          return <CloudIcon />;
      }
    };
  

  return (
    <Card>
      <CardContent>
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{ float: 'right' }}
        >
          <CloseIcon />
        </IconButton>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {weather && (
          <>
            <Typography variant="h5" component="div">
              {weather.city}
            </Typography>
            <Typography variant="h4" component="div">
              {convertTemperature(weather.temperature)}°{unit === 'celsius' ? 'C' : 'F'}
            </Typography>
            <Typography color="text.secondary">
              {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
            </Typography>
            {getWeatherIcon(weather.condition)}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
